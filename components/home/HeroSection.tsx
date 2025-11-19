'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown, FiArrowRight } from 'react-icons/fi'
import { useLoader } from '@/contexts/LoaderContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

const getBaseUrl = (locale: string) => {
  // Pour la version anglaise, ne pas inclure /en/ dans les URLs externes
  if (locale === 'en') {
    return 'https://shop.eringerswitzerland.ch'
  }
  return `https://shop.eringerswitzerland.ch/${locale}`
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHoveredShop, setIsHoveredShop] = useState(false)
  const [isHoveredStory, setIsHoveredStory] = useState(false)
  const { fadeOut } = useLoader()
  const { t, locale } = useTranslation()
  const baseUrl = getBaseUrl(locale)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }, [])

  useEffect(() => {
    // Start animation as soon as fade-out begins
    if (!fadeOut) return

    const animateWords = () => {
      const wordElements = document.querySelectorAll('.word-animate')
      wordElements.forEach((word) => {
        const delay = parseInt(word.getAttribute('data-delay') || '0', 10)
        setTimeout(() => {
          if (word instanceof HTMLElement) {
            word.style.animation = 'word-appear 0.8s ease-out forwards'
          }
        }, delay)
      })
    }
    // Start animation immediately when fade-out begins
    animateWords()
  }, [fadeOut])

  const splitIntoWords = (text: string, baseDelay: number, delayIncrement: number = 150, withGradient: boolean = false) => {
    const words = text.split(' ')
    return words.map((word, index) => (
      <span
        key={index}
        className={`word-animate ${withGradient ? 'bg-gradient-to-r from-gold-300 via-gold-200 to-gold-300 bg-clip-text' : ''}`}
        data-delay={baseDelay + index * delayIncrement}
        style={withGradient ? { WebkitTextFillColor: 'transparent', color: 'transparent' } : {}}
      >
        {word}
        {index < words.length - 1 && '\u00A0'}
      </span>
    ))
  }
  return (
    <section className="relative h-screen hero-landscape flex items-center justify-center overflow-hidden">
      {/* Parallax Background (Video) */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/hero2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/80 to-white" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center pt-[100px] md:pt-0 -mt-48 md:-mt-56 hero-content-landscape">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Subtitle */}
          {/* Temporairement caché */}
          {/* <p className="text-sm lg:text-base text-gold-400 font-medium tracking-[0.3em] uppercase mb-4">
            {splitIntoWords("L'ATTENTE EST TERMINÉE", 0, 80)}
          </p> */}

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            <div className="mb-2">
              {splitIntoWords(t('hero.title1'), 200, 100)}
            </div>
            <div className="mb-2">
              {splitIntoWords(t('hero.title2'), 500, 100, true)}
            </div>
          </h1>

          {/* Description */}
          <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            {splitIntoWords(t('hero.description'), 800, 60)}
          </p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
              <motion.button
              className="group relative px-8 py-4 text-white font-medium border-2 border-gold-500 flex items-center space-x-2 overflow-hidden cursor-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHoveredShop(true)}
              onMouseLeave={() => setIsHoveredShop(false)}
              onClick={() => {
                const productsSection = document.querySelector('[data-section="products"]')
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600"
                animate={{
                  clipPath: isHoveredShop
                    ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                    : 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)',
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'top left' }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 opacity-0"
                animate={{
                  opacity: isHoveredShop ? 1 : 0,
                  x: isHoveredShop ? 0 : '-100%',
                }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              />
              <span className="relative z-10">{t('hero.cta1')}</span>
                <motion.span
                className="relative z-10"
                animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                <FiArrowDown className="w-5 h-5" />
                </motion.span>
              </motion.button>

              <motion.button
              className="relative px-8 py-4 text-white font-medium border-2 border-white/30 overflow-hidden cursor-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHoveredStory(true)}
              onMouseLeave={() => setIsHoveredStory(false)}
              onClick={() => {
                const productsSection = document.querySelector('[data-section="products"]')
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20 backdrop-blur-md"
                animate={{
                  clipPath: isHoveredStory
                    ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                    : 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)',
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'bottom right' }}
              />
              <motion.div
                className="absolute inset-0 bg-white/30 backdrop-blur-md opacity-0"
                animate={{
                  opacity: isHoveredStory ? 1 : 0,
                  x: isHoveredStory ? 0 : '100%',
                }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              />
              <span className="relative z-10">{t('hero.cta2')}</span>
              </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

