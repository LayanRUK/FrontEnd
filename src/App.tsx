import "./App.css"
import { Dashboard } from "./pages/dashboard"
import { ProductsPage } from "./pages/productspage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { DecodedUser, Product } from "./types"
import { useState, createContext, useEffect } from "react"
import { ProductDetails } from "./pages/productDetails"
import { LogIn } from "./pages/login"
import { SignUp } from "./pages/signup"
import { PrivateRoute } from "./components/privateRoute"
import { Home } from "./pages/home"



const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path: "/login",
    element: <LogIn/>
  },{
    path: "/signup",
    element: <SignUp/>
  },

  {
    path: "/dashboard",
    element:<PrivateRoute>
      <Dashboard />
    </PrivateRoute> 
  },
  {
    path: "/Product/:name",
    element: <ProductDetails />
  },
  
  {
    path: "/productspage",
    element: <ProductDetails />
  }

])

type GlobalContextType = {
  state: GlobalState
  handleAddtoCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
}
type GlobalState = {
  cart: Product[]
 user:DecodedUser |null
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
 
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user : null
  })
useEffect(()=>{
const user =localStorage.getItem("user")
if (user){
  const decodedUser=JSON.parse(user)
setState({
  ...state,
  user:decodedUser
})}
},[])
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
const handleStoreUser=(user:DecodedUser)=>{
  setState({
...state,
user
  })

}
 
  return (
    <div>
      <GlobalContext.Provider value={{ state, handleAddtoCart, handleDeleteFromCart , handleStoreUser }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )

}
export default App
