import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Session } from "inspector/promises"
import App from "@/app/App"
import { Providers } from "./providers"
import { Suspense } from "react"
import Loading from "@/components/ui/Loading"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Thế giới từ vựng",
  description: "Thế giới từ vựng",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  session?: Session | null
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={<Loading />}>
          <Providers>
            <App>{children}</App>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
