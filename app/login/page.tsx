"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useShop } from "../../context/ShopContext"
import { useLanguage } from "../../context/LanguageContext"
import { Button } from "../../components/UI/Button"
import { translations } from "../../i18n/translations"

export default function Login() {
  const { login } = useShop()
  const { language } = useLanguage()
  const router = useRouter()
  const t = translations[language] as any // Helper cast

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const success = login(email, password)
    if (success) {
      router.push("/profile")
    } else {
      setError(t.auth.error)
    }
  }

  return (
    <div className="pt-40 pb-20 container mx-auto px-4 flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-serif text-center mb-8 uppercase tracking-widest">{t.auth.loginTitle}</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl border border-gray-100">
          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 mb-6 text-center border border-red-100">{error}</div>
          )}

          <div className="mb-6">
            <label className="block text-xs font-bold uppercase mb-2 text-gray-500">{t.auth.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors"
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold uppercase mb-2 text-gray-500">{t.auth.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" fullWidth className="mb-6">
            {t.auth.submitLogin}
          </Button>

          <div className="text-center">
            <Link
              href="/register"
              className="text-sm text-gray-500 hover:text-black underline decoration-gray-300 hover:decoration-black transition-all"
            >
              {t.auth.noAccount}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
