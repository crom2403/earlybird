export interface UserResponse {
  email: string
  displayName: string
  photoURL: string
  uid: string
  accessToken: string
  role: string
}

export interface User {
  displayName: string
  email: string
  uid: string
  role: string
  photoURL: string
}
