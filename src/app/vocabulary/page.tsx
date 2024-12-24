/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import React from "react"
import MyVocabulary from "@/components/vocabulary/MyVocabulary"
import { getServerSideUser } from "@/app/lib/payload-utils"
import { User } from "@/types/user"
import { getAllBoardByUser, getAllSectionOfBoard, ResponseSection } from "@/app/vocabulary/action"
import { BoardType } from "@/types/vocabulary"
import { NextResponse } from "next/server"

const page = async () => {
  const user: User | undefined = await getServerSideUser()
  const plainUser = user ? JSON.parse(JSON.stringify(user)) : undefined

  const boardRes = await getAllBoardByUser(user?.uid || "")
  const sortedBoards: BoardType[] = boardRes.success
    ? (boardRes.boards as BoardType[]).sort((a, b) => (a.order || 0) - (b.order || 0))
    : []

  // Giảm tải khi lấy dữ liệu Sections
  const listSection = await fetchSections(sortedBoards)
  // Thiết lập header Cache-Control
  // const response = NextResponse.next()
  // response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")

  return (
    <div className="container mx-auto p-4">
      {user ? (
        <MyVocabulary
          userId={plainUser?.uid || ""}
          // listBoard={sortedBoards}
          listSection={listSection}
        />
      ) : (
        <p>Bạn chưa đăng nhập hoặc không có nhóm nào!</p>
      )}
    </div>
  )
}

// Hàm tối ưu hóa việc lấy Sections
const fetchSections = async (sortedBoards: BoardType[]): Promise<ResponseSection[]> => {
  if (sortedBoards.length === 0) return []

  const responses = await Promise.allSettled(
    sortedBoards.map((board) => getAllSectionOfBoard(board.id))
  )

  return responses
    .filter((res): res is PromiseFulfilledResult<any> => res.status === "fulfilled")
    .flatMap((res) => (res.value.success ? res.value.sections : []))
}

export default page
