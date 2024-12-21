"use client"
import React from "react"
import clsx from "clsx"
import { toast } from "sonner"

const dummyData: Record<string, number> = {
  "2024-08-01": 1,
  "2024-09-15": 2,
  "2024-10-10": 3,
  "2024-12-20": 5,
}

// const generateDates = (year: number) => {
//   const dates = []
//   const startDate = new Date(year, 0, 1) // January 1st
//   const endDate = new Date(year, 11, 31) // December 31st

//   for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
//     dates.push(new Date(d).toISOString().split("T")[0])
//   }
//   return dates
// }

const getHeatmapColor = (count: number | undefined) => {
  if (!count) return "bg-gray-300 dark:bg-gray-700" // No commits
  if (count <= 1) return "bg-blue-100" // Tối nhất
  if (count <= 2) return "bg-blue-300" // Tối
  if (count <= 3) return "bg-blue-500" // Trung bình
  return "bg-blue-700" // Sáng nhất
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const CommitGrid: React.FC = () => {
  const year = 2024
  // const allDates = generateDates(year)

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
    <div className="p-4 bg-transparent dark:text-white">
      <div className="grid grid-cols-3 gap-4 md:flex md:gap-4">
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
                          const hours = dummyData[date] || 0
                          toast.info(`Ngày ${formattedDate}: Bạn đã học ${hours} giờ.`)
                        }
                      }}
                      className={clsx(
                        "w-4 h-4 md:w-[10px] md:h-[10px] hover:bg-slate-500 dark:hover:bg-slate-200",
                        date ? getHeatmapColor(dummyData[date]) : "bg-transparent"
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
