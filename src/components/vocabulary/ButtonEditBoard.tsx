/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import React, { Dispatch, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { listColor } from "@/utils/contants"
import { ListColorType } from "@/types/vocabulary"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { toast } from "sonner"
import { updateBoard } from "@/app/vocabulary/action"

const ButtonEditBoard = ({
  boardId,
  color,
  name,
  setBoards,
}: {
  boardId: string
  color: string
  name: string
  setBoards: Dispatch<SetStateAction<any>>
}) => {
  const [selectColor, setSelectColor] = useState<string>(color || "")
  const [nameGroup, setNameGroup] = useState<string>(name || "")
  const [isShowPopup, setIsShowPopup] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleUpdateBoard = async () => {
    if (!nameGroup.trim()) {
      toast.error("Tên nhóm không được để trống!")
      return
    }
    setIsCreating(true)
    const res = await updateBoard(boardId, { name: nameGroup, color: selectColor })

    // Thêm xử lý kết quả và cập nhật state
    if (res.success) {
      setBoards((prev: any) => {
        return prev.map((board: any) => {
          if (board.id === boardId) {
            return { ...board, name: nameGroup, color: selectColor }
          }
          return board
        })
      })
      toast.success("Cập nhật thành công!")
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!")
    }

    setIsCreating(false)
    setIsShowPopup(false)
  }

  return (
    <Dialog open={isShowPopup} onOpenChange={setIsShowPopup}>
      <DialogTrigger asChild>
        <div className="cursor-pointer bg-white text-black flex gap-2 hover:bg-slate-100 p-2 rounded-t-sm">
          <Settings className="size-5" />
          <p>Sửa</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] grid grid-cols-8 gap-0 p-0 dark:bg-white dark:text-black">
        <div className="col-span-3 w-full h-full">
          <Image
            src="/gif/background_dialog_cat.gif"
            alt="cat"
            className="w-full object-cover rounded-s-md"
            width={150}
            height={220}
          />
        </div>
        <div className="col-span-5 flex flex-col gap-4 p-4">
          <div>
            <p>Nhập tên nhóm:</p>
            <Input
              value={nameGroup}
              placeholder="Nhập tên nhóm..."
              onChange={(e) => setNameGroup(e.target.value)}
            />
          </div>
          <div>
            <p>Chọn màu nền:</p>
            <div className="w-full flex gap-2">
              {listColor.map((el: ListColorType, index: number) => (
                <div
                  key={index}
                  onClick={() => setSelectColor(el.name)}
                  className={cn(
                    "size-[26px] border-none rounded-full hover:cursor-pointer flex items-center justify-center",
                    selectColor === el.name ? "border border-black ring-1 ring-black" : ""
                  )}
                >
                  <div
                    className={cn(
                      "size-6 border-none rounded-full hover:cursor-pointer",
                      el.name === "blue" ? "bg-board-blue-border" : "",
                      el.name === "green" ? "bg-board-green-border" : "",
                      el.name === "orange" ? "bg-board-orange-border" : "",
                      el.name === "red" ? "bg-board-red-border" : "",
                      el.name === "mint" ? "bg-board-mint-border" : "",
                      el.name === "pink" ? "bg-board-pink-border" : "",
                      el.name === "violet" ? "bg-board-violet-border" : ""
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={handleUpdateBoard}
            className="w-full border-blue-700 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-100 dark:text-blue-700"
            variant="outline"
            disabled={isCreating}
          >
            {isCreating ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ButtonEditBoard
