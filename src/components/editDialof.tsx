import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

export function EditDialog({ product }: { product: Product }) {
  const queryClient = useQueryClient()
  const [updatedProduct, setUpdatedProduct] = useState(product)

  const updateProduct = async () => {
    try {
      const res = await api.patch(`/Product/${product.name}`, updatedProduct)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  console.log("updated product", updatedProduct)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setUpdatedProduct({
      ...updatedProduct,
      name: value
    })
  }

  const handleUpdate = async () => {
    await updateProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={updatedProduct.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpdate}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
