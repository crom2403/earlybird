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
import { cn } from "@/lib/utils"

interface VocabularyState {
  attempts: number
  isCorrect: boolean
}

const VocabularyEditor = ({ listVocabulary }: { listVocabulary: InputVocabulary[] | [] }) => {
  const [code, setCode] = useState("")
  const [theme, setTheme] = useState("dark")
  const [counter, setCounter] = useState<number>(0)
  const [mode, setMode] = useState<string>("learn")
  const [vocabularyStats, setVocabularyStats] = useState<Map<string, VocabularyState>>(new Map())
  const color = {
    dark: "bg-gradient-to-br from-[#0f172a] to-[#070b17] text-white",
    light: "bg-white text-black",
    pink: "bg-gradient-to-br from-[#fa87ad] to-[#f76897] text-white",
    green: "bg-[#0d301f] text-[#fedb3f]",
    gradient_1: "bg-gradient-to-br from-pink-600 to-violet-600 text-white",
    gradient_2: "bg-gradient-to-br from-orange-600 to-blue-600 text-white",
    gradient_3: "bg-gradient-to-br from-teal-400 to-blue-500 text-white", // Gradient xanh lam
    gradient_4: "bg-gradient-to-br from-purple-500 to-red-500 text-white", // Gradient tím và đỏ
    gradient_5: "bg-gradient-to-br from-yellow-400 to-red-500 text-white", // Gradient vàng và đỏ
    gradient_6: "bg-gradient-to-br from-green-400 to-blue-500 text-white", // Gradient xanh lá và xanh lam
    gradient_7: "bg-gradient-to-br from-indigo-500 to-pink-500 text-white", // Gradient xanh dương và hồng
    gradient_8: "bg-gradient-to-br from-gray-700 to-gray-900 text-white", // Gradient xám
    gradient_9: "bg-gradient-to-br from-red-400 to-yellow-500 text-white", // Gradient đỏ và vàng
    gradient_10: "bg-gradient-to-br from-blue-400 to-purple-600 text-white", // Gradient xanh lam và tím
  }

  const currentVocab = listVocabulary[counter]

  useEffect(() => {
    resetEditor()
  }, [counter, mode])

  const resetEditor = () => {
    const terminology = currentVocab.terminology
    setCode(`Thuật ngữ: ${terminology}\nĐịnh nghĩa là: `)
  }

  const getVocabStats = (terminology: string): VocabularyState => {
    return (
      vocabularyStats.get(terminology) || {
        attempts: 0,
        isCorrect: false,
      }
    )
  }

  const updateVocabStats = (terminology: string, isCorrect: boolean) => {
    const stats = getVocabStats(terminology)
    const newStats = {
      attempts: stats.attempts + 1,
      isCorrect: isCorrect,
    }
    setVocabularyStats(new Map(vocabularyStats.set(terminology, newStats)))
  }

  const handleCodeChange = (newCode: string) => {
    const prefix = `Thuật ngữ: ${currentVocab.terminology}\nĐịnh nghĩa là: `
    const prefixWithCorrect = `Thuật ngữ: ${currentVocab.terminology}\nĐịnh nghĩa đúng là: ${currentVocab.define}\nĐịnh nghĩa là: `

    if (!newCode.startsWith(prefix) && !newCode.startsWith(prefixWithCorrect)) {
      return
    }
    setCode(newCode)
  }

  const checkAnswer = (userAnswer: string): boolean => {
    const normalizedAnswer = userAnswer.trim().toLowerCase()
    const normalizedCorrect = currentVocab.define.trim().toLowerCase()
    return normalizedAnswer === normalizedCorrect
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return
    event.preventDefault()

    const userAnswer =
      mode === "learn" ? code.split("Định nghĩa là: ")[1] : code.split("Định nghĩa là: ")[1]

    const isCorrect = checkAnswer(userAnswer)
    updateVocabStats(currentVocab.terminology, isCorrect)

    if (isCorrect) {
      if (counter < listVocabulary.length - 1) {
        setCounter(counter + 1)
      } else {
        setCode("Chúc mừng! Bạn đã hoàn thành tất cả các từ vựng!")
      }
    } else {
      const feedbackMessage =
        mode === "learn"
          ? `Thuật ngữ: ${currentVocab.terminology}\nĐịnh nghĩa đúng là: ${currentVocab.define}\nĐịnh nghĩa là: ${userAnswer}`
          : `Câu trả lời chưa chính xác. Hãy thử lại!\nThuật ngữ: ${currentVocab.terminology}\nĐịnh nghĩa là: `

      setCode(feedbackMessage)
    }
  }

  const lineNumbers = (code: string) => {
    return code
      .split("\n")
      .map((_, i) => i + 1)
      .join("\n")
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className={`flex w-full flex-col gap-4 m-4 max-w-[600px]`}>
        <div className="flex w-full flex-col gap-2">
          <div
            className={cn(
              "flex items-center gap-2 p-2 rounded-md",
              theme === "dark" ? color.dark : "",
              theme === "light" ? color.light : "",
              theme === "green" ? color.green : "",
              theme === "pink" ? color.pink : "",
              theme === "gradient1" ? color.gradient_1 : "",
              theme === "gradient2" ? color.gradient_2 : "",
              theme === "gradient3" ? color.gradient_3 : "",
              theme === "gradient4" ? color.gradient_4 : "",
              theme === "gradient5" ? color.gradient_5 : "",
              theme === "gradient6" ? color.gradient_6 : "",
              theme === "gradient7" ? color.gradient_7 : "",
              theme === "gradient8" ? color.gradient_8 : "",
              theme === "gradient9" ? color.gradient_9 : "",
              theme === "gradient10" ? color.gradient_10 : ""
            )}
          >
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger
                className={`w-[90px] border-none ring-0 outline-none ${
                  theme === "dark" ? "bg-[#060b17] text-white" : "bg-[#e8e9eb] text-black"
                }`}
              >
                <SelectValue placeholder="Chế độ học" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                <SelectItem value="learn">Learn</SelectItem>
                <SelectItem value="test">Test</SelectItem>
              </SelectContent>
            </Select>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger
                className={`min-w-[90px] max-w-[110px] border-none ring-0 outline-none ${
                  theme === "dark" ? "bg-[#060b17] text-white" : "bg-[#e8e9eb] text-black"
                }`}
              >
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="gradient1">Gradient 1</SelectItem>
                <SelectItem value="gradient2">Gradient 2</SelectItem>
                <SelectItem value="gradient3">Gradient 3</SelectItem>
                <SelectItem value="gradient4">Gradient 4</SelectItem>
                <SelectItem value="gradient5">Gradient 5</SelectItem>
                <SelectItem value="gradient6">Gradient 6</SelectItem>
                <SelectItem value="gradient7">Gradient 7</SelectItem>
                <SelectItem value="gradient8">Gradient 8</SelectItem>
                <SelectItem value="gradient9">Gradient 9</SelectItem>
                <SelectItem value="gradient10">Gradient 10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div
          className={cn(
            "w-full flex flex-col border shadow-md rounded-md overflow-hidden border-none p-2 text-white",
            theme === "dark" ? color.dark : "",
            theme === "light" ? color.light : "",
            theme === "green" ? color.green : "",
            theme === "pink" ? color.pink : "",
            theme === "gradient1" ? color.gradient_1 : "",
            theme === "gradient2" ? color.gradient_2 : "",
            theme === "gradient3" ? color.gradient_3 : "",
            theme === "gradient4" ? color.gradient_4 : "",
            theme === "gradient5" ? color.gradient_5 : "",
            theme === "gradient6" ? color.gradient_6 : "",
            theme === "gradient7" ? color.gradient_7 : "",
            theme === "gradient8" ? color.gradient_8 : "",
            theme === "gradient9" ? color.gradient_9 : "",
            theme === "gradient10" ? color.gradient_10 : ""
          )}
        >
          <div className="flex items-center justify-between">
            <div className={`w-full h-8 flex gap-2 items-center px-2 bg-transparent`}>
              <div className="size-4 rounded-full bg-red-600"></div>
              <div className="size-4 rounded-full bg-yellow-600"></div>
              <div className="size-4 rounded-full bg-green-600"></div>
            </div>
          </div>
          <div className="flex fireworks-container relative">
            <div
              className={`text-[#696c6e] text-right px-2 py-[10px] select-none`}
              style={{
                fontFamily: "monospace",
                fontSize: "16px",
                lineHeight: "1.6",
                whiteSpace: "pre",
              }}
            >
              {lineNumbers(code)}
            </div>
            <div className="flex-1 border-none">
              <Editor
                value={code}
                onValueChange={handleCodeChange}
                onKeyDown={handleKeyDown}
                highlight={(code) => highlight(code, languages.text, "text")}
                padding={10}
                style={{
                  fontFamily: "monospace",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  minHeight: "300px",
                  outline: "none",
                  border: "none",
                }}
                className="text-lg focus:outline-none focus:border-none ring-0 focus:ring-0 "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VocabularyEditor
