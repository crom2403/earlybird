// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log(path)

  const isPublicPath = path === "/login" || path === "/signup"

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
