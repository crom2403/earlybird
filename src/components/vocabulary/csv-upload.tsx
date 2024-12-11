/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/vocabulary/csv-upload.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { collection, addDoc, writeBatch, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useSession } from "next-auth/react"
import Papa from "papaparse"
import { Vocabulary } from "@/types/vocabulary"
import { SessionType } from "@/types"

export function CSVUploader() {
  const { data: session } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file || !session?.user) {
      setUploadStatus("Vui lòng chọn file và đăng nhập")
      return
    }

    setUploadStatus("Đang xử lý...")

    try {
      // Đọc file CSV
      Papa.parse(file, {
        complete: async (results) => {
          // Kiểm tra cấu trúc file
          const vocabularies: Vocabulary[] = results.data
            .filter((row: any) => row.length >= 2) // Đảm bảo có ít nhất 2 cột
            .map((row: any) => ({
              englishWord: row[0]?.trim(), // Cột 1: Từ tiếng Anh
              vietnameseDefinition: row[1]?.trim(), // Cột 2: Nghĩa tiếng Việt
              userId: (session.user as SessionType).id,
              createdAt: new Date(),
              category: row[2]?.trim() || "tech", // Cột 3 (tuỳ chọn): Danh mục
              difficulty: row[3]?.trim() || "medium", // Cột 4 (tuỳ chọn): Độ khó
            }))
            .filter((vocab: Vocabulary) => vocab.englishWord && vocab.vietnameseDefinition)

          // Thêm từ vựng vào Firestore theo batch
          const batch = writeBatch(db)
          const vocabCollectionRef = collection(db, "vocabularies")

          vocabularies.forEach((vocab) => {
            const docRef = doc(vocabCollectionRef)
            batch.set(docRef, vocab)
          })

          await batch.commit()

          setUploadStatus(`Đã thêm ${vocabularies.length} từ vựng`)
          setFile(null)
        },
        header: false, // Không có header
        skipEmptyLines: true,
      })
    } catch (error) {
      console.error("Lỗi khi upload:", error)
      setUploadStatus("Có lỗi xảy ra khi upload")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input type="file" accept=".csv" onChange={handleFileChange} />
        <Button onClick={handleUpload} disabled={!file}>
          Tải Lên
        </Button>
      </div>

      {uploadStatus && <div className="text-sm mt-2">{uploadStatus}</div>}

      <div className="text-sm text-gray-600">
        <strong>Định dạng file CSV:</strong>
        <br />
        - Cột 1: Từ tiếng Anh
        <br />
        - Cột 2: Nghĩa tiếng Việt
        <br />
        - Cột 3 (tuỳ chọn): Danh mục (tech/general)
        <br />- Cột 4 (tuỳ chọn): Độ khó (easy/medium/hard)
      </div>
    </div>
  )
}
