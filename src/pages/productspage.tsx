import Footer from "@/components/footer"
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
import { Input } from "@/components/ui/input"
import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowRight, Container, ShoppingBag } from "lucide-react"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""
  const [searchBy, setSearchBy] = useState(defaultSearch)
  const queryClient = useQueryClient()
  console.log(searchBy, "search")
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing")

  const { handleAddtoCart } = context

  const [count, Setcount] = useState(0)

  const getProducts = async () => {
    try {
      const res = await api.get(`/Product?Search=${searchBy}`)
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
  }
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["products"] })
    setSearchParams({
      ...searchParams,
      searchBy: searchBy
    })
  }

  return (
    <div className="App ">
      <NavBar />
      <div className="page-bannerImage-container ">
        <img src="./images/purple-back.png" alt="" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <form
          onSubmit={handleSearch}
          className=" flex gap-4 w-full md:w-1/2 mx-auto mb-10 mt-10 fugaz-one-regular "
        >
          <Input
            type="search"
            placeholder="search for a product"
            onChange={handleChange}
            value={searchBy}
            className="fugaz-one-regular "
          ></Input>
          <Button type="submit" className="fugaz-one-regular custom-button">
            Search
          </Button>
        </form>
      </div>

      <section className="flex flex-col md:flex-row gap-4 m-30 justify-center max-w-6xl mx-auto flex">
        {data?.length === 0 && <p> no product found</p>}
        {data?.map((product) => (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden w-64 dark:bg-gray-950"
            key={product.id}
          >
            <div className="relative">
              <img
                alt="Product Image"
                className="w-full h-64 object-cover"
                height={400}
                src={product.image}
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover"
                }}
                width={400}
              />
              <div
                className="absolute top-4 right-4 bg-[#E7D4FF] text-white rounded-full p-2 flex items-center justify-center dark:bg-gray-50 dark:text-gray-900"
                onClick={() => handleAddtoCart(product)}
              >
                <ShoppingBag color="#464646 " className="shopping-bag" />
              </div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{product.name}</p>
                <p className="text-[#464646] font-bold text-lg dark:text-gray-50">
                  {product.price} SR
                </p>
              </div>
              <Link
                className="bg-[#E7D4FF] text-[#464646] rounded-full p-2 flex items-center justify-center transition-colors hover:bg-[#ddcbf3] dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                to={`/Product/${product.name}`}
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {error && <p className="text-red-500">{error.message}</p>}
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  )
}
