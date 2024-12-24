import { getServerSideUser } from "@/app/lib/payload-utils"
import DashBoard from "@/components/dashboard/DashBoard"
import {
  getAllStudyTimeByUser,
  getMonthlyStudyTime,
  getTodayStudyTime,
} from "@/app/vocabulary/action"

export default async function DashboardPage() {
  const user = await getServerSideUser()
  const response = await Promise.all([
    await getTodayStudyTime(user?.uid || ""),
    await getMonthlyStudyTime(user?.uid || ""),
    await getAllStudyTimeByUser(user?.uid || ""),
  ])

  return (
    <div>
      <DashBoard
        userId={user?.uid}
        listStudyTime={response[2]}
        todayTimeStudy={response[0]}
        monthTimeStudy={response[1]}
      />
    </div>
  )
}
