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
import { Button } from "./ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"

export function NavBar() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing")
  const { state, handleRemoveUser } = context

  const handleLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    handleRemoveUser()
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6">
      <div className="flex items-center gap-2">
        <img src="/images/EasyPlate1.png" width="150" height="150" alt="" />
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
          Home
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="/productspage">
          Products
        </Link>
        {state.user?.role === ROLE.Admin && (
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/dashboard">
            Dashboard
          </Link>
        )}
        {!state.user && (
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/signup">
            Signup
          </Link>
        )}
        {!state.user && (
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/login">
            Login
          </Link>
        )}
        {state.user && (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            onClick={handleLogout}
            to="/"
          >
            {" "}
            Logout
          </Link>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <AlignJustify className="h-6 w-6" />
            <span className="sr-only">navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-6 p-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
              Home
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              to="/productspage"
            >
              Products
            </Link>
            {state.user?.role === ROLE.Admin && (
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                to="/dashboard"
              >
                Dashboard
              </Link>
            )}
            {!state.user && (
              <Link className="text-sm font-medium hover:underline underline-offset-4" to="/login">
                Login
              </Link>
            )}
            {!state.user && (
              <Link className="text-sm font-medium hover:underline underline-offset-4" to="/signup">
                Signup
              </Link>
            )}
            {state.user && (
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={handleLogout}
                to="/"
              >
                {" "}
                Logout
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Cart />
    </header>
  )
}
