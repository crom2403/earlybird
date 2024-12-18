import React from "react"
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"
import Board from "@/components/board/Board"
import ButtonCreateNewBoard from "@/components/vocabulary/ButtonCreateNewBoard"

const MyVocabulary = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mt-2">
        <Button
          className="border-blue-700 text-blue-700 bg-blue-50 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-500"
          variant="outline"
        >
          <Plus />
          Tạo học phần mới
        </Button>
        <Button
          className="border-green-700 text-green-700 bg-green-50 hover:text-green-500 hover:bg-green-50 hover:border-green-500"
          variant="outline"
        >
          <Download />
          Trích xuất từ văn bản
        </Button>
      </div>
      <ButtonCreateNewBoard />
      <div className="w-full grid grid-cols-4 gap-4 mt-4">
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
      </div>
    </div>
  )
}

export default MyVocabulary
