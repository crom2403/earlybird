/* eslint-disable @typescript-eslint/no-explicit-any */
export async function loginAction(formData: any) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData }),
  })
  return await response.json()
}
