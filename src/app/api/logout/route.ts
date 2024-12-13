import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export function GET() {
  // Xóa cookie ở server side
  cookies().delete("userData")

  // Redirect về trang login
  redirect("/login")
}
