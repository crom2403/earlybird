/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import React, { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { listColor } from "@/utils/contants"
import { ListColorType } from "@/types/vocabulary"
import { cn } from "@/lib/utils"
import Image from "next/image"

const ButtonCreateNewBoard = () => {
  const [selectColor, setSelectColor] = useState<string>("blue")
  const [nameGroup, setNameGroup] = useState<string>("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="border-blue-700 text-blue-700 bg-blue-50 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-500"
          variant="outline"
        >
          <Plus />
          Tạo nhóm học phần mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] grid grid-cols-8 gap-0 p-0">
        <div className="col-span-3 w-full h-full">
          <Image
            src="/gif/background_dialog_cat.gif"
            alt="cat"
            className="w-full object-cover"
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
              className=""
              onChange={(e) => setNameGroup(e.target.value)}
            />
          </div>
          <div>
            <p>Chọn màu nền:</p>
            <div className="w-full flex gap-2">
              {listColor.map((el: ListColorType, index: number) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      "size-6 border-none rounded-full hover:cursor-pointer",
                      el.name === "blue" ? "bg-blue-600" : "",
                      el.name === "green" ? "bg-green-600" : "",
                      el.name === "orange" ? "bg-orange-600" : "",
                      selectColor === el.name ? "border border-black ring-1 ring-black" : ""
                    )}
                    onClick={() => setSelectColor(el.name)}
                  />
                )
              })}
              <div className="flex items-center space-x-2"></div>
            </div>
          </div>
          <Button className="w-full border-blue-700 bg-blue-100 text-blue-700" variant="outline">
            Tạo mới
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ButtonCreateNewBoard
