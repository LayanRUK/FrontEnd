import { NavBar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function CheckoutPage() {
  const location = useLocation()
  const { state } = location
  const total = state ? state.total : 0

  return (
    <div>
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
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between"></div>
              </div>
              <Separator />
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div>Subtotal</div>
                  <div>{total} SAR</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Delivery Fee</div>
                  <div>Free</div>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <div>Total</div>
                  <div>{total} SAR</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent className="flex  items-center ml-44 ">
              <RadioGroup className="grid " defaultValue="card">
                <div>
                  <RadioGroupItem className="  peer sr-only " id="card" value="card" />
                  <Label
                    className=" flex flex-col items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50"
                    htmlFor="card"
                  >
                    Pay on Delivery
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Phone number</Label>
                <Input id="phone" placeholder="123 456 789" type="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Riyadh " />
              </div>
            </CardContent>
          </Card>
          <Link to="/confirmationpage">
            <Button className="bg-[#E7D4FF] text-[#464646] hover:bg-[#E7D4FF]/90 focus-visible:ring-[#E7D4FF] font-bold">
              Place Order
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
