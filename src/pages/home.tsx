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

export function Home() {
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
      <img src="./images/photo1.png" alt="" width="1534" height="829" />
      <p className="mt-10 mb-10 homephototext">How it works :</p>

      {/* <h1 className="text-2xl uppercase mb-10">Products</h1> */}
      {/* <div className= "flex flex-col md:flex-row gap-20 m-30 justify-center max-w-6xl mx-auto flex">
      <img src="./images/2.png" alt="" width="250" height="250"/>
      <img src="./images/1.png" alt="" width="250" height="250"/>
      <img src="./images/3.png" alt="" width="250" height="250"/>
      </div>
      <div >
        <h1> You decide</h1>
        <h1> We deliver</h1>
        <h1> You devour</h1>
      </div> */}
      <div className="flex flex-col md:flex-row gap-20 m-30 justify-center max-w-6xl mx-auto">
        {/* First image and text */}
        <div className="flex flex-col items-center ">
          <img src="./images/2.png" alt="" width="250" height="250" />
          <div className="homephototext">
            {" "}
            <h2>You decide</h2>{" "}
          </div>
          <h2>
            Choose from the delicious
            <br /> and affordable recipes{" "}
          </h2>
        </div>

        {/* Second image and text */}
        <div className="flex flex-col items-center ">
          <img src="./images/1.png" alt="" width="250" height="250" />
          <div className="homephototext">
            {" "}
            <h2>We deliver</h2>{" "}
          </div>

          <h2>
            Everything you need <br /> is shipped to your door
          </h2>
        </div>

        {/* Third image and text */}

        <div className="flex flex-col items-center">
          <img src="./images/3.png" alt="" width="250" height="250" />
          <div className="homephototext">
            {" "}
            <h2>You devour </h2>
          </div>
          <h2>
            Home-cooked deliciousness <br />
            is ready{" "}
          </h2>
        </div>
      </div>

      <section className="section-background mt-20">
        <h1 className="homephototext">Why Easy Plate?</h1>

        <div className="flex flex-col items-center">
          <div className="homephototext mt-20 flex-container-home">
            {" "}
            <img src="./images/4.png" alt="" width="120" height="120" />
            <h2>SAVE TIME</h2>
          </div>

          <h2>Skip the tedious trips to the grocery store</h2>
        </div>

        <div className="flex flex-col items-center ">
          <div className="homephototext mt-20 flex-container-home">
            {" "}
            <img src="./images/5.png" alt="" width="120" height="120" />
            <h2>SAVE MONEY</h2>
          </div>
          <h2>Enjoy tasty dinners that won’t break the bank</h2>
        </div>

        <div className="flex flex-col items-center mb-20">
          <div className="homephototext mt-20 flex-container-home">
            {" "}
            <img src="./images/6.png" alt="" width="120" height="120" />
            <h2>EASY TO COOK</h2>
          </div>
          <h2>Our recipes have simple steps and will turn you into a chef</h2>
        </div>
        <Button>Order now !</Button>
      </section>
      <section className="flex flex-col md:flex-row gap-4 m-30 justify-center max-w-6xl mx-auto flex">
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px] ">
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
              <Button className="w-full" onClick={() => handleAddtoCart(product)}>
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
