/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"
import Board from "@/components/board/Board"
import ButtonCreateNewBoard from "@/components/vocabulary/ButtonCreateNewBoard"
import { getAllBoardByUser } from "@/app/vocabulary/action"

const MyVocabulary = ({ userId }: { userId: string | undefined }) => {
  const [boards, setBoards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true)
      const res: any = await getAllBoardByUser(userId)
      if (res.success) {
        setBoards(res.boards)
      }
      setLoading(false)
    }
    fetchBoards()
  }, [userId])

  if (loading) return <p>Đang tải...</p>

  return (
    <div>
      <div className="flex items-center gap-2 mt-2">
        <Button
          className="border-blue-700 text-blue-700 bg-blue-50 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-500"
          variant="outline"
        >
          <Plus />
          Tạo học phần mới
        </Button>
        <Button
          className="border-green-700 text-green-700 bg-green-50 hover:text-green-500 hover:bg-green-50 hover:border-green-500"
          variant="outline"
        >
          <Download />
          Trích xuất từ văn bản
        </Button>
      </div>
      <ButtonCreateNewBoard userId={userId} setBoards={setBoards} />
      <div className="w-full grid grid-cols-4 gap-4 mt-4">
        {boards?.map((board: any) => (
          <Board key={board.id} boardData={board} />
        ))}
      </div>
    </div>
  )
}

export default MyVocabulary
