/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { HeroHighlight } from "../ui/hero-highlight"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { DeleteIcon, Download, Plus, Scan } from "lucide-react"
import { DoubleInputVocabulary } from "@/components/vocabulary/DoubleInputVocabulary"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { createSection } from "@/app/vocabulary/action"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import Papa from "papaparse"
import Loading from "@/components/ui/Loading"

interface CreateVocabularyProps {
  userId: string
  displayName: string
  photoURL: string
}

const CreateVocabulary = ({ userId, displayName, photoURL }: CreateVocabularyProps) => {
  const [listInput, setListInput] = useState([{ id: 1, terminology: "", define: "" }])
  const [isPublic, setIsPublic] = useState(false)
  const [title, setTitle] = useState("")
  const [loadingUpload, setLoadingUpload] = useState(false)
  const router = useRouter()
  const { boardId } = useParams()

  const handleAddListInput = () => {
    const newInput = { id: listInput.length + 1, terminology: "", define: "" }
    setListInput([...listInput, newInput])

    // Thêm đoạn code để cuộn xuống cuối
    setTimeout(() => {
      const container = document.querySelector(".overflow-y-scroll")
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    }, 0)
  }

  const handleInputChange = (id: number, field: string, value: string) => {
    setListInput((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const handleDeleteInput = (idInput: number) => {
    setListInput(listInput.filter((el) => el.id !== idInput))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) {
      toast.warning("Tiêu đề không được để trống!")
      return
    }
    if (listInput.length === 0) {
      toast.warning("Học phần phải có ít nhất 1 từ vựng!")
      return
    }

    for (const el of listInput) {
      if (el.terminology === "") {
        toast.warning(`Ô thuật ngữ tại dòng số ${el.id} bị rỗng!`)
        return
      }
      if (el.define === "") {
        toast.warning(`Ô định nghĩa tại dòng số ${el.id} bị rỗng!`)
        return
      }
    }

    const data = {
      boardId,
      title,
      isPublic,
      user: {
        uid: userId,
        displayName,
        photoURL,
      },
      listInput,
    }

    const res = await createSection(data)
    if (res?.success) {
      toast.success(res.message)
      router.push("/vocabulary")
    } else {
      toast.error(res?.message)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingUpload(true)
    const file = event.target.files?.[0]
    if (!file) {
      setLoadingUpload(false)
      return
    }

    // Kiểm tra xem file có phải là CSV không
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast.error("Vui lòng chọn file CSV!")
      setLoadingUpload(false)
      return
    }

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const test: any = Object.keys(results?.data[0] || {})
        if (test[0] !== "terminology") {
          toast.error("Dòng số 0 cột A phải là terminology")
          setLoadingUpload(false)
          return
        }
        if (test[1] !== "define") {
          toast.error("Dòng số 0 cột B phải là define")
          setLoadingUpload(false)
          return
        }

        if (results?.data?.length > 200) {
          toast.error("Một học phần chỉ được tối đa 200 thuật ngữ")
          setLoadingUpload(false)
          return
        }

        const newInputs = results.data?.map((row: any, index: number) => ({
          id: index + 1,
          terminology: row?.terminology || "", // Thay đổi tên trường nếu cần
          define: row?.define || "", // Thay đổi tên trường nếu cần
        }))
        setLoadingUpload(false)
        setListInput(newInputs)
      },
      error: (error: any) => {
        toast.error("Có lỗi xảy ra khi phân tích file CSV!")
        console.log(error)
        setLoadingUpload(false)
      },
    })
  }

  return (
    <div className="flex justify-center items-center">
      <HeroHighlight
        className="absolute inset-0 z-0"
        containerClassName="absolute inset-0 z-[-10] md:h-[calc(100vh)] h-[calc(100vh)]"
      >
        <p></p>
      </HeroHighlight>
      <div className="p-4 flex flex-col gap-4 w-full md:max-w-[700px]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Button
            className="border-green-700 text-green-700 bg-green-50 hover:text-green-500 hover:bg-green-50 hover:border-green-500"
            variant="outline"
            onClick={() => document.getElementById("csv-upload")?.click()}
          >
            <Download />
            Trích xuất từ văn bản
          </Button>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex gap-2 items-center cursor-pointer">
            <div
              onClick={() => setIsPublic(!isPublic)}
              className={cn(
                "w-11 rounded-full transition-all ease-linear duration-300 flex items-center px-[2px] py-[2px]",
                isPublic ? "justify-end bg-blue-600" : "justify-start bg-slate-600"
              )}
            >
              <div className="size-[18px] rounded-full bg-white"></div>
            </div>
            <p>Chế độ public (Tất cả mọi người có thể xem)</p>
          </div>
        </div>
        <div className="md:mt-8 relative inline-flex h-12 overflow-hidden rounded-md p-[6px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            className="z-10 border-none ring-0 border-b-2 bg-slate-200 font-bold text-xl h-full text-blue-700"
            placeholder="Nhập tiêu đề..."
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 max-h-[400px] md:max-h-[340px] overflow-y-scroll">
            {loadingUpload ? (
              <Loading />
            ) : (
              <>
                {listInput?.map((el, index) => (
                  <div key={el.id} className="flex gap-2 md:gap-4 items-center md:mr-2">
                    <div className="relative size-7 flex items-center justify-center font-semibold text-xs bg-transparent text-black rounded-full">
                      <Scan className="size-7 text-black dark:text-white"></Scan>
                      <p className="absolute z-10 text-xs text-black dark:text-white">
                        {index + 1}
                      </p>
                    </div>
                    <DoubleInputVocabulary
                      terminology={el.terminology}
                      define={el.define}
                      onChange={(field, value) => handleInputChange(el.id, field, value)}
                    />
                    <DeleteIcon
                      onClick={() => handleDeleteInput(el.id)}
                      className="cursor-pointer hover:text-blue-600"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          <button
            type="button"
            className="bg-white border min flex items-center justify-center rounded-md py-1"
            onClick={handleAddListInput}
          >
            <Plus className="text-black font-bold" />
          </button>
          <Button
            type="submit"
            className="border-blue-700 text-blue-700 bg-blue-50 hover:text-blue-500 hover:bg-blue-100"
          >
            Lưu từ vựng
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateVocabulary
