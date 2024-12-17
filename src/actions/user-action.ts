/* eslint-disable @typescript-eslint/no-explicit-any */
// import { cookies } from "next/headers"
// import { db } from "@/lib/firebase"
// import { collection, getDocs, query, where } from "firebase/firestore"
// import { UserResponse } from "@/types/user"

// export async function getMe(): Promise<UserResponse | null> {
//   try {
//     const cookieStore = cookies()
//     const userCookie = cookieStore.get("userData")
//     console.log("User Cookie:", userCookie)

//     if (!userCookie) {
//       console.log("Không tìm thấy cookie")
//       return null
//     }

//     // Kiểm tra và parse giá trị cookie
//     let userData: { uid: string }[]
//     try {
//       userData = JSON.parse(userCookie.value)

//       // Kiểm tra tính hợp lệ của mảng
//       if (!Array.isArray(userData) || userData.length === 0) {
//         console.error("Dữ liệu cookie không hợp lệ")
//         return null
//       }
//     } catch (parseError) {
//       console.error("Lỗi parse cookie:", parseError)
//       return null
//     }

//     // Truy vấn người dùng
//     const q = query(collection(db, "users"), where("uid", "==", userData[0].uid))

//     const querySnapshot = await getDocs(q)

//     // Kiểm tra kết quả truy vấn
//     if (querySnapshot.empty) {
//       console.log("Không tìm thấy người dùng với UID:", userData[0].uid)
//       return null
//     }

//     // Lấy document đầu tiên
//     const userDoc = querySnapshot.docs[0].data() as UserResponse

//     const user: UserResponse = {
//       uid: userDoc.uid || "",
//       email: userDoc.email || "",
//       displayName: userDoc.displayName || "",
//       photoURL: userDoc.photoURL || "",
//       accessToken: userDoc.accessToken || "",
//       role: userDoc.role || "",
//     }

//     console.log("Thông tin người dùng:", user)
//     return user
//   } catch (error) {
//     console.error("Lỗi không mong muốn trong getMe():", error)
//     return null
//   }
// }

export async function logout(): Promise<void> {
  await fetch("/api/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
}
