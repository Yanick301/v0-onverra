"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useShop } from "../../context/ShopContext"
import { useLanguage } from "../../context/LanguageContext"
import { Button } from "../../components/UI/Button"
import { translations } from "../../i18n/translations"

export default function Register() {
  const { register } = useShop()
  const { language } = useLanguage()
  const router = useRouter()
  const t = translations[language] as any

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match") // Simple fallback if translation missing for this specific case
      return
    }

    const success = register(name, email, password)
    if (success) {
      router.push("/profile")
    } else {
      setError("User already exists")
    }
  }

  return (
    <div className="pt-40 pb-20 container mx-auto px-4 flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-serif text-center mb-8 uppercase tracking-widest">{t.auth.registerTitle}</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl border border-gray-100">
          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 mb-6 text-center border border-red-100">{error}</div>
          )}

          <div className="mb-6">
            <label className="block text-xs font-bold uppercase mb-2 text-gray-500">{t.auth.fullName}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold uppercase mb-2 text-gray-500">{t.auth.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold uppercase mb-2 text-gray-500">{t.auth.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors"
            />
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold uppercase mb-2 text-gray-500">{t.auth.confirmPassword}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors"
            />
          </div>

          <Button type="submit" fullWidth className="mb-6">
            {t.auth.submitRegister}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-gray-500 hover:text-black underline decoration-gray-300 hover:decoration-black transition-all"
            >
              {t.auth.hasAccount}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
