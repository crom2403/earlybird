// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VocabularyForm } from "@/components/vocabulary/vovabulary-form"
import { LearningSession } from "@/components/vocabulary/learning-session"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Xin chào, {session.user?.name}</h1>

      <Tabs defaultValue="learn">
        <TabsList>
          <TabsTrigger value="learn">Học Từ Vựng</TabsTrigger>
          <TabsTrigger value="add">Thêm Từ Mới</TabsTrigger>
        </TabsList>

        <TabsContent value="learn">
          <LearningSession />
        </TabsContent>

        <TabsContent value="add">
          <VocabularyForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
