/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSectionById } from "@/app/vocabulary/action"
import VocabularyEditor from "@/components/vocabulary/VocabularyEditor"
import React from "react"
import { getServerSideUser } from "@/app/lib/payload-utils"
import { StarsBackground } from "@/components/ui/stars-background"
import { ShootingStars } from "@/components/ui/shooting-stars"

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
      <ShootingStars className="absolute inset-0 z-[-1]" />
      <StarsBackground className="absolute inset-0 z-[-2]" />
    </div>
  )
}

export default page
