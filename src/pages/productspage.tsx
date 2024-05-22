

    import { GlobalContext } from "../App"
import api from "@/api"
import { NavBar } from "@/components/navbar"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"

export function ProductsPage() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing")

  const { handleAddtoCart } = context

  const [count, Setcount] = useState(0)

  const getProducts = async () => {
    try {
      const res = await api.get("/Product")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  console.log("data", data)
  return (
    <div className="App">
      <NavBar />

      <h1 className="text-2xl uppercase mb-10">Products</h1>
      

      <section className="flex flex-col md:flex-row gap-4 m-30 justify-center max-w-6xl mx-auto flex-wrap">
        {data?.map((product) => (
          <Card key={product.id} className="w-[250px] ">
            <CardHeader>
              <img src={product.image} className="mb-4 h-30 w-56 object-contain " />
              {/* <CardTitle>{product.image}</CardTitle> */}
              <CardTitle>{product.name}</CardTitle>
              <CardTitle>{product.price}</CardTitle>

              {/* <CardDescription>Some Description here</CardDescription> */}
            </CardHeader>
            <CardContent>{/* <p>Card Content Here</p> */}</CardContent>
            <CardFooter className="flex justify-between">
              <Button variant={"outline"}>
               <Link to={`/Product/${product.name}`}> Details</Link>
              </Button>
              <Button className="w-full" onClick={() => handleAddtoCart(product)} >
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  )
}

