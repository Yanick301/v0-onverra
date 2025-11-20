import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google"
import "../styles/globals.css"
import { Providers } from "./providers"
import { Header } from "../components/Layout/Header"
import { Footer } from "../components/Layout/Footer"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "EZCENTIALS | Maison de Luxe",
  description: "Curated luxury fashion from the world's most prestigious maisons. Discover timeless elegance.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen bg-white text-black selection:bg-black selection:text-white">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
