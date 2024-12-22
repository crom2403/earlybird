"use server"
import { cookies } from "next/headers"
import { decrypt } from "@/app/lib/session"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { UserResponse } from "@/types/user"
import { convertTimestampToString } from "@/utils/converter"

// export const getServerSideUser = async () => {
//   const cookie = cookies().get("session")?.value
//   const session = await decrypt(cookie)
//   if (session?.userId) {
//     const q = query(collection(db, "users"), where("uid", "==", session?.userId))
//     const querySnapshot = await getDocs(q)
//     const userDoc = querySnapshot.docs[0]?.data() as UserResponse
//     return userDoc || null
//   }
// }

export const getServerSideUser = async (): Promise<UserResponse | null> => {
  try {
    const cookie = cookies().get("session")?.value
    if (!cookie) return null

    const session = await decrypt(cookie) // Giải mã cookie
    if (!session?.userId) return null

    const q = query(collection(db, "users"), where("uid", "==", session.userId))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) return null

    const userDoc = querySnapshot.docs[0]?.data()
    if (!userDoc) return null

    return {
      ...userDoc,
      lastSeen: convertTimestampToString(userDoc.lastSeen), // Chuyển đổi Timestamp thành chuỗi ISO
    } as UserResponse
  } catch (error) {
    console.error("Error in getServerSideUser:", error)
    return null
  }
}
