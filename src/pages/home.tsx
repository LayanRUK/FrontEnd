import { GlobalContext } from "../App"
import api from "@/api"
import Footer from "@/components/footer"

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
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { TypeAnimation } from "react-type-animation"

export function Home() {
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
      <div>
        <section>
          <div className="text-left  mt-20 px-4 md:px-8  ">
            <br />
            <br />
            <TypeAnimation
              sequence={["MEET TASTY RECIPES", 1000, "MEET EASYPLATE", 1000]}
              wrapper="span"
              speed={30}
              style={{ fontSize: "4rem", display: "inline-block" }}
              repeat={Infinity}
              className="type-animation"
            />
          </div>
        </section>
      </div>
      <div className="home-bannerImage-container ">
        <img src="./images/purple-back.png" alt="" />
      </div>
      <div className="home-foodImage-container  ">
        <img src="./images/Home Page Banner Image Background Removed 1.png" alt="" />
      </div>

      <div>
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
        <br />
        <br />
      </div>

      <section>
        <p className="mt-10 mb-10 homephototext fugaz-one-regular">How it works</p>
        <div className="flex flex-col md:flex-row gap-20 m-30 justify-center max-w-6xl mx-auto items-center fugaz-one-regular ">
          {/* First image and text */}
          <div className="flex flex-col items-center ">
            <img src="./images/1.png" alt="" width="250" height="250" />
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
            <img src="./images/2.png" alt="" width="250" height="250" />
            <div className="homephototext">
              {" "}
              <h2 className="fugaz-one-regular">We deliver</h2>{" "}
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
      </section>

      <br />
      <b />

      <section className=" mt-20 fugaz-one-regular">
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
        {/* <Button>Order now !</Button> */}
      </section>
      <Footer />
    </div>
  )
}
