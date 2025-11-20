"use client"

import type React from "react"
import Link from "next/link"
import type { Product } from "../../types"
import { useLanguage } from "../../context/LanguageContext"
import { Heart } from "lucide-react"
import { useShop } from "../../context/ShopContext"

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage()
  const { toggleWishlist, wishlist } = useShop()
  const isWishlisted = wishlist.includes(product.id)

  return (
    <div className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-6">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Secondary Image on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <img
              src={product.images[1] || product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product.id)
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/0 hover:bg-white text-black transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
        >
          <Heart
            size={20}
            fill={isWishlisted ? "currentColor" : "none"}
            className={isWishlisted ? "text-red-500" : "text-black"}
          />
        </button>

        {product.isNew && (
          <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase text-black bg-white px-2 py-1">
            New
          </span>
        )}
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{product.brand}</h3>
          <Link href={`/product/${product.id}`}>
            <h2 className="text-sm font-medium text-foreground hover:underline decoration-1 underline-offset-4 line-clamp-1">
              {product.name}
            </h2>
          </Link>
        </div>
        <p className="text-sm font-medium text-foreground">€{product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}
