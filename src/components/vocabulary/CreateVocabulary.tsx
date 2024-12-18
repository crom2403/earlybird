/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { HeroHighlight } from "../ui/hero-highlight"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { DeleteIcon, Download, Plus } from "lucide-react"
import { DoubleInputVocabulary } from "@/components/vocabulary/DoubleInputVocabulary"
import { Switch } from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const CreateVocabulary = () => {
  const [listInput, setListInput] = useState([{ id: 1, terminology: "", define: "" }])
  const [isPublic, setIsPublic] = useState(false)
  const [title, setTitle] = useState("")

  const handleAddListInput = () => {
    const newInput = { id: listInput.length + 1, terminology: "", define: "" }
    setListInput([...listInput, newInput])
  }

  const handleInputChange = (id: number, field: string, value: string) => {
    setListInput((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const handleDeleteInput = (idInput: number) => {
    setListInput(listInput.filter((el) => el.id !== idInput))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(listInput)
  }

  return (
    <div className="relative">
      <HeroHighlight className="absolute inset-0 z-0">
        <div className="absolute top-0 flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
          <div className="w-[40rem] relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          </div>
        </div>
        <div className="p-4 flex flex-col max-w-[700px]">
          <div className="flex items-center justify-between gap-2">
            <Button
              className="border-green-700 text-green-700 bg-green-50 hover:text-green-500 hover:bg-green-50 hover:border-green-500"
              variant="outline"
            >
              <Download />
              Trích xuất từ văn bản
            </Button>
            <div className="flex gap-2 items-center cursor-pointer">
              <div
                onClick={() => setIsPublic(!isPublic)}
                className={cn(
                  "w-11 rounded-full transition-all ease-linear duration-300 flex items-center  px-[2px] py-[2px] ",
                  isPublic ? "justify-end bg-blue-600" : "justify-start bg-slate-600"
                )}
              >
                <div className="size-[18px] rounded-full bg-white"></div>
              </div>
              <p>Chế độ public (Tất cả mọi người có thể xem)</p>
            </div>
          </div>
          <div className="mt-8 relative inline-flex h-12 overflow-hidden rounded-md p-[6px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              className="z-10 border-none ring-0 border-b-2 bg-slate-200 font-bold text-xl h-full text-blue-700"
              placeholder="Nhập tiêu đề..."
            />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
            {listInput.map((el, index) => (
              <div key={el.id} className="flex gap-4 items-center">
                <div className="size-6 flex items-center justify-center font-semibold text-xs bg-white text-black rounded-full">
                  {index + 1}
                </div>
                <DoubleInputVocabulary
                  terminology={el.terminology}
                  define={el.define}
                  onChange={(field, value) => handleInputChange(el.id, field, value)}
                />
                <DeleteIcon
                  onClick={() => handleDeleteInput(el.id)}
                  className="cursor-pointer hover:text-blue-600"
                />
              </div>
            ))}
            <button
              type="button"
              className="bg-white min flex items-center justify-center mx-[38px] rounded-md py-1"
              onClick={handleAddListInput}
            >
              <Plus className="text-black font-bold" />
            </button>
            <Button
              type="submit"
              className="border-blue-700 text-blue-700 bg-blue-50 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-500"
              variant="outline"
            >
              <Plus />
              Tạo học phần mới
            </Button>
            {/* <button className=" inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Shimmer
            </button> */}
          </form>
        </div>
      </HeroHighlight>
    </div>
  )
}

export default CreateVocabulary
