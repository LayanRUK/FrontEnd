import api from "@/api"
import { NavBar } from "@/components/navbar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Console } from "console"
import { useParams } from "react-router-dom"

export function ProductDetails() {
  const {name} = useParams()
  // console.log("name:", name)

  const FindProductByName = async () => {
    try {
      const res = await api.get(`Product/${name}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const  {
    data: product,
    error,
    isLoading
  } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: FindProductByName
  })
  console.log(product)
  if (isLoading) {
    return <p> Loading.....</p>
  }
  if (!product) {
    return <p> product not found</p>
  }

  return (
    <>
      <NavBar />
      <div>
        <h3>{product.name}</h3>
      </div>
    </>
  )
}