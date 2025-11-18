'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGlobe, FiChevronDown } from 'react-icons/fi'
import { Locale } from '@/lib/i18n/translations'

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
]

export default function LanguageSwitcher({ className = '', variant = 'dark' }: { className?: string; variant?: 'dark' | 'light' }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // Extraire la locale actuelle du pathname
  const currentLocale = (pathname?.split('/')[1] as Locale) || 'fr'
  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0]
  
  const isDark = variant === 'dark'

  const switchLanguage = (locale: Locale) => {
    if (locale === currentLocale) {
      setIsOpen(false)
      return
    }

    // Remplacer la locale dans le pathname
    const segments = pathname?.split('/').filter(Boolean) || []
    
    // Si on est déjà sur une route avec locale
    if (segments[0] === 'fr' || segments[0] === 'en') {
      segments[0] = locale
    } else {
      // Sinon, ajouter la locale au début
      segments.unshift(locale)
    }

    // S'assurer qu'on a au moins la locale
    if (segments.length === 0 || (segments[0] !== 'fr' && segments[0] !== 'en')) {
      segments.unshift(locale)
    }

    const newPath = `/${segments.join('/')}`
    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          isDark 
            ? 'bg-white/10 hover:bg-white/20 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        aria-label={currentLocale === 'fr' ? 'Changer de langue' : 'Change language'}
      >
        <FiGlobe className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">{currentLanguage.flag}</span>
        <span className="text-xs font-medium hidden md:inline">{currentLanguage.code.toUpperCase()}</span>
        <FiChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[150px] z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-2 ${
                    currentLocale === lang.code ? 'bg-gold-50 text-gold-600' : 'text-gray-700'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

