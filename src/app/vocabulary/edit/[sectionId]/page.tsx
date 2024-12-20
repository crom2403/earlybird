import { getServerSideUser } from "@/app/lib/payload-utils"
import EditVocabulary from "@/components/vocabulary/EditVocabulary"
import { UserResponse } from "@/types/user"
import React from "react"

const page = async ({ params }: { params: { sectionId: string } }) => {
  const user: UserResponse | undefined = await getServerSideUser()
  if (!user) return <p className="m-4">Bạn chưa đăng nhập, hãy đăng nhập và thử lại!</p>

  return (
    <div>
      <EditVocabulary sectionId={params.sectionId} />
    </div>
  )
}

export default page
