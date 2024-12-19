import { getServerSideUser } from "@/app/lib/payload-utils"
import CreateVocabulary from "@/components/vocabulary/CreateVocabulary"
import { UserResponse } from "@/types/user"
import React from "react"

const page = async () => {
  const user: UserResponse | undefined = await getServerSideUser()
  if (!user) return <p className="m-4">Bạn chưa đăng nhập, hãy đăng nhập và thử lại!</p>
  return (
    <div>
      <CreateVocabulary
        user={{ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }}
      />
    </div>
  )
}

export default page
