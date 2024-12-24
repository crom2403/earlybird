import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PublicVocabulary from "@/components/vocabulary/PublicVocabulary"
import React from "react"

const page = () => {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="public_vocabulary">
        <TabsList className="py-6 px-2">
          <TabsTrigger value="my_vocabulary" className="px-5 py-2">
            Học phần của tôi
          </TabsTrigger>
          <TabsTrigger value="public_vocabulary" className="px-5 py-2">
            Học phần public
          </TabsTrigger>
        </TabsList>
        <TabsContent value="public_vocabulary">
          <PublicVocabulary />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default page
