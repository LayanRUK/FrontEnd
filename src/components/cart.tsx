import { Label } from "@radix-ui/react-menubar"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { ShoppingBag, ShoppingCart } from "lucide-react"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing")

  const { state ,handleDeleteFromCart} = context

  const getTotalPrice = () => {
    return state.cart.reduce((total, product) => total + product.price, 0);
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
        <ShoppingBag color="#273BE2" /> 
        <span >({state.cart.length})</span>
        </div>
 
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-white/30 backdrop-blur-md rounded-md shadow-lg border border-gray-300">
        <div>
          {state.cart.length=== 0 &&<p>No items</p>}
          {state.cart.map((product) => {
            return (
           
              <div className="flex items-center mb-4 p-2 border-b border-gray-200" key={product.id}>
              <img src={product.image} className="w-10 h-10 object-contain mr-4" alt={product.name} />
              <h4 className="text-lg font-medium">{product.name}</h4>
              <span className="ml-auto text-sm text-gray-600 mr-4 font-bold">{product.price}</span>
              <Button variant="destructive" onClick={()=>handleDeleteFromCart(product.id)} >X</Button>
            </div>
            );
          })}
          {state.cart.length > 0 && (
            <div className="flex justify-between mt-4 pt-2 border-t border-gray-200">
              <span className="text-lg font-medium">Total:</span>
              <span className="text-lg font-bold">{getTotalPrice()}</span>
            </div>
          )}

        </div>
      </PopoverContent>
    </Popover>
  )
}
