"use client"

import type React from "react"
import { LanguageProvider } from "../context/LanguageContext"
import { ShopProvider } from "../context/ShopContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ShopProvider>{children}</ShopProvider>
    </LanguageProvider>
  )
}
