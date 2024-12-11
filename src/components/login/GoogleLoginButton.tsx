// components/GoogleLoginButton.tsx
"use client"
import React from "react"
import { signInWithGoogle } from "@/lib/firebase"
import useAuthStore from "@/store/authStore"
import { useRouter } from "next/navigation"

const GoogleLoginButton: React.FC = () => {
  const { login } = useAuthStore()
  const router = useRouter()

  const handleGoogleLogin = async () => {
    try {
      const userData = await signInWithGoogle()
      login(userData)
      router.push("/dashboard") // Chuyển hướng sau khi đăng nhập
    } catch (error) {
      console.error("Đăng nhập thất bại:", error)
      // Xử lý hiển thị lỗi cho người dùng
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center 
        bg-white border border-gray-300 
        rounded-lg shadow-md px-6 py-2 
        text-sm font-medium text-gray-800 
        hover:bg-gray-200 focus:outline-none"
    >
      {/* <Image
        src="/path/to/google-icon.svg" 
        alt="Google logo" 
        className="w-6 h-6 mr-2" 
      /> */}
      Đăng nhập với Google
    </button>
  )
}

export default GoogleLoginButton
