/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyVocabulary from "@/components/vocabulary/MyVocabulary"
import PublicVocabulary from "@/components/vocabulary/PublicVocabulary"
import { getServerSideUser } from "@/app/lib/payload-utils"
import { User } from "@/types/user"
import { getAllBoardByUser, getAllSectionOfBoard, ResponseSection } from "@/app/vocabulary/action"
import { BoardType } from "@/types/vocabulary"

const page = async () => {
  const user: User | undefined = await getServerSideUser()
  const plainUser = user ? JSON.parse(JSON.stringify(user)) : undefined

  const res = await getAllBoardByUser(plainUser?.uid)
  let sortedBoards: BoardType[] = []
  if (res.success && res.boards) {
    sortedBoards = (res.boards as BoardType[]).sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  let listSection: ResponseSection[] = []
  const response = await Promise.all(
    sortedBoards?.map(async (board) => {
      return await getAllSectionOfBoard(board.id)
    })
  )

  if (response) {
    response.forEach((res: any) => {
      if (res.success) {
        listSection = [...listSection, ...res.sections]
      }
    })
  }

  return (
    <div className="container mx-auto p-4 ">
      <Tabs defaultValue="my_vocabulary">
        <TabsList className="py-6 px-2">
          <TabsTrigger value="my_vocabulary" className="px-5 py-2">
            Học phần của tôi
          </TabsTrigger>
          <TabsTrigger value="public_vocabulary" className="px-5 py-2">
            Học phần public
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my_vocabulary">
          {user ? (
            <MyVocabulary
              userId={plainUser?.uid || ""}
              listBoard={sortedBoards}
              listSection={listSection}
            />
          ) : (
            <p>Bạn chưa đăng nhập hoặc không có nhóm nào!</p>
          )}
        </TabsContent>
        <TabsContent value="public_vocabulary">
          <PublicVocabulary />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default page
