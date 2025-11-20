"use client"

import type React from "react"
import Link from "next/link"
import { useLanguage } from "../../context/LanguageContext"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export const Footer: React.FC = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6 tracking-widest">EZCENTIALS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Defining luxury for the modern era. Our collections blend timeless elegance with contemporary design,
              ensuring you always look your best.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6 uppercase tracking-wider text-accent">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">
                <Link href="/category/men">{t.nav.men}</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/category/women">{t.nav.women}</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/category/accessories">{t.nav.accessories}</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/category/winter">{t.nav.winter}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6 uppercase tracking-wider text-accent">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">{t.nav.about}</li>
              <li className="hover:text-white cursor-pointer">{t.nav.contact}</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Press</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6 uppercase tracking-wider text-accent">Follow Us</h4>
            <div className="flex space-x-4 text-gray-400 mb-6">
              <Instagram className="hover:text-white cursor-pointer" />
              <Facebook className="hover:text-white cursor-pointer" />
              <Twitter className="hover:text-white cursor-pointer" />
              <Youtube className="hover:text-white cursor-pointer" />
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">Subscribe to our newsletter</p>
              <div className="flex mt-2 border-b border-gray-700">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent w-full py-2 outline-none text-sm"
                />
                <button className="text-accent text-sm uppercase font-bold">Join</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; 2025 EZCENTIALS. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Shipping Info</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
