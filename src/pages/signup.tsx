import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function SignUp() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })
  console.log("user:", user)
  const handleSignup = async () => {
    try {
      const res = await api.post(`/User/signup`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const response = await handleSignup()
    console.log("response:", response)
    if (response) {
      navigate("/login")
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
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
        <br />
        <br />
        <br />

        <br />
      </div>
      <form action="POST" onSubmit={handleSubmit} className="w-full md:w-1/2 mx-auto">
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="name"
          onChange={handleChange}
        />
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
          <Button className="mt-4 bg-[#E7D4FF] text-[#464646]">Signup</Button>
          <Button variant="link" className="mt-4">
            <Link to="/login">Already have an account? Login </Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
