// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/firebase"
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log(path)
  const user = auth.currentUser
  console.log("user" + user)

  const isPublicPath = path === "/login"

  const token = request.cookies.get("auth-storage")?.value || ""

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

// Các route cần bảo vệ
export const config = {
  matcher: ["/", "/dashboard/:path*", "/profile/:path*", "/login", "/signup"],
}
