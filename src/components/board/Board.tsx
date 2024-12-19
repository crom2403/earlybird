/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { getAllSectionOfBoard, ResponseSection } from "@/app/vocabulary/action"
import SectionItem from "@/components/vocabulary/SectionItem"
import { cn } from "@/lib/utils"
import { BoardType } from "@/types/vocabulary"
import { Ellipsis, Plus } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"

const Board = ({ boardData }: { boardData: BoardType }) => {
  const [listSection, setListSection] = useState<ResponseSection[]>([])

  const handleGetListSection = async () => {
    const res = await getAllSectionOfBoard(boardData.id)
    console.log(res)
    if (res.success) {
      setListSection(res.sections || []) // Gán danh sách sections
    } else {
      setListSection([]) // Nếu không thành công, gán mảng rỗng
    }
  }
  useEffect(() => {
    handleGetListSection()
  }, [])
  return (
    <div
      className={cn(
        "w-full rounded-xl flex flex-col gap-4 p-4 border",
        boardData.color === "orange" ? "bg-board-orange-background border-board-orange-border" : "",
        boardData.color === "blue" ? "bg-board-blue-background border-board-blue-border" : "",
        boardData.color === "green" ? "bg-board-green-background border-board-green-border" : "",
        boardData.color === "violet" ? "bg-board-violet-background border-board-violet-border" : "",
        boardData.color === "red" ? "bg-board-red-background border-board-red-border" : "",
        boardData.color === "mint" ? "bg-board-mint-background border-board-mint-border" : "",
        boardData.color === "pink" ? "bg-board-pink-background border-board-pink-border" : ""
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "font-bold text-xl",
              boardData.color === "orange" ? " text-board-orange-border" : "",
              boardData.color === "blue" ? " text-board-blue-border" : "",
              boardData.color === "green" ? " text-board-green-border" : "",
              boardData.color === "violet" ? " text-board-violet-border" : "",
              boardData.color === "red" ? " text-board-red-border" : "",
              boardData.color === "mint" ? " text-board-mint-border" : "",
              boardData.color === "pink" ? " text-board-pink-border" : ""
            )}
          >
            {boardData.name}
          </p>
        </div>
        <div className="flex items-center gap-2 text-black hover:cursor-pointer hover:text-blue-600">
          <Ellipsis />
        </div>
      </div>
      {listSection?.map((section: ResponseSection) => (
        <SectionItem key={section.id} section={section} />
      ))}
      <Link href={`/vocabulary/create/${boardData.id}`}>
        <div
          className={cn(
            "border-dashed border-2 rounded-xl border-blue-600 bg-blue-100 flex items-center justify-center h-10 text-blue-600",
            boardData.color === "orange"
              ? "bg-board-orange-bg_button border-board-orange-border text-board-orange-border"
              : "",
            boardData.color === "blue"
              ? "bg-board-blue-bg_button border-board-blue-border text-board-blue-border"
              : "",
            boardData.color === "green"
              ? "bg-board-green-bg_button border-board-green-border text-board-green-border"
              : "",
            boardData.color === "violet"
              ? "bg-board-violet-bg_button border-board-violet-border text-board-violet-border"
              : "",
            boardData.color === "red"
              ? "bg-board-red-bg_button border-board-red-border text-board-red-border"
              : "",
            boardData.color === "mint"
              ? "bg-board-mint-bg_button border-board-mint-border text-board-mint-border"
              : "",
            boardData.color === "pink"
              ? "bg-board-pink-bg_button border-board-pink-border text-board-pink-border"
              : ""
          )}
        >
          <Plus className="size-5 mr-2" /> <p>Tạo học phần mới</p>
        </div>
      </Link>
    </div>
  )
}

export default Board
