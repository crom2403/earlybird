/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import React, { Dispatch, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { listColor } from "@/utils/contants"
import { ListColorType } from "@/types/vocabulary"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { createBoard, getAllBoardByUser } from "@/app/vocabulary/action"
import { toast } from "sonner"

const ButtonCreateNewBoard = ({
  userId,
  setBoards,
}: {
  userId: string | undefined
  setBoards: Dispatch<SetStateAction<any>>
}) => {
  const [selectColor, setSelectColor] = useState<string>("blue")
  const [nameGroup, setNameGroup] = useState<string>("")
  const [isShowPopup, setIsShowPopup] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateBoard = async () => {
    if (!nameGroup.trim()) {
      toast.error("Tên nhóm không được để trống!")
      return
    }

    if (userId) {
      setIsCreating(true)
      const res = await createBoard({
        userId,
        name: nameGroup,
        color: selectColor,
      })
      setIsCreating(false)

      if (res.success) {
        toast.success("Tạo nhóm thành công!")

        // Fetch lại danh sách boards và cập nhật state
        const updatedBoards = await getAllBoardByUser(userId)
        if (updatedBoards.success) {
          setBoards(updatedBoards.boards)
        }
      } else {
        toast.error(res.message)
      }
    }
    setIsShowPopup(false)
  }

  return (
    <Dialog open={isShowPopup} onOpenChange={setIsShowPopup}>
      <DialogTrigger asChild>
        <Button
          className="border-blue-700 text-blue-700 bg-blue-50 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-500"
          variant="outline"
        >
          <Plus />
          Tạo nhóm học phần mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] grid grid-cols-8 gap-0 p-0 dark:bg-white dark:text-black">
        <div className="col-span-3 w-full h-full">
          <Image
            src="/gif/background_dialog_cat.gif"
            alt="cat"
            className="w-full min-h-[230px] object-cover rounded-s-md"
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
            onClick={handleCreateBoard}
            className="w-full border-blue-700 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-100 dark:text-blue-700"
            variant="outline"
            disabled={isCreating}
          >
            {isCreating ? "Đang tạo..." : "Tạo mới"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ButtonCreateNewBoard
