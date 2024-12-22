/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSectionById } from "@/app/vocabulary/action"
import VocabularyEditor from "@/components/vocabulary/VocabularyEditor"
import React from "react"
import { getServerSideUser } from "@/app/lib/payload-utils"

interface Props {
  params: {
    sectionId: string // Định nghĩa kiểu cho tham số id
  }
}
const page: React.FC<Props> = async ({ params }) => {
  const { sectionId } = params // Lấy tham số id từ props
  const user = await getServerSideUser()

  const res: any = await getSectionById(sectionId)
  return (
    <div>
      <VocabularyEditor userId={user?.uid} listVocabulary={res.section.listInput || []} />
    </div>
  )
}

export default page
