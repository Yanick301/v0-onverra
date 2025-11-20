"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { getProductsByCategory, PRODUCTS } from "../../../services/mockData"
import { ProductCard } from "../../../components/Product/ProductCard"
import { useLanguage } from "../../../context/LanguageContext"

export default function ProductListing() {
  const params = useParams()
  const categoryId = params.categoryId as string
  const { t } = useLanguage()

  const products = useMemo(() => {
    if (!categoryId) return PRODUCTS
    if (categoryId === "winter" || categoryId === "christmas") {
      return PRODUCTS.filter((p) => p.category === "accessories" || p.category === "men") // Mock logic for demo
    }
    return getProductsByCategory(categoryId)
  }, [categoryId])

  const title = categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : "Collection"

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 container mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 capitalize">{title}</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore our curated selection of {title.toLowerCase()}. Defined by exquisite craftsmanship and modern
          aesthetics.
        </p>
      </div>

      {/* Filters (Visual only for demo) */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <div className="flex space-x-6">
          <span className="text-sm uppercase cursor-pointer hover:text-accent">Filter +</span>
          <span className="text-sm uppercase cursor-pointer hover:text-accent">Sort By +</span>
        </div>
        <span className="text-sm text-gray-500">{products.length} items</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
