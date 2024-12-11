// src/components/vocabulary/vocabulary-form.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useSession } from "next-auth/react"
import { SessionType } from "@/types"

// Validation Schema
const vocabSchema = z.object({
  englishWord: z.string().min(1, "Từ tiếng Anh không được trống"),
  vietnameseDefinition: z.string().min(1, "Nghĩa tiếng Việt không được trống"),
  category: z.enum(["tech", "general"]).optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
})

export function VocabularyForm() {
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof vocabSchema>>({
    resolver: zodResolver(vocabSchema),
    defaultValues: {
      englishWord: "",
      vietnameseDefinition: "",
      category: "tech",
      difficulty: "medium",
    },
  })

  const onSubmit = async (values: z.infer<typeof vocabSchema>) => {
    if (!session?.user) return

    setIsSubmitting(true)
    try {
      await addDoc(collection(db, "vocabularies"), {
        ...values,
        userId: (session.user as SessionType).id,
        createdAt: new Date(),
      })

      form.reset()
      // TODO: Add toast notification
    } catch (error) {
      console.error("Lỗi khi thêm từ vựng:", error)
      // TODO: Xử lý lỗi
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="englishWord"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Từ Tiếng Anh</FormLabel>
              <FormControl>
                <Input placeholder="Nhập từ tiếng Anh" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vietnameseDefinition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nghĩa Tiếng Việt</FormLabel>
              <FormControl>
                <Input placeholder="Nhập nghĩa tiếng Việt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Danh Mục</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tech">Công Nghệ</SelectItem>
                  <SelectItem value="general">Từ Vựng Chung</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Độ Khó</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn độ khó" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="easy">Dễ</SelectItem>
                  <SelectItem value="medium">Trung Bình</SelectItem>
                  <SelectItem value="hard">Khó</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang Lưu..." : "Thêm Từ Vựng"}
        </Button>
      </form>
    </Form>
  )
}
