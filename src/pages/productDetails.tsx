import api from "@/api"
import { NavBar } from "@/components/navbar"
import Footer from "@/components/footer"

import { Button } from "@/components/ui/button"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "@/App"

export function ProductDetails() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing")
  const { handleAddtoCart } = context
  const { name } = useParams()
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
  const {
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
    <div>
      <section>
        <NavBar />

        <div className="page-bannerImage-container">
          <img src="/images/purple-back.png" alt="" />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-6 bg-gray-100 dark:bg-gray-950  ">
          <div className="flex items-start justify-center">
            <img
              alt="Product Image"
              className="w-full max-h-[500px] object-cover rounded-lg shadow-lg"
              height={600}
              src={product.image}
              style={{
                aspectRatio: "600/600",
                objectFit: "cover"
              }}
              width={600}
            />
          </div>
          <div className="grid gap-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{product.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold"> {product.price} SAR</span>
              <Button
                className="bg-[#E7D4FF] text-[#464646] hover:bg-[#E7D4FF]/90 focus-visible:ring-[#E7D4FF] font-bold"
                size="lg"
                onClick={() => handleAddtoCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Footer />
      </section>
    </div>
  )
}
