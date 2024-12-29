"use client"
import { HeroHighlight } from "../ui/hero-highlight"
import React, { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DeleteIcon, Download, Edit2, Plus, Scan, Trash } from "lucide-react"
import { DoubleInputVocabulary } from "./DoubleInputVocabulary"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { getSectionById, updateSection, deleteSection } from "@/app/vocabulary/action"
import { useRouter } from "next/navigation"
import { SectionType } from "@/types/vocabulary"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
interface EditVocabularyProps {
  sectionId: string
}

const EditVocabulary = ({ sectionId }: EditVocabularyProps) => {
  const [loading, setLoading] = useState(true)
  const [listInput, setListInput] = useState([{ id: 1, terminology: "", define: "" }])
  const [isPublic, setIsPublic] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [title, setTitle] = useState("")
  const router = useRouter()
  const fetchSection = useCallback(async () => {
    try {
      setLoading(true)
      const res = (await getSectionById(sectionId)) as {
        success: boolean
        section?: SectionType
        message?: string
      }
      if (res.success && res.section) {
        setTitle(res.section.title)
        setIsPublic(res.section.isPublic)
        setListInput(res.section.listInput)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(
        `Lỗi khi tải dữ liệu: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    } finally {
      setLoading(false)
    }
  }, [sectionId])
  useEffect(() => {
    fetchSection()
  }, [fetchSection])
  const handleInputChange = useCallback(
    (id: number, field: "terminology" | "define", value: string) => {
      setListInput((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
      )
    },
    []
  )
  const handleDeleteInput = useCallback((id: number) => {
    setListInput((prev) => {
      if (prev.length === 1) {
        toast.warning("Học phần phải có ít nhất 1 từ vựng!")
        return prev
      }
      return prev.filter((item) => item.id !== id)
    })
  }, [])
  const handleAddListInput = useCallback(() => {
    setListInput((prev) => {
      const newId = prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 1
      return [...prev, { id: newId, terminology: "", define: "" }]
    })
  }, [])
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
    const emptyField = listInput.find((el) => !el.terminology || !el.define)
    if (emptyField) {
      toast.warning(`Vui lòng điền đầy đủ thông tin tại dòng ${emptyField.id}`)
      return
    }
    try {
      const data = { title, isPublic, listInput }
      const res = await updateSection(sectionId, data)
      if (res?.success) {
        toast.success(res.message)
        router.push("/vocabulary")
      } else {
        toast.error(res?.message)
      }
    } catch (error) {
      toast.error(
        `Lỗi khi cập nhật học phần: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    }
  }
  if (loading) {
    return (
      <div className="relative">
        <HeroHighlight className="absolute inset-0 z-0">
          <div className="absolute top-0 flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
            <div className="w-[40rem] relative">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
            </div>
          </div>
          <div className="mt-4 w-full flex items-center justify-center">
            <div className="relative inline-flex">
              <div className="w-8 h-8 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-l-blue-600 border-r-blue-400 animate-spin" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 rounded-full border-4 border-t-indigo-500 border-b-indigo-700 border-l-indigo-600 border-r-indigo-400 animate-spin-reverse" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full" />
            </div>
          </div>
        </HeroHighlight>
      </div>
    )
  }

  const handleDeleteSection = async () => {
    try {
      const res = await deleteSection(sectionId)
      if (res?.success) {
        toast.success(res.message)
        router.push("/vocabulary")
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(
        `Lỗi khi xóa học phần: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    }
  }

  return (
    <div className="relative">
      <HeroHighlight className="absolute inset-0 z-0">
        <div className="absolute top-0 flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
          <div className="w-[40rem] relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          </div>
        </div>
        <div className="p-4 flex flex-col w-full md:max-w-[700px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <Button
              className="border-green-700 text-green-700 bg-green-50 hover:text-green-500 hover:bg-green-50 hover:border-green-500"
              variant="outline"
            >
              <Download className="mr-2" />
              Trích xuất từ văn bản
            </Button>
            <div className="flex gap-2 items-center cursor-pointer">
              <div
                onClick={() => setIsPublic((prev) => !prev)}
                className={cn(
                  "w-11 rounded-full transition-all ease-linear duration-300 flex items-center px-[2px] py-[2px]",
                  isPublic ? "justify-end bg-blue-600" : "justify-start bg-slate-600"
                )}
              >
                <div className="size-[18px] rounded-full bg-white" />
              </div>
              <p>Chế độ public (Tất cả mọi người có thể xem)</p>
            </div>
          </div>
          <div className="mt-2 md:mt-8 relative inline-flex h-12 overflow-hidden rounded-md p-[6px]">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="z-10 border-none ring-0 border-b-2 bg-slate-200 font-bold text-xl h-full text-blue-700"
              placeholder="Nhập tiêu đề..."
            />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
            <div className="flex flex-col gap-4 max-h-[300px] md:max-h-[360px] overflow-y-auto">
              {listInput.map((el, index) => (
                <div key={el.id} className="flex gap-2 md:gap-4 items-center md:mr-2">
                  <div className="relative size-7 flex items-center justify-center">
                    <Scan className="size-7 text-black dark:text-white" />
                    <p className="absolute z-10 text-xs text-black dark:text-white">{index + 1}</p>
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
            </div>
            <button
              type="button"
              className="bg-white border min-h-[40px] flex items-center justify-center rounded-md"
              onClick={handleAddListInput}
            >
              <Plus className="text-black font-bold" />
            </button>
            <Button
              type="submit"
              className="border-blue-700 text-blue-700 dark:hover:text-blue-700  bg-blue-50 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-500"
              variant="outline"
            >
              <Edit2 className="mr-2" />
              Cập nhật học phần
            </Button>
          </form>
          <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
            <DialogTrigger>
              <Button
                type="submit"
                className="min-w-full mt-2 border-red-700 text-red-700 dark:hover:text-red-700 bg-red-50 hover:text-red-500 hover:bg-blue-50 hover:border-blue-500"
                variant="outline"
              >
                <Trash className="mr-2" />
                Xóa học phần
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xóa học phần</DialogTitle>
                <DialogDescription>
                  Bạn có chắc chắn muốn xóa học phần này? Hành động này không thể hoàn tác.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Không
                  </Button>
                </DialogClose>
                <Button type="button" variant="destructive" onClick={handleDeleteSection}>
                  Xóa
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </HeroHighlight>
    </div>
  )
}
export default React.memo(EditVocabulary)
