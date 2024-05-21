import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow
} from "@/components/ui/table"
import { DecodedUser, Product, ROLE, User } from "@/types"
import { Home } from "./home"
import { NavBar } from "@/components/navbar"

import { useNavigate } from "react-router-dom"
import jwtDecode from "jwt-decode"

export function Dashboard() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    image: "",
    description: ""
  })


  // console.log("decodedtoken:", decodedToken)
  // console.log("decodeduser:", decodeUser)
  const handleChange = (e: any) => {
    const { name, value, valueAsNumber } = e.target
    console.log("{name,value}", { name, value })
    setProduct({
      ...product,
      [name]: name === "price" ? valueAsNumber : value
    })
  }

  const deleteProduct = async (name: string) => {
    try {
      const res = await api.delete(`/Product/${name}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleDeleteProduct = async (name: string) => {
    await deleteProduct(name)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const postProduct = async () => {
    try {
      const res = await api.post("/Product", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const getUsers = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.get("/User", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/Product")
      return res.data
    }
  })

  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  return (
    <div className="App">
      <NavBar />
      <form className="mt-20 w-1/4 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add product</h3>
        <Input
          name="name"
          type="text"
          placeholder="Name"
          className="mt-4"
          onChange={handleChange}
        />
        <Input
          name="price"
          type="number"
          placeholder="Price"
          className="mt-4"
          onChange={handleChange}
        />
        <Input
          name="image"
          type="text"
          placeholder="Image"
          className="mt-4"
          onChange={handleChange}
        />
        <Input
          name="description"
          type="text"
          placeholder="Description"
          className="mt-4"
          onChange={handleChange}
        />
        <div className="flex justify-between">
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </div>
      </form>
      <div>
        <h1 className="scroll-m-20 text-4xl my-10 font-semibold tracking-tight">Products</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Description</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.name}>
                <TableCell className="text-left">{product.name}</TableCell>
                <TableCell className="text-left">{product.price}</TableCell>
                <TableCell className="text-left">{product.description}</TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" onClick={() => handleDeleteProduct(product.name)}>
                    X
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
