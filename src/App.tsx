import "./App.css"
import { Dashboard } from "./pages/dashboard"
import { Home } from "./pages/home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Product } from "./types"
import { useState, createContext } from "react"
import { ProductDetails } from "./pages/productDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/Product/:name",
    element: <ProductDetails />
  }
])

type GlobalContextType = {
  state: GlobalState
  handleAddtoCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
}
type GlobalState = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })

  const handleAddtoCart = (product: Product) => {
    const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    if (isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handleDeleteFromCart = (id: string) => {
    const filterdCart = state.cart.filter((item) => item.id !== id)
    setState({
      ...state,
      cart: filterdCart
    })
  }
  return (
    <div>
      <GlobalContext.Provider value={{ state, handleAddtoCart, handleDeleteFromCart }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App
