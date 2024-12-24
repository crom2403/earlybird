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

export const convertSecondsToHoursMinutes = (seconds: number): string => {
  // Kiểm tra xem seconds có phải là số hợp lệ không
  if (isNaN(seconds) || seconds < 0) {
    return "0" // Trả về "0" nếu seconds không hợp lệ
  }

  if (seconds < 60) {
    return `${seconds} giây` // Nếu nhỏ hơn 60 giây, trả về "0"
  }

  const hours = Math.floor(seconds / 3600) // Tính số giờ
  const minutes = Math.floor((seconds % 3600) / 60) // Tính số phút

  // Nếu tổng số giờ là 0, chỉ trả về phút
  if (hours === 0) {
    return `${minutes} phút`
  }

  // Trả về chuỗi theo định dạng "X giờ Y phút"
  return `${hours} giờ ${minutes} phút`
}

export const convertDateToString = (dateString: string): string => {
  // Tạo đối tượng Date từ chuỗi đầu vào
  const date = new Date(dateString)

  // Kiểm tra xem đối tượng Date có hợp lệ không
  if (isNaN(date.getTime())) {
    return "" // Trả về chuỗi rỗng nếu ngày không hợp lệ
  }

  // Lấy ngày, tháng và năm
  const day = String(date.getDate()).padStart(2, "0") // Ngày
  const month = String(date.getMonth() + 1).padStart(2, "0") // Tháng (tháng bắt đầu từ 0)
  const year = date.getFullYear() // Năm

  // Trả về chuỗi theo định dạng "dd/mm/yyyy"
  return `${day}/${month}/${year}`
}
