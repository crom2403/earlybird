/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseSection } from "@/app/vocabulary/action"
import { Edit, Expand } from "lucide-react"
import Link from "next/link"

interface SectionItemProps {
  section: ResponseSection
  dragHandleProps?: any // Đảm bảo tên prop khớp với tên được truyền từ SortableSection
}
const SectionItem = ({ section, dragHandleProps }: SectionItemProps) => {
  return (
    <div className="bg-white rounded-xl px-2 md:px-4 py-2 cursor-pointer z-50">
      <div className="flex items-center justify-between text-black">
        <Link href={`/vocabulary/learn/${section.id}`} className="w-full">
          <div className="font-bold line-clamp-1">{section.title}</div>
        </Link>
        <div className="w-fit hover:text-blue-600 hover:cursor-pointer">
          <Link href={`/vocabulary/edit/${section.id}`}>
            <Edit className="size-5" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-10 text-blue-800 mt-2">
        <Link className="col-span-8" href={`/vocabulary/learn/${section.id}`}>
          <div className=" font-bold w-fit flex-1 text-xs border border-green-600 bg-green-100 text-green-600 px-2 rounded-md">
            {section.length} thuật ngữ
          </div>
        </Link>
        <div className="col-span-2" {...dragHandleProps} onClick={(e) => e.preventDefault()}>
          <div className="flex justify-end">
            <Expand className="size-5 text-black cursor-move" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionItem
