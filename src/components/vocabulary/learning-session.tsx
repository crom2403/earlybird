// src/components/vocabulary/learning-session.tsx
"use client"

import { useState, useEffect } from "react"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Vocabulary } from "@/types/vocabulary"
import { SessionType } from "@/types"

export function LearningSession() {
  const { data: session } = useSession()
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchVocabularies = async () => {
      if (!session?.user) return

      const q = query(
        collection(db, "vocabularies"),
        where("userId", "==", (session.user as SessionType).id)
      )

      const querySnapshot = await getDocs(q)
      const vocabList = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Vocabulary)
      )

      setVocabularies(vocabList)
    }

    fetchVocabularies()
  }, [session])

  const handleSubmit = () => {
    const currentVocab = vocabularies[currentIndex]

    // So sánh từ tiếng Anh không phân biệt chữ hoa thường
    const isWordCorrect = userInput.trim().toLowerCase() === currentVocab.englishWord.toLowerCase()

    setIsCorrect(isWordCorrect)

    if (isWordCorrect) {
      // Chuyển sang từ tiếp theo nếu đúng
      if (currentIndex < vocabularies.length - 1) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1)
          setUserInput("")
          setIsCorrect(null)
        }, 1000)
      } else {
        // Kết thúc session nếu hết từ
        alert("Hoàn thành học từ vựng!")
      }
    }
  }

  if (vocabularies.length === 0) {
    return <div>Chưa có từ vựng để học. Hãy thêm từ!</div>
  }

  const currentVocab = vocabularies[currentIndex]

  return (
    <div className="space-y-4 p-4">
      <div className="text-xl font-bold text-center">
        Nghĩa: {currentVocab.vietnameseDefinition}
      </div>

      <Input
        placeholder="Nhập từ tiếng Anh"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className={isCorrect === null ? "" : isCorrect ? "border-green-500" : "border-red-500"}
      />

      {isCorrect === false && (
        <div className="text-red-500 text-center">Từ đúng là: {currentVocab.englishWord}</div>
      )}

      <Button onClick={handleSubmit} disabled={!userInput}>
        Kiểm Tra
      </Button>

      <div className="text-center text-gray-500">
        Từ {currentIndex + 1}/{vocabularies.length}
      </div>
    </div>
  )
}
