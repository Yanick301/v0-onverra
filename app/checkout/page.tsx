"use client"

import { useState } from "react"
import { useShop } from "../../context/ShopContext"
import { Button } from "../../components/UI/Button"
import { CheckCircle } from "lucide-react"

export default function Checkout() {
  const { cartTotal, clearCart } = useShop()
  const [step, setStep] = useState<"shipping" | "payment" | "success">("shipping")
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("success")
      clearCart()
    }, 2000)
  }

  if (step === "success") {
    return (
      <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-4xl font-serif mb-4">Thank You!</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Your order #EZ-8823 has been placed successfully. You will receive an email confirmation shortly.
        </p>
        <Button onClick={() => (window.location.href = "/")}>Return Home</Button>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 md:px-8 min-h-screen max-w-4xl">
      <h1 className="text-3xl font-serif mb-12 text-center uppercase tracking-widest">Checkout</h1>

      <div className="flex gap-8 flex-col md:flex-row">
        <div className="flex-1">
          {/* Step Indicators */}
          <div className="flex mb-8 text-sm border-b border-gray-200 pb-4">
            <span className={`font-bold mr-6 ${step === "shipping" ? "text-black" : "text-gray-400"}`}>
              1. Shipping
            </span>
            <span className={`font-bold ${step === "payment" ? "text-black" : "text-gray-400"}`}>2. Payment</span>
          </div>

          {step === "shipping" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border p-3 w-full outline-none focus:border-black"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border p-3 w-full outline-none focus:border-black"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="border p-3 w-full outline-none focus:border-black"
              />
              <input type="text" placeholder="Address" className="border p-3 w-full outline-none focus:border-black" />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="border p-3 w-full outline-none focus:border-black col-span-1"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="border p-3 w-full outline-none focus:border-black col-span-1"
                />
                <select className="border p-3 w-full outline-none focus:border-black col-span-1 bg-white">
                  <option>Germany</option>
                  <option>France</option>
                  <option>UK</option>
                </select>
              </div>
              <Button fullWidth onClick={() => setStep("payment")}>
                Continue to Payment
              </Button>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border p-4 rounded bg-gray-50 mb-6">
                <h3 className="font-bold mb-2">Credit Card (Stripe Secure)</h3>
                <div className="bg-white p-3 border rounded mb-3">
                  <span className="text-gray-400 text-sm">Card Number</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 border rounded">
                    <span className="text-gray-400 text-sm">MM / YY</span>
                  </div>
                  <div className="bg-white p-3 border rounded">
                    <span className="text-gray-400 text-sm">CVC</span>
                  </div>
                </div>
              </div>
              <Button fullWidth onClick={handlePayment} disabled={isLoading}>
                {isLoading ? "Processing..." : `Pay €${cartTotal.toFixed(2)}`}
              </Button>
              <button
                onClick={() => setStep("shipping")}
                className="text-sm underline text-gray-500 mt-4 block text-center"
              >
                Back to Shipping
              </button>
            </div>
          )}
        </div>

        {/* Mini Summary */}
        <div className="w-full md:w-80 bg-gray-50 p-6 h-fit">
          <h3 className="font-serif font-bold mb-4 uppercase">Total</h3>
          <div className="flex justify-between mb-2 text-sm">
            <span>Subtotal</span>
            <span>€{cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-sm">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>€{cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
