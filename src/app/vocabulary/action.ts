/* eslint-disable @typescript-eslint/no-explicit-any */
// Action Board
import { db } from "@/lib/firebase"
import { BoardType, SectionType } from "@/types/vocabulary"
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
  serverTimestamp,
  FirestoreError,
  doc,
  writeBatch,
  // updateDoc,
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

export const findBoardById = async (boardId: any) => {
  try {
    const boardRef = doc(db, "board", boardId) // Tạo tham chiếu đến tài liệu board theo ID
    const boardSnapshot = await getDoc(boardRef) // Lấy tài liệu từ Firestore

    if (boardSnapshot.exists()) {
      // Nếu tài liệu tồn tại, trả về dữ liệu
      return {
        success: true,
        board: {
          id: boardSnapshot.id,
          ...boardSnapshot.data(), // Lấy dữ liệu từ tài liệu
        },
      }
    } else {
      // Nếu tài liệu không tồn tại
      return {
        success: false,
        message: "Không tìm thấy board với ID đã cho.",
      }
    }
  } catch (error) {
    return {
      success: false,
      message: "Không thể tìm thấy board, vui lòng thử lại sau.",
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

export const createSection = async (section: SectionType) => {
  try {
    if (section.boardId) {
      const response = await findBoardById(section.boardId)
      if (response.success) {
        const res = await addDoc(collection(db, "section"), {
          ...section,
          createdAt: serverTimestamp(),
        })
        return {
          success: true,
          message: "Tạo học phần thành công",
          res,
        }
      } else {
        return response
      }
    }
  } catch (error) {
    return {
      success: false,
      message: "Lỗi tạo học phần, vui lòng thử lại!!!",
      error,
    }
  }
}

export interface ResponseSection {
  id: string
  title: string
  length: number
  order: number
}
export const getAllSectionOfBoard = async (boardId: string) => {
  try {
    const sectionsRef = collection(db, "section") // Tham chiếu đến collection "section"
    const q = query(sectionsRef, where("boardId", "==", boardId), orderBy("createdAt", "desc")) // Tạo truy vấn

    const querySnapshot = await getDocs(q) // Lấy tài liệu từ Firestore

    // Chuyển đổi các tài liệu thành mảng SectionType
    const sections: ResponseSection[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      length: doc.data().listInput?.length || 0,
      order: doc.data().order || 0,
    }))

    return {
      success: true,
      sections, // Trả về danh sách sections
      message: "Lấy sections thành công",
    }
  } catch (error) {
    const firestoreError = error as FirestoreError // Xử lý lỗi
    return {
      success: false,
      message: "Không thể lấy danh sách section, vui lòng thử lại sau.", // Sửa thông báo cho đúng ngữ cảnh
      error: firestoreError,
    }
  }
}

// Cập nhật thứ tự của sections trong cùng một board
export const updateSectionsOrder = async (
  sections: {
    id: string
    order: number
    boardId: string
  }[]
) => {
  try {
    const batch = writeBatch(db)

    sections.forEach((section) => {
      const sectionRef = doc(db, "section", section.id)
      batch.update(sectionRef, {
        order: section.order,
        boardId: section.boardId,
      })
    })

    await batch.commit()

    return {
      success: true,
      message: "Cập nhật thứ tự học phần thành công",
    }
  } catch (error) {
    const firestoreError = error as FirestoreError
    return {
      success: false,
      message: "Không thể cập nhật thứ tự học phần",
      error: firestoreError,
    }
  }
}

// Cập nhật nhiều sections cùng lúc khi di chuyển giữa các boards
export const updateMultipleSections = async (updates: {
  sourceBoardSections: {
    id: string
    order: number
  }[]
  targetBoardSections: {
    id: string
    order: number
  }[]
  movedSectionId: string
  targetBoardId: string
}) => {
  try {
    const batch = writeBatch(db)

    // Cập nhật thứ tự cho các sections trong board nguồn
    updates.sourceBoardSections.forEach((section) => {
      const sectionRef = doc(db, "section", section.id)
      batch.update(sectionRef, { order: section.order })
    })

    // Cập nhật thứ tự cho các sections trong board đích
    updates.targetBoardSections.forEach((section) => {
      const sectionRef = doc(db, "section", section.id)
      batch.update(sectionRef, { order: section.order })
    })

    // Cập nhật section được di chuyển
    const movedSectionRef = doc(db, "section", updates.movedSectionId)
    batch.update(movedSectionRef, {
      boardId: updates.targetBoardId,
      order: updates.targetBoardSections.find((s) => s.id === updates.movedSectionId)?.order || 0,
      updatedAt: serverTimestamp(),
    })

    await batch.commit()

    return {
      success: true,
      message: "Cập nhật vị trí học phần thành công",
    }
  } catch (error) {
    const firestoreError = error as FirestoreError
    return {
      success: false,
      message: "Không thể cập nhật vị trí học phần",
      error: firestoreError,
    }
  }
}

interface ActionResponse {
  success: boolean
  message: string
  error?: FirestoreError
}

// Interface cho section cần xóa
// interface SectionToDelete {
//   id: string
//   boardId: string
// }

// Hàm xóa board và tất cả section liên quan
export const deleteBoardAndSections = async (boardId: string): Promise<ActionResponse> => {
  try {
    const batch = writeBatch(db)
    // 1. Lấy tất cả section thuộc board
    const sectionsRef = collection(db, "section")
    const q = query(sectionsRef, where("boardId", "==", boardId))
    const querySnapshot = await getDocs(q)
    // 2. Thêm các lệnh xóa section vào batch
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })
    // 3. Thêm lệnh xóa board vào batch
    const boardRef = doc(db, "board", boardId)
    batch.delete(boardRef)
    // 4. Thực hiện batch
    await batch.commit()
    return {
      success: true,
      message: "Đã xóa nhóm và tất cả học phần thành công",
    }
  } catch (error) {
    const firestoreError = error as FirestoreError
    return {
      success: false,
      message: "Không thể xóa nhóm, vui lòng thử lại sau",
      error: firestoreError,
    }
  }
}
