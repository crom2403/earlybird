/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"

const addUser = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "users"), data)
    return docRef
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
    console.log("body", body)

    const user = await findUserByEmail(data.email) // Chờ kết quả
    console.log("users", user)

    if (!user) {
      await addUser(data)
    }
    return NextResponse.json({
      success: true,
      message: "Đăng nhập thành công.",
    })
  } catch (error: any) {
    console.error("Lỗi trong hàm POST: ", error)
    return NextResponse.json({ error: "Tạo user thất bại: " + error.message }, { status: 500 })
  }
}
