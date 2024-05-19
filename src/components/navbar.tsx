import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@radix-ui/react-navigation-menu"
import { Link } from "react-router-dom"
import { Cart } from "./cart"
export function NavBar() {
  return (
    <div className="flex justify-between items-center">
      <h3>Logo</h3>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-10">
          <NavigationMenuItem className="flex">
            <Link to="/docs">
              <NavigationMenuLink className="block">Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex">
            <Link to="/docs">
              <NavigationMenuLink className="block">Dashboard</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex">
            <Link to="/docs">
              <NavigationMenuLink className="block">About us</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Cart />
    </div>
  )
}
