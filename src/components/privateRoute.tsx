import { ReactElement, ReactNode } from "react";
import jwt from "jwt-decode"
import { ROLE } from "@/types";
import { LogIn } from "@/pages/login";
import { Navigate } from "react-router-dom";
export function PrivateRoute({children}:{children:ReactElement})
{
      const token = localStorage.getItem("token") || ""
    const decodedToken = jwt(token)
  
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
    

    return decodeUser.role===ROLE.Customer?<Navigate to="/"/> :(children)
}