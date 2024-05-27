import { GlobalContext } from "@/App"
import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import jwt from "jwt-decode"
import { reshapeUser } from "@/lib/utils"

export function LogIn() {
  const navigate = useNavigate()
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing")
  const { handleStoreUser } = context
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  console.log("user", user)

  const handleLogin = async () => {
    try {
      const res = await api.post(`/user/login`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const token = await handleLogin()

    if (token) {
      const decodedToken = jwt(token)
      const user = reshapeUser(decodedToken)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      handleStoreUser(user)
      navigate("/")
    }
  }
  return (
    <div className="text-[#464646]">
      <div className="page-bannerImage-container">
        <img src="/images/purple-back.png" alt="" />
      </div>
      <br />
      <br />

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <br />
        <br />
        <br />

        <br />
        <p className="text-gray-500 dark:text-gray-400">Enter your email and password to log in.</p>
      </div>

      <form action="POST" className="w-full md:w-1/2 mx-auto" onSubmit={handleSubmit}>
        <Input
          name="email"
          className="mt-4"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          className="mt-4"
          placeholder="Password"
          onChange={handleChange}
        />
        <div className="flex justify-between flex-col">
          <Button className="mt-4 bg-[#E7D4FF] text-[#464646] hover:bg-[#E7D4FF]/90">Login</Button>
          <Button variant="link" className="mt-4">
            <Link to="/signup">create an account </Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
