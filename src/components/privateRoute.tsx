import { ReactElement, ReactNode } from "react"
import jwt from "jwt-decode"
import { ROLE } from "@/types"
import { LogIn } from "@/pages/login"
import { Navigate } from "react-router-dom"
import { reshapeUser } from "@/lib/utils"
export function PrivateRoute({ children }: { children: ReactElement }) {
  const token = localStorage.getItem("token") || ""
  if (!token) return <Navigate to="/" />
  const decodedToken = jwt(token)

  const decodeUser = reshapeUser(decodedToken)

  return decodeUser.role === ROLE.Customer ? <Navigate to="/" /> : children
}
