'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { useTranslation } from '@/lib/i18n/useTranslation'

const getNavigation = (t: (key: string) => string) => [
  { name: t('nav.hydration'), sectionId: 'hydratation' },
  { name: t('nav.antiAging'), sectionId: 'antiAging' },
  { name: t('nav.cleaning'), sectionId: 'nettoyage' },
  { name: t('nav.body'), sectionId: 'corps' },
  { name: t('nav.giftSets'), sectionId: 'gift-sets' },
  { name: t('nav.bestSellers'), sectionId: 'best-sellers' },
]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const pathname = usePathname()
  const { t } = useTranslation()
  const navigation = getNavigation(t)
  const isHome = pathname?.endsWith('/') || pathname?.split('/').length === 2
  const [logoVersion] = useState(() => Date.now())

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 header-landscape ${
          isScrolled || !isHome
            ? 'bg-black/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center cursor-pointer"
            >
              <img
                src={`/images/logo.png?ts=${logoVersion}`}
                alt="ERINGER SWITZERLAND"
                width={300}
                height={80}
                className={`h-16 w-auto object-contain logo-landscape ${
                  !isScrolled && isHome ? 'brightness-200 invert-0' : ''
                }`}
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center flex-nowrap space-x-4 xl:space-x-8 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="group relative text-xs xl:text-sm font-medium transition-colors duration-300 text-white hover:text-gold-200 whitespace-nowrap cursor-pointer"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-white/80" />
                </button>
              ))}
            </nav>

            {/* Cart, Language & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <LanguageSwitcher className="hidden sm:block" />

              {/* Cart */}
              <motion.button
                className="relative p-2 transition-colors text-white hover:text-gold-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShoppingBag className="w-6 h-6" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-xs rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className="absolute top-20 right-4 left-4 bg-white rounded-2xl shadow-2xl p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        scrollToSection(item.sectionId)
                        setIsMobileMenuOpen(false)
                      }}
                      className="block w-full text-left py-3 text-lg font-medium text-gray-900 hover:text-gold-600 transition-colors"
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
                {/* Language Switcher Mobile */}
                <div className="pt-4 border-t border-gray-200">
                  <LanguageSwitcher variant="light" />
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

