import { getServerSideUser } from "@/app/lib/payload-utils"
import DashBoard from "@/components/dashboard/DashBoard"
import {
  getAllStudyTimeByUser,
  getMonthlyStudyTime,
  getTodayStudyTime,
} from "@/app/vocabulary/action"

// const DashBoard = dynamic(() => import("@/components/dashboard/DashBoard"), { ssr: false })

export default async function DashboardPage() {
  const user = await getServerSideUser()
  const listStudyTime = await getAllStudyTimeByUser(user?.uid || "")
  const todayTimeStudy = await getTodayStudyTime(user?.uid || "")
  const monthTimeStudy = await getMonthlyStudyTime(user?.uid || "")
  console.log("todayTimeStudy", todayTimeStudy)
  console.log("monthTimeStudy", monthTimeStudy)
  return (
    <div className="">
      <DashBoard userId={user?.uid} listStudyTime={listStudyTime} />
    </div>
  )
}
