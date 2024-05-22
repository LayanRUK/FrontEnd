import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@radix-ui/react-navigation-menu"
import { Link } from "react-router-dom"
import { Cart } from "./cart"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { ROLE } from "@/types"


export function NavBar() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing")
    const { state } = context
  console.log("state",state)
  return (
    <div className="flex justify-between items-center">
      <h3>Logo</h3>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-10">
          <NavigationMenuItem className="flex">
            <Link to="/">
              <NavigationMenuLink className="block">Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {state.user?.role===ROLE.Admin&& ( <NavigationMenuItem className="flex">
            <Link to="/dashboard">
              <NavigationMenuLink className="block">Dashboard</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>)}

          {!state.user &&(
          <NavigationMenuItem className="flex">
            <Link to="/signup">
              <NavigationMenuLink className="block">Signup</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>)}

{!state.user &&(
          <NavigationMenuItem className="flex">
            <Link to="/login">
              <NavigationMenuLink className="block">Login</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
)}

        </NavigationMenuList>
      </NavigationMenu>
      <Cart />
    </div>
  )
}
