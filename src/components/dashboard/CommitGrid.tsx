"use client"
import React from "react"
import clsx from "clsx"
import { toast } from "sonner"
import { StudyData } from "@/types"
import { convertSecondsToHoursMinutes } from "@/utils/converter"

const convertArrayToRecord = (data: StudyData[]): Record<string, number> => {
  return data.reduce((acc, item) => {
    // Chuyển đổi định dạng ngày
    const dateKey = item.date.split("T")[0] // Lấy phần ngày từ chuỗi ISO
    acc[dateKey] = item.totalTime // Gán totalTime vào key là dateKey
    return acc // Trả về accumulator
  }, {} as Record<string, number>) // Khởi tạo accumulator là một đối tượng rỗng
}

const getHeatmapColor = (count: number | undefined) => {
  if (!count || count == 0) return "bg-gray-300 dark:bg-gray-700" // No commits
  if (count <= 1800) return "bg-blue-100" // Tối nhất
  if (count <= 3600) return "bg-blue-300" // Tối
  if (count <= 7200) return "bg-blue-500" // Trung bình
  return "bg-blue-700" // Sáng nhất
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const CommitGrid = ({ listStudyTime }: { listStudyTime: StudyData[] }) => {
  const year = new Date().getFullYear()
  // const allDates = generateDates(year)
  const dummyData = convertArrayToRecord(listStudyTime)
  // Group dates by month
  const monthlyData = Array.from({ length: 12 }, (_, monthIndex) => {
    const month = monthIndex + 1
    const monthStr = month.toString().padStart(2, "0")
    const monthYear = `${year}-${monthStr}`
    const daysInMonth = getDaysInMonth(year, monthIndex)

    const dates = Array.from({ length: daysInMonth }, (_, day) => {
      const dayStr = (day + 1).toString().padStart(2, "0")
      return `${monthYear}-${dayStr}`
    })

    return {
      monthYear,
      dates,
    }
  })

  const monthsData = monthlyData.map(({ monthYear, dates }) => {
    const month = new Date(monthYear + "-01").toLocaleString("default", { month: "short" })
    const weeks: Array<(string | null)[]> = []

    const firstDay = new Date(dates[0]).getDay()

    // Add padding for first week if needed
    if (firstDay > 0) {
      const padding = Array(firstDay).fill(null)
      const firstWeekDates = dates.slice(0, 7 - firstDay)
      weeks.push([...padding, ...firstWeekDates])
    }

    // Group remaining dates into weeks
    for (let i = firstDay > 0 ? 7 - firstDay : 0; i < dates.length; i += 7) {
      const weekDates = dates.slice(i, i + 7)
      if (weekDates.length > 0) {
        if (weekDates.length < 7) {
          // Add padding to last week if needed
          const padding = Array(7 - weekDates.length).fill(null)
          weeks.push([...weekDates, ...padding])
        } else {
          weeks.push(weekDates)
        }
      }
    }

    return {
      month,
      monthYear,
      weeks,
    }
  })

  return (
    <div className=" mt-4 bg-transparent dark:text-white w-fit">
      <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
        {monthsData.map(({ month, monthYear, weeks }) => (
          <div key={monthYear} className="md:w-fit flex flex-col items-center">
            <div className="text-sm font-medium mb-2">{month}</div>
            <div className="flex gap-[2px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px]">
                  {week.map((date, dayIndex) => (
                    <div
                      key={dayIndex}
                      onClick={() => {
                        if (date) {
                          const formattedDate = new Date(date).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          const time = dummyData[date] || 0
                          if (time < 60) {
                            toast.info("Chưa có dữ liệu")
                          } else {
                            toast.info(
                              `Ngày ${formattedDate}: Bạn đã học ${convertSecondsToHoursMinutes(
                                time
                              )}`
                            )
                          }
                        }
                      }}
                      className={clsx(
                        "size-4 md:size-[10px] hover:bg-slate-500 dark:hover:bg-slate-200",
                        date
                          ? getHeatmapColor(dummyData[date])
                          : "bg-transparent hover:bg-transparent dark:hover:bg-transparent"
                      )}
                      title={date ? `${date}: ${dummyData[date] || 0} giờ` : ""}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center text-xs">
        <span className="mr-2">Less</span>
        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 mx-[2px]"></div>
        <div className="w-4 h-4 bg-blue-100 mx-[2px]"></div>
        <div className="w-4 h-4 bg-blue-300 mx-[2px]"></div>
        <div className="w-4 h-4 bg-blue-500 mx-[2px]"></div>
        <div className="w-4 h-4 bg-blue-700 mx-[2px]"></div>
        <span className="ml-2">More</span>
      </div>
    </div>
  )
}

export default CommitGrid
