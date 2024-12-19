import { ResponseSection } from "@/app/vocabulary/action"
import { Edit } from "lucide-react"
import React from "react"

const SectionItem = ({ section }: { section: ResponseSection }) => {
  return (
    <div className="bg-white rounded-xl px-4 py-2 cursor-pointer">
      <div className="flex items-center justify-between text-black">
        <div className="font-bold line-clamp-1 w-full">{section.title}</div>
        <div className="w-fit hover:text-blue-600 hover:cursor-pointer">
          <Edit className="size-5" />
        </div>
      </div>
      <div className="flex items-center justify-between text-blue-800 mt-2">
        <div className="font-bold w-fit text-xs border border-green-600 bg-green-100 text-green-600 px-2 rounded-md">
          {25} thuật ngữ
        </div>
      </div>
    </div>
  )
}

export default SectionItem
