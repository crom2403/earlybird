import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Xin chào, {session.user?.name}</h1> */}

      <Tabs defaultValue="learn">
        <TabsList>
          <TabsTrigger value="learn">Học Từ Vựng</TabsTrigger>
          <TabsTrigger value="add">Thêm Từ Mới</TabsTrigger>
        </TabsList>

        <TabsContent value="learn">learn</TabsContent>
        <TabsContent value="add">add</TabsContent>
      </Tabs>
    </div>
  )
}
