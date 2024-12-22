import { getServerSideUser } from "@/app/lib/payload-utils"
import DashBoard from "@/components/dashboard/DashBoard"

// const DashBoard = dynamic(() => import("@/components/dashboard/DashBoard"), { ssr: false })

export default async function DashboardPage() {
  const user = await getServerSideUser()
  return (
    <div className="">
      <DashBoard userId={user?.uid} />
    </div>
  )
}
