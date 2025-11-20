"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { getProductById, getFeaturedProducts } from "../../../services/mockData"
import { useShop } from "../../../context/ShopContext"
import { useLanguage } from "../../../context/LanguageContext"
import { Button } from "../../../components/UI/Button"
import { ProductCard } from "../../../components/Product/ProductCard"
import { Star, Truck, ShieldCheck, RotateCcw } from "lucide-react"

export default function ProductDetail() {
  const params = useParams()
  const productId = params.productId as string
  const { addToCart, toggleWishlist, wishlist } = useShop()
  const { t, language } = useLanguage()
  const product = getProductById(productId || "")
  const relatedProducts = getFeaturedProducts().slice(0, 4)

  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [mainImage, setMainImage] = useState<string>("")

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0])
      setSelectedColor(product.colors[0])
      setMainImage(product.images[0])
      window.scrollTo(0, 0)
    }
  }, [product])

  if (!product) return <div className="pt-40 text-center">Product not found</div>

  // Localization logic
  const productName = product.translations?.[language]?.name || product.name
  const productDescription = product.translations?.[language]?.description || product.description
  const isWishlisted = wishlist.includes(product.id)

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img || "/placeholder.svg"}
                alt={`View ${idx}`}
                className={`w-20 h-24 object-cover cursor-pointer border ${mainImage === img ? "border-black" : "border-transparent"}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={mainImage || "/placeholder.svg"}
              alt={productName}
              className="w-full h-auto object-cover bg-gray-100"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:pl-8">
          <span className="text-gray-500 text-sm uppercase tracking-widest mb-2 block">{product.brand}</span>
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">{productName}</h1>

          <div className="flex items-center mb-6">
            <div className="flex text-yellow-500 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-500">
              ({product.reviews} {t.common.reviews})
            </span>
          </div>

          <p className="text-2xl font-bold mb-8">€{product.price.toFixed(2)}</p>

          <div className="prose text-gray-600 mb-8 text-sm leading-relaxed">
            <p>{productDescription}</p>
          </div>

          {/* Selectors */}
          <div className="mb-6">
            <span className="text-xs font-bold uppercase block mb-2">
              {t.common.color}: {selectedColor}
            </span>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border border-gray-300 focus:outline-none ${selectedColor === color ? "ring-2 ring-black ring-offset-2" : ""}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <span className="text-xs font-bold uppercase block mb-2">
              {t.common.size}: {selectedSize}
            </span>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] px-3 py-2 text-sm border transition-all ${selectedSize === size ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:border-black"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mb-10">
            <Button fullWidth onClick={() => addToCart(product, selectedSize, selectedColor)}>
              {t.common.addToCart}
            </Button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 border transition-colors ${isWishlisted ? "border-red-500 text-red-500" : "border-gray-300 hover:border-red-500 hover:text-red-500"}`}
              title={t.product.addToWishlist}
            >
              <React.Fragment>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={isWishlisted ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </React.Fragment>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6 text-center">
            <div className="flex flex-col items-center">
              <Truck size={20} className="mb-2 text-gray-600" />
              <span className="text-xs uppercase text-gray-500">{t.product.freeShipping}</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw size={20} className="mb-2 text-gray-600" />
              <span className="text-xs uppercase text-gray-500">{t.product.returns}</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck size={20} className="mb-2 text-gray-600" />
              <span className="text-xs uppercase text-gray-500">{t.product.securePayment}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="border-t border-gray-200 pt-16">
        <h3 className="text-2xl font-serif text-center mb-12">{t.common.related}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((rp) => (
            <ProductCard key={rp.id} product={rp} />
          ))}
        </div>
      </div>
    </div>
  )
}
