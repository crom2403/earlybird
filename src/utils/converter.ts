import { Timestamp } from "firebase/firestore"

export const convertTimestampToString = (
  timestamp: Timestamp | { seconds: number } | Date | null | undefined
): string => {
  if (!timestamp) return new Date().toISOString()

  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toISOString()
  }

  if ("seconds" in timestamp) {
    return new Date(timestamp.seconds * 1000).toISOString()
  }

  if (timestamp instanceof Date) {
    return timestamp.toISOString()
  }

  return new Date().toISOString()
}
