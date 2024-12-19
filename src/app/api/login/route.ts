// import { cookies } from "next/headers"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { createSession } from "@/app/lib/session"

const addUser = async (data: any) => {
  try {
    await addDoc(collection(db, "users"), { ...data, role: "USER" })
    return data
  } catch (error) {
    console.error("Lỗi thêm document: ", error)
    throw error // Ném lỗi để có thể xử lý ở nơi gọi
  }
}

const findUserByEmail = async (email: string) => {
  const q = query(collection(db, "users"), where("email", "==", email))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null // Không tìm thấy người dùng
  }

  const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return users // Trả về danh sách người dùng
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = body.formData

    // Tìm người dùng theo email
    const user = await findUserByEmail(data.email).then(async (userOld: any) => {
      if (userOld) {
        await createSession(userOld[0]?.uid)
        return userOld[0]
      } else {
        await addUser(data).then(async (newUser) => {
          await createSession(newUser.uid)
          return newUser
        })
      }
    })

    return NextResponse.json({
      success: true,
      message: "Đăng nhập thành công.",
      user,
    })
  } catch (error: any) {
    console.error("Lỗi trong hàm POST: ", error)
    return NextResponse.json(
      {
        success: false,
        error: "Tạo user thất bại: " + error.message,
      },
      { status: 500 }
    )
  }
}
