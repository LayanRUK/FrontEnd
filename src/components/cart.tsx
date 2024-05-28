import { Label } from "@radix-ui/react-menubar"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { MinusIcon, PlusIcon, ShoppingBag } from "lucide-react"
import { Product } from "@/types"
import api from "@/api"
import { Link, useNavigate } from "react-router-dom"

type OrderItem = {
  quantity: number
  productId: string
}
type OrderCheckout = {
  items: OrderItem[]
}

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing")

  const { state, handleDeleteFromCart, handleAddtoCart, handleRemoveCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [productId: string]: Product[] })

  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)

  const checkoutOrder: OrderCheckout = {
    items: []
  }
  Object.keys(groups).forEach((key) => {
    const products = groups[key]

    checkoutOrder.items.push({
      quantity: products.length,
      productId: key
    })
  })

  const navigate = useNavigate() // Use useNavigate

  const handleCheckoutpage = () => {
    navigate("/checkoutpage", { state: { total } }) // Pass total via state
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
          <ShoppingBag color="#464646" />
          <span>({state.cart.length})</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-100 p-4 bg-white/30 backdrop-blur-md rounded-md shadow-lg border border-gray-300">
        <div>
          {state.cart.length === 0 && <p>No items</p>}
          {/* {state.cart.map((product) => { */}
          {Object.keys(groups).map((key) => {
            const products = groups[key]
            const product = products[0]
            const total = products.reduce((acc, curr) => {
              return acc + curr.price
            }, 0)
            return (
              <div
                className="flex items-center mb-4 p-2 border-b border-[#464646] "
                key={product.id}
              >
                <img
                  src={product.image}
                  className="w-10 h-10 object-contain mr-4"
                  alt={product.name}
                />
                <h4 className="text-lg font-medium">{product.name}</h4>

                <span className=" text-sm text-gray-600 mr-4 ml-7 font-bold">{product.price}</span>
                <Button
                  variant="destructive"
                  className="mr-5 rounded-full bg-[#E7D4FF] text-[#464646] outline-none" // Added outline-none to remove the outline
                  onClick={() => handleDeleteFromCart(product.id)}
                >
                  -
                </Button>
                <span className="font-bold mr-4 ">({products.length})</span>
                <Button
                  variant="outline"
                  className="rounded-full bg-[#E7D4FF] text-[#464646]"
                  onClick={() => handleAddtoCart(product)}
                >
                  +
                </Button>
              </div>
            )
          })}

          <div className="flex justify-between mt-4 pt-2 ">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-lg font-bold">{total} SAR</span>
            {state.cart.length > 0 && <Button onClick={handleCheckoutpage}>Checkout</Button>}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}


<div className="max-w-2xl mx-auto p-4 md:p-6">
<div className="border rounded-lg overflow-hidden backdrop-blur-md">
  <div className="bg-[#E7D4FF] px-4 py-3 border-b">
    <h2 className="text-lg font-semibold text-[#464646]">Shopping Cart</h2>
  </div>
  <div className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4 p-4">
      <img
        alt="Product Image"
        className="rounded-md object-cover"
        height={80}
        src="/placeholder.svg"
        style={{
          aspectRatio: "80/80",
          objectFit: "cover",
        }}
        width={80}
      />
      <div className="grid gap-1">
        <h3 className="font-medium text-[#464646]">Cozy Blanket</h3>
        <p className="text-[#464646] dark:text-gray-400 text-sm">Warm and Soft for Chilly Nights</p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <MinusIcon className="w-4 h-4 text-[#464646]" />
        </Button>
        <span className="text-base font-medium text-[#464646]">2</span>
        <Button size="icon" variant="ghost">
          <PlusIcon className="w-4 h-4 text-[#464646]" />
        </Button>
      </div>
    </div>
    <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4 p-4">
      <img
        alt="Product Image"
        className="rounded-md object-cover"
        height={80}
        src="/placeholder.svg"
        style={{
          aspectRatio: "80/80",
          objectFit: "cover",
        }}
        width={80}
      />
      <div className="grid gap-1">
        <h3 className="font-medium text-[#464646]">Autumn Mug</h3>
        <p className="text-[#464646] dark:text-gray-400 text-sm">Enjoy Your Hot Beverages in Style</p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <MinusIcon className="w-4 h-4 text-[#464646]" />
        </Button>
        <span className="text-base font-medium text-[#464646]">1</span>
        <Button size="icon" variant="ghost">
          <PlusIcon className="w-4 h-4 text-[#464646]" />
        </Button>
      </div>
    </div>
    <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4 p-4">
      <img
        alt="Product Image"
        className="rounded-md object-cover"
        height={80}
        src="/placeholder.svg"
        style={{
          aspectRatio: "80/80",
          objectFit: "cover",
        }}
        width={80}
      />
      <div className="grid gap-1">
        <h3 className="font-medium text-[#464646]">Fall Fragrance Candle</h3>
        <p className="text-[#464646] dark:text-gray-400 text-sm">Fill Your Space with a Cozy Scent</p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <MinusIcon className="w-4 h-4 text-[#464646]" />
        </Button>
        <span className="text-base font-medium text-[#464646]">1</span>
        <Button size="icon" variant="ghost">
          <PlusIcon className="w-4 h-4 text-[#464646]" />
        </Button>
      </div>
    </div>
  </div>
  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-t">
    <div className="flex justify-between items-center">
      <span className="text-base font-medium text-[#464646]">Total</span>
      <span className="text-2xl font-bold text-[#464646]">$89.97</span>
    </div>
  </div>
</div>
<div className="mt-4 flex justify-end">
  <Button className="bg-[#E7D4FF] hover:bg-[#d4b9ff] text-gray-900" size="lg">
    Checkout
  </Button>
</div>
</div>
