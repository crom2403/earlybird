/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react"
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  Timestamp,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

type OnlineStatus = {
  isOnline: boolean
  lastSeen: string
}

export const useOnlineTracking = (userId: string | undefined) => {
  const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>({
    isOnline: false,
    lastSeen: new Date().toISOString(),
  })

  useEffect(() => {
    if (!userId) return

    let userDocRef: any = null
    let startTime: number | null = null
    let studyTimeDocRef: any = null

    // Tìm document reference của user
    const getUserRef = async () => {
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("uid", "==", userId))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        userDocRef = querySnapshot.docs[0].ref
        return true
      }
      return false
    }

    // Tìm hoặc tạo record study time cho ngày hiện tại
    const getOrCreateStudyTimeRecord = async () => {
      try {
        const day = new Date().getDay()
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        const dateId = userId + day + month + year
        studyTimeDocRef = doc(db, "studyTime", dateId)

        // Kiểm tra xem document đã tồn tại chưa
        const docSnap = await getDoc(studyTimeDocRef)

        if (!docSnap.exists()) {
          // Tạo record mới cho ngày hôm nay
          const newRecord = {
            userId,
            day,
            month,
            year,
            date: Timestamp.fromDate(new Date()),
            totalTime: 0,
            lastUpdated: serverTimestamp(),
          }
          await setDoc(studyTimeDocRef, newRecord)
        }

        return studyTimeDocRef
      } catch (error) {
        console.error("Error in getOrCreateStudyTimeRecord:", error)
        return null
      }
    }

    // Cập nhật tổng thời gian học
    const updateTotalTime = async () => {
      try {
        if (!startTime || !studyTimeDocRef) return

        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        if (timeSpent <= 0) return

        const docSnap = await getDoc(studyTimeDocRef)
        if (docSnap.exists()) {
          const currentData: any = docSnap.data()
          await updateDoc(studyTimeDocRef, {
            totalTime: (currentData?.totalTime || 0) + timeSpent,
            lastUpdated: serverTimestamp(),
          })
        }

        // Reset startTime sau khi đã cập nhật
        startTime = null
      } catch (error) {
        console.error("Error updating total time:", error)
      }
    }

    // Cập nhật trạng thái online và thời gian học
    const updateOnlineStatus = async (isOnline: boolean) => {
      try {
        if (!userDocRef) {
          const userExists = await getUserRef()
          if (!userExists) return
        }

        if (!studyTimeDocRef) {
          studyTimeDocRef = await getOrCreateStudyTimeRecord()
        }

        if (isOnline) {
          startTime = Date.now()
          await updateDoc(userDocRef, {
            isOnline,
            lastSeen: serverTimestamp(),
          })
        } else {
          // Cập nhật totalTime trước khi set offline
          await updateTotalTime()

          await updateDoc(userDocRef, {
            isOnline,
            lastSeen: serverTimestamp(),
          })
        }
      } catch (error) {
        console.error("Error updating status:", error)
      }
    }

    const onOnline = () => updateOnlineStatus(true)
    const onOffline = async () => {
      await updateTotalTime() // Cập nhật thời gian trước khi offline
      await updateOnlineStatus(false)
    }

    // Thiết lập listener cho document user
    const setupSnapshotListener = async () => {
      if (!userDocRef) {
        const userExists = await getUserRef()
        if (!userExists) return
      }

      return onSnapshot(userDocRef, (doc: { exists: () => any; data: () => any }) => {
        if (doc.exists()) {
          const data = doc.data()
          setOnlineStatus({
            isOnline: data.isOnline || false,
            lastSeen: data.lastSeen?.toDate().toISOString() || new Date().toISOString(),
          })
        }
      })
    }

    // Khởi tạo tracking
    let unsubscribe: (() => void) | undefined

    const initializeTracking = async () => {
      await getUserRef()
      await getOrCreateStudyTimeRecord()
      unsubscribe = await setupSnapshotListener()
      updateOnlineStatus(true)
    }

    initializeTracking()

    // Đăng ký event listeners
    window.addEventListener("online", onOnline)
    window.addEventListener("offline", onOffline)

    // Đảm bảo cập nhật thời gian khi đóng tab/trình duyệt
    // window.addEventListener("beforeunload", async (e) => {
    //   e.preventDefault()
    //   await updateTotalTime()
    //   await updateOnlineStatus(false)
    // })

    // Thêm interval để định kỳ cập nhật thời gian
    const intervalId = setInterval(updateTotalTime, 60000 * 5) // Cập nhật mỗi 5 phút
    return () => {
      const cleanup = async () => {
        await updateTotalTime()
        await updateOnlineStatus(false)
      }
      cleanup()

      clearInterval(intervalId)
      window.removeEventListener("online", onOnline)
      window.removeEventListener("offline", onOffline)
      if (unsubscribe) unsubscribe()
    }
  }, [userId])

  return onlineStatus
}
