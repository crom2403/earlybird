// store/authStore.ts
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type User = {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
}

type AuthStore = {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => void
  logout: () => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
        }),
      logout: () => {
        return set({
          user: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAuthStore
