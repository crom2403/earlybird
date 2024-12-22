"use client"
import { useOnlineTracking } from "@/hooks/useOnlineTracking"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OnlineStatus({ userId }: { userId: string | undefined }) {
  const { isOnline, lastSeen, totalTimeToday } = useOnlineTracking(userId)

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Trạng thái hoạt động</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Trạng thái:</span>
            <span className={`flex items-center ${isOnline ? "text-green-500" : "text-gray-500"}`}>
              {isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
              <div
                className={`w-2 h-2 rounded-full ml-2 ${isOnline ? "bg-green-500" : "bg-gray-500"}`}
              />
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Lần cuối hoạt động:</span>
            <span>{new Date(lastSeen).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Thời gian hoạt động hôm nay:</span>
            <span>{formatTime(totalTimeToday)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
