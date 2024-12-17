import { Edit, Ellipsis, Plus } from "lucide-react"
import Link from "next/link"
import React from "react"

const Board = () => {
  return (
    <div className="w-full bg-blue-200 rounded-xl flex flex-col gap-4 p-4 border border-blue-600">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-white text-xl font-bold flex items-center justify-center text-blue-600">
            3
          </div>
          <p className="text-blue-800 font-bold text-xl">Design</p>
        </div>
        <div className="flex items-center gap-2 text-blue-800">
          <Plus />
          <Ellipsis />
        </div>
      </div>
      <div className="bg-white rounded-xl px-4 py-2">
        <div className="flex items-center justify-between text-blue-800">
          <div className="font-bold line-clamp-1 w-full">Từ vựng day 1 2 4</div>
          <div className="w-fit">
            <Edit className="size-5" />
          </div>
        </div>
        <div className="flex items-center justify-between text-blue-800 mt-2">
          <div className="font-bold w-fit text-xs border border-green-600 bg-green-100 text-green-600 px-2 rounded-md">
            {25} thuật ngữ
          </div>
        </div>
      </div>
      <Link href={`/vocabulary/create`}>
        <div className="border-dashed border-2 rounded-xl border-blue-600 bg-blue-100 flex items-center justify-center h-10 text-blue-600">
          <Plus className="size-5 mr-2" /> <p>Tạo học phần mới</p>
        </div>
      </Link>
    </div>
  )
}

export default Board
