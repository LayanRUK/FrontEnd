import { NavBar } from "@/components/navbar"
import { CircleCheckIcon } from "lucide-react"
import { Link } from "react-router-dom"

export function ConfirmationPage() {
  return (
    <div>
      <NavBar />
      <div className="page-bannerImage-container">
        <img src="/images/purple-back.png" alt="" />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen  dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
            <div className="flex flex-col items-center space-y-4">
              <CircleCheckIcon color="#E7D4FF" className="w-16 h-16" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Thank you for your order!
              </h1>
              <div className="text-gray-600 dark:text-gray-400">
                <p>Order #12345</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-#464646 bg-[#E7D4FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
