/* eslint-disable @typescript-eslint/no-explicit-any */
// Action Board
import { db } from "@/lib/firebase"
import { BoardType } from "@/types/vocabulary"
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  FirestoreError,
  doc,
  writeBatch,
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
    const boardsRef = collection(db, "board")
    const q = query(boardsRef, where("userId", "==", userId), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)

    // Chuyển đổi các tài liệu thành mảng BoardType
    const boards: BoardType[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name || "",
      color: doc.data().color || "",
      createdAt: doc.data().createdAt,
      userId: doc.data().userId,
      order: doc.data().order || 0,
      ...doc.data(),
    }))

    return {
      success: true,
      boards,
    }
  } catch (error) {
    const firestoreError = error as FirestoreError
    return {
      success: false,
      message: "Không thể lấy danh sách board, vui lòng thử lại sau.",
      error: firestoreError,
    }
  }
}

// Hàm cập nhật thứ tự board
export const updateBoardOrder = async (boards: BoardType[]) => {
  try {
    const batch = writeBatch(db)

    // Duyệt và cập nhật order cho từng board
    boards.forEach((board) => {
      const boardRef = doc(db, "board", board.id)
      batch.update(boardRef, { order: board?.order })
    })

    // Commit batch update
    await batch.commit()

    return {
      success: true,
      message: "Cập nhật thứ tự thành công",
    }
  } catch (error) {
    const firestoreError = error as FirestoreError
    console.error("Lỗi khi cập nhật thứ tự:", firestoreError)

    return {
      success: false,
      message: "Không thể cập nhật thứ tự",
      error: firestoreError,
    }
  }
}
