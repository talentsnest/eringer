'use client'

import { motion } from 'framer-motion'
import { FiInstagram, FiMail } from 'react-icons/fi'
import { SiTiktok, SiLinkedin, SiFacebook } from 'react-icons/si'
import { handleTrackedClick } from '@/lib/analytics'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { useTranslation } from '@/lib/i18n/useTranslation'

const getFooterLinks = (t: (key: string) => string) => ({
  shop: [
    { name: t('nav.hydration'), sectionId: 'hydratation' },
    { name: t('nav.antiAging'), sectionId: 'antiAging' },
    { name: t('nav.cleaning'), sectionId: 'nettoyage' },
    { name: t('nav.body'), sectionId: 'corps' },
    { name: t('nav.bestSellers'), sectionId: 'best-sellers' },
  ],
})

const getBaseUrl = (locale: string) => {
  // Pour la version anglaise, ne pas inclure /en/ dans les URLs externes
  if (locale === 'en') {
    return 'https://eringerswitzerland.ch'
  }
  return `https://eringerswitzerland.ch/${locale}`
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const socialLinks = [
  { icon: FiInstagram, href: 'https://instagram.com/eringer.switzerland', label: 'Instagram' },
  { icon: SiFacebook, href: 'https://facebook.com/eringer.switzerland', label: 'Facebook' },
  { icon: SiLinkedin, href: 'https://linkedin.com/company/eringerswitzerland', label: 'LinkedIn' },
  { icon: SiTiktok, href: 'https://tiktok.com/@eringer.switzerland', label: 'TikTok' },
  { icon: FiMail, href: 'mailto:contact@eringerswitzerland.ch', label: 'Email' },
]

export default function Footer() {
  const { t, locale } = useTranslation()
  const footerLinks = getFooterLinks(t)
  const baseUrl = getBaseUrl(locale)

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                ERINGER
              </span>
              <span className="text-gray-900"> SWITZERLAND</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleTrackedClick(e, social.href, social.label, 'social')}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gold-500 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className="text-gray-600 hover:text-gold-600 transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            {/* Language Switcher */}
            <div className="mt-6">
              <LanguageSwitcher className="inline-block" variant="light" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 lg:px-8 py-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="mb-2">
              © {new Date().getFullYear()} ERINGER Switzerland. {t('footer.copyright')}.
            </p>
            <a
              href="https://talentsnest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:opacity-80 transition-opacity"
            >
              <span className="text-gray-400">Développé avec </span>
              <span className="text-red-500">❤️</span>
              <span className="text-gray-400"> par </span>
              <span className="text-[#800020] font-bold">Talents. Agence Digitale de jeunes Talents</span>
            </a>
          </div>
          <div className="flex space-x-6">
            <a
              href={`${baseUrl}/policies/privacy-policy`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleTrackedClick(e, `${baseUrl}/policies/privacy-policy`, t('footer.privacy'), 'external')}
              className="hover:text-gold-600 transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <a
              href={`${baseUrl}/policies/terms-of-service`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleTrackedClick(e, `${baseUrl}/policies/terms-of-service`, t('footer.terms'), 'external')}
              className="hover:text-gold-600 transition-colors"
            >
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

