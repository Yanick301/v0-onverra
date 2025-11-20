"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "../context/LanguageContext"
import { BRANDS, getFeaturedProducts } from "../services/mockData"
import { ProductCard } from "../components/Product/ProductCard"
import { Button } from "../components/UI/Button"
import { ArrowRight, ArrowDown } from "lucide-react"
import { translations } from "../i18n/translations"
import { useRef } from "react"

const useExtendedTranslation = () => {
  const { language } = useLanguage()
  return translations[language] as any
}

export default function Home() {
  const t = useExtendedTranslation()
  const featuredProducts = getFeaturedProducts()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1])
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0])
  const textY = useTransform(smoothProgress, [0, 0.3], [0, 100])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden" ref={containerRef}>
      {/* HERO SECTION - Cinematic & Immersive */}
      <section className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0 z-0" style={{ scale: heroScale, opacity: heroOpacity }}>
          <div className="absolute inset-0 bg-black/20 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
          >
            {/* Using a placeholder video or image if video fails */}
            <source
              src="https://videos.pexels.com/video-files/3756003/3756003-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
          </video>
        </motion.div>

        <motion.div
          className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto mt-20 md:mt-0"
          style={{ y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-[10px] md:text-xs tracking-[0.3em] uppercase backdrop-blur-md">
              {t.hero.badge}
            </span>
          </motion.div>

          <h1 className="font-serif text-[14vw] md:text-[9vw] leading-[0.85] tracking-tighter mb-8 mix-blend-overlay opacity-90">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                EZCENTIALS
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-sm md:text-lg font-light tracking-widest uppercase text-white/80 max-w-lg mx-auto mb-12"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Link href="/category/women">
              <Button className="bg-white text-black hover:bg-white/90 rounded-full px-10 py-6 text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:px-12">
                {t.hero.cta}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 animate-bounce"
        >
          <ArrowDown size={24} strokeWidth={1} />
        </motion.div>
      </section>

      {/* EDITORIAL STATEMENT - "Closet Creations" Style */}
      <section className="py-32 md:py-48 px-4 bg-background">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] md:leading-[1.1] text-foreground mb-12 text-balance"
          >
            "Optimal organization meets <span className="italic text-accent">exquisite design</span>. Transform your
            wardrobe into a functional work of art."
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase border-b border-foreground/20 pb-1 hover:border-foreground transition-colors"
            >
              {t.editorial.btn} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ASYMMETRICAL CATEGORY GRID - "Casa Portufornia" Style */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 auto-rows-[400px] md:auto-rows-[600px]">
            {/* Women - Large Feature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 relative group overflow-hidden bg-secondary"
            >
              <Link href="/category/women" className="block h-full w-full">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80"
                  alt="Women"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-xs tracking-[0.3em] uppercase mb-2 opacity-80">Collection 2025</p>
                  <h3 className="font-serif text-5xl md:text-6xl italic">{t.categories.women.title}</h3>
                </div>
              </Link>
            </motion.div>

            {/* Men - Tall Vertical */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-4 relative group overflow-hidden bg-secondary"
            >
              <Link href="/category/men" className="block h-full w-full">
                <img
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80"
                  alt="Men"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute top-8 right-8 text-white text-right">
                  <h3 className="font-serif text-4xl md:text-5xl">{t.categories.men.title}</h3>
                  <p className="text-xs tracking-[0.3em] uppercase mt-2 opacity-80">Timeless</p>
                </div>
              </Link>
            </motion.div>

            {/* Accessories - Wide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-6 relative group overflow-hidden bg-secondary md:h-[400px]"
            >
              <Link href="/category/accessories" className="block h-full w-full">
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
                  alt="Accessories"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-8 right-8 text-white text-right">
                  <h3 className="font-serif text-4xl">{t.categories.accessories.title}</h3>
                </div>
              </Link>
            </motion.div>

            {/* Winter - Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-6 relative group overflow-hidden bg-secondary md:h-[400px]"
            >
              <Link href="/category/winter" className="block h-full w-full">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                  alt="Winter"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <h3 className="font-serif text-5xl italic">{t.categories.winter.title}</h3>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARQUEE - Subtle & Elegant */}
      <section className="py-20 bg-foreground text-background overflow-hidden">
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex gap-16 md:gap-32 items-center">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
              <span
                key={idx}
                className="text-4xl md:text-6xl font-serif opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS - Clean Carousel */}
      <section className="py-32 px-4 bg-background">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">{t.newArrivals.title}</h2>
              <p className="text-muted-foreground max-w-md">{t.newArrivals.desc}</p>
            </div>
            <Link href="/category/women">
              <Button
                variant="outline"
                className="hidden md:flex rounded-full px-8 border-foreground/20 bg-transparent"
              >
                {t.newArrivals.viewAll}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center md:hidden">
            <Link href="/category/women">
              <Button variant="outline" className="rounded-full px-8 w-full border-foreground/20 bg-transparent">
                {t.newArrivals.viewAll}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER - Minimalist */}
      <section className="py-32 bg-secondary/30">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">{t.newsletter.title}</h2>
          <p className="text-muted-foreground mb-10">{t.newsletter.desc}</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder={t.newsletter.placeholder}
              className="flex-1 bg-transparent border-b border-foreground/20 py-3 px-0 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors rounded-none"
            />
            <Button className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-8">
              {t.newsletter.btn}
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
