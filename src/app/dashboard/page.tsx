import { getServerSideUser } from "@/app/lib/payload-utils"
import DashBoard from "@/components/dashboard/DashBoard"

export default async function DashboardPage() {
  const user = await getServerSideUser()
  console.log("user tại dash", user)
  return (
    <div className="">
      <DashBoard />
    </div>
  )
}
