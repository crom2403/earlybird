/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserResponse {
  email: string
  displayName: string
  photoURL: string
  uid: string
  accessToken: string
  lastSeen: string
  isOnline: boolean
  role: string
}

export interface User {
  displayName: string
  email: string
  uid: string
  role: string
  photoURL: string
  // isOnline?: boolean
  // totalTimeToday?: number
  // lastLoginToday?: number
}

export type UserData = {
  displayName: string
  email: string
  photoURL: string
  role: string
  uid: string
  isOnline: boolean
  lastSeen: string // Chuyển thành ISO string
}

export type OnlineStatus = {
  isOnline: boolean
  lastSeen: string
  totalTimeToday: number // Tổng thời gian online trong ngày (tính bằng giây)
}
