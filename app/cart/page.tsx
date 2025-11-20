"use client"
import Link from "next/link"
import { useShop } from "../../context/ShopContext"
import { useLanguage } from "../../context/LanguageContext"
import { Button } from "../../components/UI/Button"
import { Trash2, Plus, Minus } from "lucide-react"

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop()
  const { t } = useLanguage()

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-serif mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any items yet.</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 md:px-8 min-h-screen">
      <h1 className="text-4xl font-serif mb-12">{t.nav.cart}</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="space-y-8">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex flex-col sm:flex-row gap-6 border-b border-gray-200 pb-8"
              >
                <div className="w-full sm:w-32 h-40 bg-gray-100 shrink-0">
                  <img
                    src={item.images[0] || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <span className="font-bold">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
                    <p className="text-sm text-gray-500">
                      {t.common.size}: {item.selectedSize} | {t.common.color}: {item.selectedColor}
                    </p>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center border border-gray-300">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-gray-100">
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-100">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex items-center text-sm"
                    >
                      <Trash2 size={16} className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-8">
            <h2 className="text-xl font-serif font-bold mb-6 uppercase tracking-wide">Order Summary</h2>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (Estimated)</span>
                <span className="font-medium">€{(cartTotal * 0.19).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-8 flex justify-between items-center">
              <span className="font-bold text-lg">{t.common.total}</span>
              <span className="font-bold text-xl">€{cartTotal.toFixed(2)}</span>
            </div>

            <Link href="/checkout">
              <Button fullWidth>{t.common.checkout}</Button>
            </Link>

            <p className="text-xs text-gray-500 text-center mt-4">
              Secure Checkout powered by Stripe.
              <br />
              Taxes calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
