"use client"
import React, { useEffect, useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import Board from "@/components/board/Board"
import ButtonCreateNewBoard from "@/components/vocabulary/ButtonCreateNewBoard"
import { getAllBoardByUser } from "@/app/vocabulary/action"
import { toast } from "sonner"

// Firebase
import { db } from "@/lib/firebase"
import { doc, writeBatch } from "firebase/firestore"
import { BoardType } from "@/types/vocabulary"

// Component sortable board riêng
const SortableBoard = ({ board, children }: { board: BoardType; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: board.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "move",
    // Shadow khi kéo
    boxShadow: isDragging
      ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      : "none",
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.9 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

const MyVocabulary = ({ userId }: { userId: string | undefined }) => {
  const [boards, setBoards] = useState<BoardType[]>([])
  const [loading, setLoading] = useState(true)

  // Cấu hình sensors cho trải nghiệm kéo thả đa dạng
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true)
      const res = await getAllBoardByUser(userId)

      if (res.success && res.boards) {
        // Ép kiểu và thêm các trường còn thiếu nếu cần
        const sortedBoards = (res.boards as BoardType[]).sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        )
        setBoards(sortedBoards)
      }
      setLoading(false)
    }
    fetchBoards()
  }, [userId])

  // Xử lý kết thúc kéo thả
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      try {
        // Tạo batch để cập nhật nhiều document
        const batch = writeBatch(db)

        // Tạo bản sao mới của boards để không ảnh hưởng trực tiếp
        const newBoards = [...boards]
        const oldIndex = newBoards.findIndex((board) => board.id === active.id)
        const newIndex = newBoards.findIndex((board) => board.id === over?.id)

        // Di chuyển phần tử
        const reorderedBoards = arrayMove(newBoards, oldIndex, newIndex)

        // Cập nhật order cho từng board
        reorderedBoards.forEach((board, index) => {
          const boardRef = doc(db, "board", board.id)
          batch.update(boardRef, { order: index })
        })

        // Commit batch
        await batch.commit()

        // Cập nhật state local
        setBoards(reorderedBoards)

        toast.success("Thứ tự học phần đã được cập nhật")
      } catch (error) {
        console.error("Lỗi khi cập nhật thứ tự:", error)
        toast.error("Không thể cập nhật thứ tự học phần")
      }
    }
  }

  if (loading) return <p>Đang tải...</p>

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div>
        <ButtonCreateNewBoard userId={userId} setBoards={setBoards} />

        <SortableContext items={boards.map((board) => board.id)} strategy={rectSortingStrategy}>
          <div className="w-full grid grid-cols-4 gap-4 mt-4">
            {boards?.map((board) => (
              <SortableBoard key={board.id} board={board}>
                <Board boardData={board} />
              </SortableBoard>
            ))}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default MyVocabulary
