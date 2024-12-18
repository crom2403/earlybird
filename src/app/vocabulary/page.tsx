import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyVocabulary from "@/components/vocabulary/MyVocabulary"
import PublicVocabulary from "@/components/vocabulary/PublicVocabulary"
import { getServerSideUser } from "@/app/lib/payload-utils"
import { User } from "@/types/user"

const page = async () => {
  const user: User | undefined = await getServerSideUser()
  return (
    <div className="container mx-auto p-4">
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
            <MyVocabulary userId={user?.uid} />
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
