/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react"
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
import { toast } from "sonner"

// Firebase
import { db } from "@/lib/firebase"
import { doc, writeBatch } from "firebase/firestore"
import { BoardType } from "@/types/vocabulary"
import { ResponseSection } from "@/app/vocabulary/action"

// Component sortable board riêng
export const SortableBoard = ({
  board,
  children,
}: {
  board: BoardType
  children: React.ReactNode
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: board.id,
    disabled: false,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "move",
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.9 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

const MyVocabulary = ({
  userId,
  listBoard,
  listSection,
}: {
  userId: string | undefined
  listBoard: BoardType[]
  listSection: ResponseSection[] | []
}) => {
  const [boards, setBoards] = useState<BoardType[]>(listBoard || [])

  // Cấu hình sensors cho trải nghiệm kéo thả đa dạng
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
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

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div>
        <ButtonCreateNewBoard userId={userId} setBoards={setBoards} />
        <SortableContext items={boards.map((board) => board.id)} strategy={rectSortingStrategy}>
          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {boards?.map((board) => (
              <SortableBoard key={board.id} board={board}>
                <Board
                  boardData={board}
                  setBoards={setBoards}
                  listSectionData={listSection?.filter(
                    (el: ResponseSection) => el.boardId === board.id
                  )}
                />
              </SortableBoard>
            ))}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default MyVocabulary
