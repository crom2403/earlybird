"use server"
import { getServerSideUser } from "@/app/lib/payload-utils"
import CreateVocabulary from "@/components/vocabulary/CreateVocabulary"
import { UserResponse } from "@/types/user"
import React from "react"

const page = async () => {
  const user: UserResponse | undefined = await getServerSideUser()

  if (!user) return <p className="m-4">Bạn chưa đăng nhập, hãy đăng nhập và thử lại!</p>

  // Chỉ truyền những dữ liệu cần thiết và đảm bảo là plain object
  const userData = {
    userId: user.uid || "",
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
  }

  return (
    <div>
      <CreateVocabulary {...userData} />
    </div>
  )
}

export default page
