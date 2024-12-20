/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSectionById } from "@/app/vocabulary/action"
import VocabularyEditor from "@/components/vocabulary/VocabularyEditor"
import React from "react"

interface Props {
  params: {
    sectionId: string // Định nghĩa kiểu cho tham số id
  }
}
const page: React.FC<Props> = async ({ params }) => {
  const { sectionId } = params // Lấy tham số id từ props

  const res: any = await getSectionById(sectionId)
  console.log(res)
  return (
    <div>
      <VocabularyEditor listVocabulary={res.section.listInput || []} />
    </div>
  )
}

export default page
