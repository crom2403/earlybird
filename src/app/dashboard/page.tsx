import { getServerSideUser } from "@/app/lib/payload-utils"

export default async function DashboardPage() {
  const user = await getServerSideUser()
  console.log("user tại dash", user)
  return <div>dashborad</div>
}
