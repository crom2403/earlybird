"use server"
import { cookies } from "next/headers"
import { decrypt } from "@/app/lib/session"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { UserResponse } from "@/types/user"

export const getServerSideUser = async () => {
  const cookie = cookies().get("session")?.value
  const session = await decrypt(cookie)
  if (session?.userId) {
    const q = query(collection(db, "users"), where("uid", "==", session?.userId))
    const querySnapshot = await getDocs(q)
    const userDoc = querySnapshot.docs[0]?.data() as UserResponse
    return userDoc || null
  }
}
