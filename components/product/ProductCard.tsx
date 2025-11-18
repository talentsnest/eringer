'use client'

import { useRef, useState, useEffect, memo, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiShoppingCart } from 'react-icons/fi'
import { handleTrackedClick } from '@/lib/analytics'

const baseUrl = 'https://eringerswitzerland.com/fr'

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  image: string
  badge?: string
  hoverVideo?: string
  tags?: string[]
  productUrl?: string
}

const ProductCard = memo(function ProductCard({
  id,
  name,
  description,
  price,
  image,
  badge,
  hoverVideo,
  tags = [],
  productUrl,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    setMousePosition({ x, y })
  }, [])

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Intersection Observer config mémorisé
  const observerConfig = useMemo(() => ({
    threshold: 0.5,
    rootMargin: '0px',
  }), [])

  // Précharger la vidéo quand la carte est proche du viewport (desktop)
  useEffect(() => {
    if (!hoverVideo || isMobile || !cardRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && !isVideoReady) {
            // Précharger la vidéo quand la carte est visible
            setIsVideoLoading(true)
            videoRef.current.load()
          }
        })
      },
      { threshold: 0.1, rootMargin: '200px' } // Précharger 200px avant d'entrer dans le viewport
    )

    const currentCard = cardRef.current
    observer.observe(currentCard)

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard)
      }
    }
  }, [hoverVideo, isMobile, isVideoReady])

  // Intersection Observer pour détecter la visibilité sur mobile
  useEffect(() => {
    if (!hoverVideo || !isMobile || !cardRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (videoRef.current) {
              setIsVideoLoading(true)
              videoRef.current.load()
              videoRef.current.currentTime = 0
              videoRef.current.play().catch(() => {})
            }
          } else {
            setIsVisible(false)
            if (videoRef.current) {
              videoRef.current.pause()
              videoRef.current.currentTime = 0
            }
          }
        })
      },
      observerConfig
    )

    const currentCard = cardRef.current
    observer.observe(currentCard)

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard)
      }
    }
  }, [hoverVideo, isMobile, observerConfig])

  return (
    <motion.div
      ref={cardRef}
      className="group relative cursor-hover"
      onMouseEnter={() => {
        if (!isMobile) {
          setIsHovered(true)
          if (hoverVideo && videoRef.current) {
            if (!isVideoReady) {
              setIsVideoLoading(true)
              videoRef.current.load()
            }
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(() => {})
          }
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
        setIsHovered(false)
        if (hoverVideo && videoRef.current) {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
          }
        }
      }}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3 }}
    >
      <a
        href={productUrl || `${baseUrl}/collections/all`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => handleTrackedClick(e, productUrl || `${baseUrl}/collections/all`, name, 'product')}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-square">
          {/* Badge */}
          {badge && (
            <motion.div
              className="absolute top-4 left-4 z-10 px-4 py-2 bg-gold-500 text-white text-xs font-medium rounded-full"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              {badge}
            </motion.div>
          )}

          {/* Product Media with Parallax Effect (image -> video on hover) */}
          <motion.div
            className="w-full h-full relative"
            animate={{
              scale: !isMobile && isHovered ? 1.05 : 1,
              x: !isMobile && isHovered ? mousePosition.x : 0,
              y: !isMobile && isHovered ? mousePosition.y : 0,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          >
            {/* Base image - reste visible jusqu'à ce que la vidéo soit prête */}
            <Image
              src={image}
              alt={name}
              fill
              className={`object-cover transition-opacity duration-200 ${
                hoverVideo && (isMobile ? isVisible : isHovered) && isVideoReady ? 'opacity-0' : 'opacity-100'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />

            {/* Hover video - s'affiche seulement quand prête */}
            {hoverVideo && (
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                  (isMobile ? isVisible : isHovered) && isVideoReady ? 'opacity-100' : 'opacity-0'
                }`}
                muted
                playsInline
                preload="metadata"
                loop
                aria-label={`${name} preview video`}
                onLoadedData={() => {
                  setIsVideoReady(true)
                  setIsVideoLoading(false)
                }}
                onCanPlay={() => {
                  setIsVideoReady(true)
                  setIsVideoLoading(false)
                }}
                onError={() => {
                  setIsVideoLoading(false)
                  // En cas d'erreur, on garde l'image visible
                }}
              >
                <source src={hoverVideo} type="video/mp4" />
              </video>
            )}
          </motion.div>

          {/* Overlay with CTA */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: (isMobile || isHovered) ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: (isMobile || isHovered) ? 0 : 20,
              opacity: (isMobile || isHovered) ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-white">
              <p className="text-base font-serif font-bold">{price}.-</p>
            </div>
            <motion.button
              className="p-3 bg-white rounded-full text-gold-600 hover:bg-gold-500 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiShoppingCart className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-gold-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 6).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700 border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </motion.div>
  )
})

export default ProductCard

