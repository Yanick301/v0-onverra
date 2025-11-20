"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useShop } from "../../context/ShopContext"
import { useLanguage } from "../../context/LanguageContext"
import { Button } from "../../components/UI/Button"
import { translations } from "../../i18n/translations"
import { Package, LogOut, UserIcon } from "lucide-react"

export default function Profile() {
  const { user, logout } = useShop()
  const { language } = useLanguage()
  const router = useRouter()
  const t = translations[language] as any

  React.useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 md:px-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif">
          {t.auth.welcome}, {user.name.split(" ")[0]}
        </h1>
        <button
          onClick={() => {
            logout()
            router.push("/")
          }}
          className="flex items-center text-sm uppercase font-bold text-gray-500 hover:text-black mt-4 md:mt-0 transition-colors"
        >
          <LogOut size={18} className="mr-2" /> {t.common.logout}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* User Info */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mr-4">
                <UserIcon size={24} />
              </div>
              <h3 className="text-xl font-serif">{t.auth.accountDetails}</h3>
            </div>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Name</label>
                <p>{user.name}</p>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Email</label>
                <p>{user.email}</p>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Member Since</label>
                <p>Winter 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order History (Mocked) */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-serif mb-6 flex items-center">
            <Package size={24} className="mr-3" /> {t.auth.orderHistory}
          </h3>

          <div className="space-y-6">
            {/* Mock Order 1 */}
            <div className="border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition-shadow">
              <div className="mb-4 md:mb-0">
                <span className="text-xs font-bold uppercase text-green-600 mb-1 block">Delivered</span>
                <h4 className="font-bold">Order #EZ-8823</h4>
                <p className="text-sm text-gray-500">October 24, 2024</p>
              </div>
              <div className="text-right mb-4 md:mb-0">
                <p className="font-bold">€450.00</p>
                <p className="text-sm text-gray-500">3 items</p>
              </div>
              <Button variant="outline" className="text-xs py-2 bg-transparent">
                View Details
              </Button>
            </div>

            {/* Mock Order 2 */}
            <div className="border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition-shadow">
              <div className="mb-4 md:mb-0">
                <span className="text-xs font-bold uppercase text-gray-400 mb-1 block">Processing</span>
                <h4 className="font-bold">Order #EZ-9102</h4>
                <p className="text-sm text-gray-500">Today</p>
              </div>
              <div className="text-right mb-4 md:mb-0">
                <p className="font-bold">€120.00</p>
                <p className="text-sm text-gray-500">1 item</p>
              </div>
              <Button variant="outline" className="text-xs py-2 bg-transparent">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
