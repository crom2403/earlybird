/* eslint-disable @typescript-eslint/no-explicit-any */
// "use server"
// import { cookies } from "next/headers"
// import { decrypt } from "@/app/lib/session"
// import { db } from "@/lib/firebase"
// import { collection, getDocs, query, where } from "firebase/firestore"
// import { UserResponse } from "@/types/user"
// import { convertTimestampToString } from "@/utils/converter"

// export const getServerSideUser = async (): Promise<UserResponse | undefined> => {
//   try {
//     const cookie = cookies().get("session")?.value
//     if (!cookie) return undefined

//     const session = await decrypt(cookie) // Giải mã cookie
//     if (!session?.userId) return undefined

//     const q = query(collection(db, "users"), where("uid", "==", session.userId))
//     const querySnapshot = await getDocs(q)

//     if (querySnapshot.empty) return undefined

//     const userDoc = querySnapshot.docs[0]?.data()
//     if (!userDoc) return undefined

//     return {
//       ...userDoc,
//       lastSeen: convertTimestampToString(userDoc.lastSeen), // Chuyển đổi Timestamp thành chuỗi ISO
//     } as UserResponse
//   } catch (error: unknown) {
//     console.error("Error in getServerSideUser:", error)
//     return undefined
//   }
// }

"use server"
import { cookies } from "next/headers"
import { decrypt } from "@/app/lib/session"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { UserResponse } from "@/types/user"
import { convertTimestampToString } from "@/utils/converter"

// Hàm này có thể không cần thiết nếu bạn chỉ cần lấy cookie
async function getCookieData() {
  const cookieData = cookies().getAll()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}

export async function getServerSideUser(): Promise<UserResponse | undefined> {
  try {
    // Lấy cookie một cách đồng bộ
    const cookies = (await getCookieData()) as [string, { value: string }][]
    console.log("cookies", cookies)
    const sessionCookie: any = cookies.find((key: any) => key.name === "session")
    console.log("sessionCookie", sessionCookie)

    if (!sessionCookie?.value) {
      return undefined
    }

    // Giải mã phiên làm việc
    const session = await decrypt(sessionCookie.value)
    if (!session?.userId) {
      return undefined
    }

    // Truy vấn Firestore
    const usersRef = collection(db, "users")
    const userQuery = query(usersRef, where("uid", "==", session.userId))
    const querySnapshot = await getDocs(userQuery)

    if (querySnapshot.empty) {
      return undefined
    }

    const userDoc = querySnapshot.docs[0]?.data()
    if (!userDoc) {
      return undefined
    }

    // Chuyển đổi và trả về dữ liệu người dùng
    return {
      ...userDoc,
      lastSeen: convertTimestampToString(userDoc.lastSeen),
    } as UserResponse
  } catch (error) {
    console.error("Error in getServerSideUser :", error)
    return undefined
  }
}
