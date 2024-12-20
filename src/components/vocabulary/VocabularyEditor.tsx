/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useEffect, useState } from "react"
import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs"
import "prismjs/themes/prism.css"
import { InputVocabulary } from "@/types/vocabulary"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const VocabularyEditor = ({ listVocabulary }: { listVocabulary: InputVocabulary[] | [] }) => {
  const [code, setCode] = useState("")
  const [theme, setTheme] = useState("dark")
  const [listVocabularyMain, setListVocabularyMain] = useState(listVocabulary || [])
  const [counter, setCounter] = useState<number>(0)
  const [isTest, setIsTest] = useState(false)

  console.log(listVocabulary)

  const handleCodeChange = (newCode: string) => {
    const terminology = listVocabularyMain[counter].terminology
    const correctDefinition = listVocabulary[counter].define
    const codePrefix = `Thuật ngữ: ${terminology}\nĐịnh nghĩa là: `

    // Kiểm tra xem newCode có bắt đầu bằng codePrefix không
    if (!newCode.startsWith(codePrefix)) {
      return // Nếu không, thoát khỏi hàm
    }

    // Tách phần định nghĩa từ newCode
    const result = newCode.split(codePrefix)[1]

    // Kiểm tra xem định nghĩa nhập vào có đúng không
    if (result === correctDefinition) {
      // Hiển thị kết quả đúng
      console.log("Kết quả đúng!")
      setCounter(counter + 1)
      // Có thể thêm logic hiển thị kết quả ở đây
    } else {
      // Hiển thị kết quả sai
      const feedbackMessage = `Thuật ngữ: ${terminology}\nĐịnh nghĩa là: ${result}\nKết quả là: ${correctDefinition}`
      console.log(feedbackMessage)
      // Có thể thêm logic hiển thị kết quả sai ở đây
    }

    // Cập nhật trạng thái với newCode
    setCode(newCode)
  }

  useEffect(() => {
    const code = `Thuật ngữ: ${listVocabularyMain[counter].terminology}\nĐịnh nghĩa là: `
    setCode(code)
  }, [counter])

  const lineNumbers = (code: string) => {
    return code
      .split("\n")
      .map((_, i) => i + 1)
      .join("\n")
  }

  return (
    <div
      className={`max-w-[460px] ${
        theme === "dark" ? "bg-[#0f172a]" : "bg-white"
      } flex flex-col border shadow-md rounded-md overflow-hidden border-none m-8 p-2`}
    >
      {/* Thanh tiêu đề */}
      <div className="flex items-center justify-between">
        <div
          className={`w-full h-8 flex gap-2 items-center px-2 ${
            theme === "dark" ? "bg-[#0f172a]" : ""
          }`}
        >
          <div className="size-4 rounded-full bg-red-600"></div>
          <div className="size-4 rounded-full bg-yellow-600"></div>
          <div className="size-4 rounded-full bg-green-600"></div>
        </div>
        <div className="px-2 py-0 rounded-none">
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-[80px] bg-black border-none ring-0 outline-none">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="w-fit">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Chọn theme */}

      {/* Nội dung chỉnh sửa */}
      <div className="flex fireworks-container relative">
        {/* Số dòng */}
        <div
          className={`text-[#696c6e] text-right px-2 py-[10px] select-none ${
            theme === "dark" ? "bg-[#0f172a]" : "bg-white"
          }`}
          style={{
            fontFamily: "monospace",
            fontSize: "16px",
            lineHeight: "1.6",
            whiteSpace: "pre",
          }}
        >
          {lineNumbers(code)}
        </div>
        {/* Trình chỉnh sửa */}
        <div className="flex-1 border-none">
          <Editor
            value={code}
            onValueChange={handleCodeChange}
            highlight={(code) => highlight(code, languages.text, "text")}
            padding={10}
            style={{
              fontFamily: "monospace",
              fontSize: "16px",
              lineHeight: "1.6",
              minHeight: "150px",
              outline: "none",
              border: "none",
              backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff", // Thay đổi màu nền
              color: theme === "dark" ? "#ffffff" : "#000000", // Thay đổi màu chữ
            }}
            className="font-medium text-lg focus:outline-none focus:border-none ring-0 focus:ring-0"
          />
        </div>
      </div>
    </div>
  )
}

export default VocabularyEditor
