"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, User, Menu, X } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext"
import { useShop } from "../../context/ShopContext"
import { Language } from "../../types"
import { motion, AnimatePresence } from "framer-motion"

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage()
  const { cartCount, user } = useShop()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const pathname = usePathname()

  // Check if we are on the homepage to handle transparency
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Determine header text color based on state
  const headerTextColor = isHome && !isScrolled && !isMenuOpen ? "text-white" : "text-foreground"
  const headerBg =
    isHome && !isScrolled ? "bg-transparent" : "bg-background/90 backdrop-blur-md border-b border-border/50"

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${headerBg} ${headerTextColor}`}>
      <div className="container mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        {/* Mobile Menu Toggle */}
        <button className="md:hidden z-[102] focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation - Left */}
        <nav className="hidden md:flex space-x-8 text-xs font-medium tracking-[0.2em] uppercase">
          <Link href="/category/women" className="hover:opacity-60 transition-opacity">
            {t.nav.women}
          </Link>
          <Link href="/category/men" className="hover:opacity-60 transition-opacity">
            {t.nav.men}
          </Link>
        </nav>

        {/* Logo - Center */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl font-serif font-bold tracking-tighter z-[102]"
        >
          EZCENTIALS
        </Link>

        {/* Icons - Right */}
        <div className="flex items-center space-x-6 z-[102]">
          <nav className="hidden md:flex space-x-8 text-xs font-medium tracking-[0.2em] uppercase mr-4">
            <Link href="/brands" className="hover:opacity-60 transition-opacity">
              {t.nav.brands}
            </Link>
          </nav>

          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center hover:opacity-60 focus:outline-none text-xs uppercase tracking-widest"
            >
              {language}
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-4 w-24 bg-background border border-border shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200">
                {Object.values(Language).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang)
                      setShowLangMenu(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-xs hover:bg-secondary uppercase tracking-wider transition-colors text-foreground"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href={user ? "/profile" : "/login"} className="hover:opacity-60 transition-opacity">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <Link href="/cart" className="relative hover:opacity-60 transition-opacity">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-[90] pt-24 px-4 text-foreground"
          >
            <div className="flex flex-col space-y-8 text-center font-serif">
              {[
                { href: "/category/women", label: t.nav.women },
                { href: "/category/men", label: t.nav.men },
                { href: "/category/accessories", label: t.nav.accessories },
                { href: "/brands", label: t.nav.brands },
              ].map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-4xl font-light hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-8 border-t border-border w-full max-w-xs mx-auto flex flex-col gap-6">
                <Link
                  href={user ? "/profile" : "/login"}
                  className="text-sm tracking-[0.2em] uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user ? t.auth.accountDetails : t.auth.loginTitle}
                </Link>
                <div className="flex justify-center gap-6">
                  {Object.values(Language).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`text-xs uppercase tracking-widest ${language === lang ? "font-bold border-b border-foreground" : "opacity-50"}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
