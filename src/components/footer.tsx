import { Phone } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-[#E7D4FF] text-[#464646] p-6 md:py-12 w-full">
      <div className="container max-w-7xl flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <Phone />
          <p>800-200-4555</p>
        </div>
        <p className="text-sm">© 2024 EasyPlate. All rights reserved.</p>
      </div>
    </footer>
  )
}
