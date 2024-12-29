/* eslint-disable @typescript-eslint/no-explicit-any */
// Action Board
"use server"
import { db } from "@/lib/firebase"
import { BoardType, SectionType } from "@/types/vocabulary"
import { convertTimestampToString } from "@/utils/converter"
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
  updateDoc,
  limit as firestoreLimit,
  startAfter,
  deleteDoc,
} from "firebase/firestore"

export const createBoard = async (data: any) => {
  try {
    await addDoc(collection(db, "board"), { ...data, createdAt: serverTimestamp() })
    return {
      success: true,
      message: "Tạo nhóm thành công",
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
      createdAt: convertTimestampToString(doc.data().createdAt || ""),
      userId: doc.data().userId,
      order: doc.data().order || 0,
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
        await addDoc(collection(db, "section"), {
          ...section,
          createdAt: serverTimestamp(),
        })
        return {
          success: true,
          message: "Tạo học phần thành công",
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
  boardId: string
}
export const getAllSectionOfBoard = async (boardId: string) => {
  try {
    const sectionsRef = collection(db, "section") // Tham chiếu đến collection "section"
    const q = query(sectionsRef, where("boardId", "==", boardId), orderBy("createdAt", "desc")) // Tạo truy vấn

    const querySnapshot = await getDocs(q) // Lấy tài liệu từ Firestore

    // Chuyển đổi các tài liệu thành mảng SectionType
    const sections: ResponseSection[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title || "",
      length: doc.data().listInput?.length || 0,
      order: doc.data().order || 0,
      boardId,
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

// Hàm xóa section
export const deleteSection = async (sectionId: string): Promise<ActionResponse> => {
  try {
    const sectionRef = doc(db, "section", sectionId)
    await deleteDoc(sectionRef)
    return {
      success: true,
      message: "Đã xóa học phần thành công",
    }
  } catch (error) {
    const firestoreError = error as FirestoreError
    return {
      success: false,
      message: "Không thể xóa học phần, vui lòng thử lại sau",
      error: firestoreError,
    }
  }
}

// Thêm interface để định nghĩa kiểu dữ liệu update
interface UpdateBoardData {
  name?: string
  color?: string
}

export const updateBoard = async (boardId: string, data: UpdateBoardData) => {
  try {
    const boardRef = doc(db, "board", boardId)
    const updateData = { ...data } as { [key: string]: any }
    await updateDoc(boardRef, updateData)

    return {
      success: true,
      message: "Cập nhật nhóm thành công",
    }
  } catch (error) {
    const firestoreError = error as FirestoreError
    return {
      success: false,
      message: "Không thể cập nhật nhóm, vui lòng thử lại sau.",
      error: firestoreError,
    }
  }
}

export const getSectionById = async (sectionId: string) => {
  try {
    const sectionRef = doc(db, "section", sectionId)
    const sectionSnapshot = await getDoc(sectionRef)
    if (sectionSnapshot.exists()) {
      return {
        success: true,
        section: {
          id: sectionSnapshot.id,
          ...sectionSnapshot.data(),
        },
      }
    } else {
      return {
        success: false,
        message: "Không tìm thấy học phần",
      }
    }
  } catch (error) {
    return {
      success: false,
      message: "Lỗi khi lấy thông tin học phần",
      error,
    }
  }
}

// Thêm hàm để cập nhật section
export const updateSection = async (sectionId: string, data: any) => {
  try {
    const sectionRef = doc(db, "section", sectionId)
    await updateDoc(sectionRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
    return {
      success: true,
      message: "Cập nhật học phần thành công",
    }
  } catch (error) {
    return {
      success: false,
      message: "Lỗi khi cập nhật học phần",
      error,
    }
  }
}

export const getAllStudyTimeByUser = async (
  userId: string
): Promise<{ date: string; totalTime: number }[]> => {
  try {
    // Lấy reference đến collection "studyTime"
    const studyTimeRef = collection(db, "studyTime")

    // Tạo truy vấn để tìm các tài liệu có userId tương ứng
    const q = query(
      studyTimeRef,
      where("userId", "==", userId),
      where("year", "==", new Date().getFullYear())
    )

    // Thực hiện truy vấn và lấy kết quả
    const querySnapshot = await getDocs(q)

    // Khởi tạo mảng để lưu trữ các bản ghi học tập

    // Duyệt qua các tài liệu và lưu thông tin vào mảng
    const dataResponse: { date: string; totalTime: number }[] = querySnapshot.docs.map((doc) => {
      return {
        date: convertTimestampToString(doc.data().date) || "",
        totalTime: doc.data().totalTime || 0,
      }
    })

    // Trả về mảng các bản ghi học tập
    return dataResponse
  } catch (error) {
    console.error("Error fetching study time:", error) // In ra lỗi nếu có
    return [] // Trả về mảng rỗng nếu có lỗi
  }
}

export const getTodayStudyTime = async (userId: string): Promise<number> => {
  try {
    // Lấy reference đến collection "studyTime"
    const studyTimeRef = collection(db, "studyTime")

    // Tạo truy vấn để tìm các tài liệu có userId tương ứng
    const q = query(
      studyTimeRef,
      where("userId", "==", userId),
      where("year", "==", new Date().getFullYear())
    )

    // Sau đó, bạn có thể thêm điều kiện `where` thứ ba bằng cách sử dụng `query` một lần nữa
    const finalQuery = query(
      q,
      where("month", "==", new Date().getMonth() + 1),
      where("day", "==", +String(new Date().getDate()).padStart(2, "0"))
    )

    // Thực hiện truy vấn và lấy kết quả
    const querySnapshot = await getDocs(finalQuery)

    // Khởi tạo mảng để lưu trữ các bản ghi học tập

    // Duyệt qua các tài liệu và lưu thông tin vào mảng
    let totalTimeToday = 0
    querySnapshot.docs.forEach((doc) => {
      totalTimeToday = totalTimeToday + doc.data().totalTime || 0
    })

    // Trả về mảng các bản ghi học tập
    return totalTimeToday
  } catch (error) {
    console.error("Error fetching study time:", error) // In ra lỗi nếu có
    return 0 // Trả về mảng rỗng nếu có lỗi
  }
}

export const getMonthlyStudyTime = async (userId: string): Promise<number> => {
  try {
    // Lấy reference đến collection "studyTime"
    const studyTimeRef = collection(db, "studyTime")

    // Tạo truy vấn để tìm các tài liệu có userId tương ứng
    const q = query(
      studyTimeRef,
      where("userId", "==", userId),
      where("year", "==", new Date().getFullYear())
    )

    const finalQuery = query(q, where("month", "==", new Date().getMonth() + 1))

    // Thực hiện truy vấn và lấy kết quả
    const querySnapshot = await getDocs(finalQuery)

    // Khởi tạo mảng để lưu trữ các bản ghi học tập

    // Duyệt qua các tài liệu và lưu thông tin vào mảng
    let totalTimeWeek = 0
    querySnapshot.docs.forEach((doc) => {
      totalTimeWeek = totalTimeWeek + doc.data().totalTime || 0
    })

    // Trả về mảng các bản ghi học tập
    return totalTimeWeek
  } catch (error) {
    console.error("Error fetching study time:", error) // In ra lỗi nếu có
    return 0 // Trả về mảng rỗng nếu có lỗi
  }
}

export const getAllSectionPublic = async (page: number = 1, limit: number = 20) => {
  try {
    const sectionsRef = collection(db, "section")
    const totalQuery = query(sectionsRef, where("isPublic", "==", true))
    const totalSnapshot = await getDocs(totalQuery)
    const totalDocuments = totalSnapshot.size
    const totalPage = Math.ceil(totalDocuments / limit)

    let lastDoc = null
    if (page > 1) {
      // Get the last document from the previous page
      const previousPageQuery = query(
        sectionsRef,
        where("isPublic", "==", true),
        orderBy("createdAt", "desc"),
        firestoreLimit((page - 1) * limit)
      )
      const previousPageSnapshot = await getDocs(previousPageQuery)
      lastDoc = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1]
    }

    // Build query with startAfter if not first page
    const q = lastDoc
      ? query(
          sectionsRef,
          where("isPublic", "==", true),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          firestoreLimit(limit)
        )
      : query(
          sectionsRef,
          where("isPublic", "==", true),
          orderBy("createdAt", "desc"),
          firestoreLimit(limit)
        )

    const querySnapshot = await getDocs(q)

    const sections = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title || "",
      length: doc.data().listInput?.length || 0,
      order: doc.data().order || 0,
      user: doc.data().user || {},
    }))

    return {
      success: true,
      sections,
      totalPage,
      currentPage: page,
      message: "Lấy sections public thành công",
    }
  } catch (error) {
    const firestoreError = error as FirestoreError
    return {
      success: false,
      sections: [],
      totalPage: 0,
      currentPage: page,
      message: "Không thể lấy danh sách section public, vui lòng thử lại sau.",
      error: firestoreError,
    }
  }
}
