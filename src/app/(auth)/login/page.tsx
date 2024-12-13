// src/app/(auth)/login/page.tsx
// import { getServerSession } from "next-auth"
// import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GoogleLoginButton from "@/components/login/GoogleLoginButton"

export default async function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Đăng Nhập</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <GoogleLoginButton />
            <div className="text-center text-sm text-gray-500">Ứng dụng học từ vựng công nghệ</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
