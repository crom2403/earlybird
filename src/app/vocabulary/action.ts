/* eslint-disable @typescript-eslint/no-explicit-any */
// Action Board
import { db } from "@/lib/firebase"
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  FirestoreError,
} from "firebase/firestore"

export const createBoard = async (data: any) => {
  try {
    const res = await addDoc(collection(db, "board"), { ...data, createdAt: serverTimestamp() })
    return {
      success: true,
      message: "Tạo nhóm thành công",
      res,
    }
  } catch (error) {
    return {
      success: false,
      message: "Tạo nhóm không thành công vui lòng thử lại!!!",
      error,
    }
  }
}

export const getAllBoardByUser = async (userId: string | undefined) => {
  try {
    // Tạo truy vấn để lấy tất cả các board của người dùng theo userId
    const boardsRef = collection(db, "board")
    const q = query(boardsRef, where("userId", "==", userId), orderBy("createdAt", "desc"))

    // Lấy tất cả các tài liệu từ truy vấn
    const querySnapshot = await getDocs(q)

    // Chuyển đổi các tài liệu thành mảng
    const boards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return {
      success: true,
      boards,
    }
  } catch (error) {
    const firestoreError = error as FirestoreError
    // Kiểm tra lỗi "index" và gợi ý tạo chỉ mục nếu cần
    if (firestoreError.code === "failed-precondition") {
      console.error(
        "Firestore Index cần được tạo. Hãy truy cập liên kết sau để tạo chỉ mục:",
        firestoreError.message
      )
    }

    return {
      success: false,
      message: "Không thể lấy danh sách board, vui lòng thử lại sau.",
      error: firestoreError,
    }
  }
}
