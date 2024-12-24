/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import {
  deleteBoardAndSections,
  getAllSectionOfBoard,
  ResponseSection,
  updateSectionsOrder,
} from "@/app/vocabulary/action"
import SectionItem from "@/components/vocabulary/SectionItem"
import { cn } from "@/lib/utils"
import { BoardType } from "@/types/vocabulary"
import { Ellipsis, Plus, Settings, Trash2 } from "lucide-react"
import Link from "next/link"
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
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { toast } from "sonner"
import SortableSection from "../vocabulary/SortableSection"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getAllBoardByUser } from "@/app/vocabulary/action"
import ButtonEditBoard from "@/components/vocabulary/ButtonEditBoard"
import Loading from "@/app/loading"

const Board = ({
  boardData,
  setBoards,
  listSectionData,
}: {
  boardData: BoardType
  setBoards: any
  listSectionData: any
}) => {
  const [listSection, setListSection] = useState<ResponseSection[]>(listSectionData || [])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const userId = boardData.userId

  // Thêm cấu hình sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Thêm activationConstraint để chỉ kích hoạt khi kéo
      activationConstraint: {
        distance: 8, // Khoảng cách tối thiểu (px) trước khi bắt đầu kéo
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // const handleGetListSection = async () => {
  //   const res = await getAllSectionOfBoard(boardData.id)
  //   if (res.success) {
  //     setListSection(res.sections || [])
  //   } else {
  //     setListSection([])
  //   }
  //   setLoading(false)
  // }

  const handleDeleteBoard = async (boardId: string) => {
    try {
      const result = await deleteBoardAndSections(boardId)
      if (result.success) {
        toast.success(result.message)
        // Đóng dialog xóa
        setOpenDeleteDialog(false) // hoặc tên state tương ứng của bạn
        // Gọi API cập nhật lại danh sách board
        const updatedBoards = await getAllBoardByUser(userId)
        if (updatedBoards.success && updatedBoards.boards) {
          setBoards(updatedBoards.boards)
        }
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa nhóm")
    }
  }

  // useEffect(() => {
  //   handleGetListSection()
  // }, [])
  if (loading) return <Loading />

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = listSection.findIndex((section) => section.id === active.id)
      const newIndex = listSection.findIndex((section) => section.id === over?.id)

      const updatedSections = [...listSection]
      const [movedSection] = updatedSections.splice(oldIndex, 1)
      updatedSections.splice(newIndex, 0, movedSection)

      const sectionsToUpdate = updatedSections.map((section, index) => ({
        id: section.id,
        order: index,
        boardId: boardData.id,
      }))

      try {
        const result = await updateSectionsOrder(sectionsToUpdate)
        if (result.success) {
          setListSection(updatedSections)
          toast.success("Cập nhật thứ tự học phần thành công")
        }
      } catch (error) {
        toast.error("Không thể cập nhật thứ tự học phần")
      }
    }
  }

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
      <div className="flex items-center justify-between relative">
        <div className="flex-1">
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
        <div
          className="ml-2"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="text-black hover:cursor-pointer hover:text-blue-600"
                onClick={(e) => e.stopPropagation()}
              >
                <Ellipsis className="size-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-40 flex flex-col p-0 dark:border-slate-200">
              <ButtonEditBoard
                boardId={boardData.id}
                color={boardData.color}
                name={boardData.name}
                setBoards={setBoards}
              />

              <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <DialogTrigger>
                  <div className="cursor-pointer bg-white text-black flex gap-2 hover:bg-slate-100 p-2 rounded-b-sm">
                    <Trash2 className="size-5" />
                    <p>Xóa</p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Xóa</DialogTitle>
                    <DialogDescription>
                      Bạn có chắc chắn muốn xóa nhóm này?. Tất cả học phần trong nhóm cũng sẽ bị
                      xóa!
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Không
                      </Button>
                    </DialogClose>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        handleDeleteBoard(boardData.id)
                      }}
                    >
                      Xóa
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </PopoverContent>
          </Popover>
        </div>
      </div>
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

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={listSection.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          {listSection?.map((section: ResponseSection) => (
            <SortableSection key={section.id} section={section}>
              <SectionItem section={section} />
            </SortableSection>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default Board
