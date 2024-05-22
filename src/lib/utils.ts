import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenFromStorage() {
  const token = localStorage.getItem("token")
  if (!token) return null

  return token
}
export function reshapeUser(decodedToken:unknown){
  const decodeUser: any = {}
  if (decodedToken) {
    for (const [key, value] of Object.entries(decodedToken)) {
      console.log("key", key)
      console.log("value", value)
      let cleanKey = ""
      if (key.startsWith("http")) {
        cleanKey = key.split("identity/claims/")[1]
      } else {
        cleanKey = key
      }

      decodeUser[cleanKey] = value
    }
  }
  return decodeUser
}