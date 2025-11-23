'use client'

import { motion } from 'framer-motion'
import ProductCard from '@/components/product/ProductCard'
import { useTranslation } from '@/lib/i18n/useTranslation'

const getBaseUrl = (locale: string) => {
  // Pour la version anglaise, ne pas inclure /en/ dans les URLs externes
  if (locale === 'en') {
    return 'https://shop.eringerswitzerland.ch'
  }
  return `https://shop.eringerswitzerland.ch/${locale}`
}

const productUrlMap: Record<string, Record<string, string>> = {
  'serum-anti-cernes': {
    fr: '/products/serum-contour-anti-cernes-anti-poches',
    en: '/products/serum-contour-anti-cernes-anti-poches',
  },
  'creme-eclat': {
    fr: '/products/creme-visage-eclat-peaux-mixtes',
    en: '/products/creme-visage-eclat-peaux-mixtes',
  },
  'serum-perles': {
    fr: '/products/serum-perles-actives-anti-pollution',
    en: '/products/serum-perles-actives-anti-pollution',
  },
  'masque-anti-age': {
    fr: '/products/masque-anti-age',
    en: '/products/masque-anti-age',
  },
  'lotion-nettoyante': {
    fr: '/products/demaquillants-nettoyants',
    en: '/products/demaquillants-nettoyants',
  },
  'gel-anti-cellulite': {
    fr: '/products/raffermissant-sculptant',
    en: '/products/raffermissant-sculptant',
  },
}

const getBestSellers = (baseUrl: string, translations: any, locale: string) => {
  const getProductData = (productKey: string) => {
    const product = translations.products?.[productKey] || {}
    const urlPath = productUrlMap[productKey]?.[locale] || '/collections/all'
    return {
      name: product.name || '',
      description: product.description || '',
      tags: product.tags || [],
      productUrl: `${baseUrl}${urlPath}`,
    }
  }

  return [
    {
      id: '10',
      ...getProductData('serum-anti-cernes'),
      price: 45,
      image: '/images/serum-anti-cernes.png',
      hoverVideo: '/videos/serum-anti-cernes.mp4',
      badge: translations.common?.bestSeller || 'Best Seller',
    },
    {
      id: '8',
      ...getProductData('creme-eclat'),
      price: 59,
      image: '/images/creme-visage-eclat.png',
      hoverVideo: '/videos/creme-visage.mp4',
      badge: translations.common?.bestSeller || 'Best Seller',
    },
    {
      id: '14',
      ...getProductData('serum-perles'),
      price: 89,
      image: '/images/product2.png',
      hoverVideo: '/videos/product2-2.mp4',
      badge: translations.common?.bestSeller || 'Best Seller',
    },
    {
      id: '7',
      ...getProductData('masque-anti-age'),
      price: 89,
      image: '/images/masque-anti-age.png',
      hoverVideo: '/videos/masque-anti-age.mp4',
      badge: translations.common?.bestSeller || 'Best Seller',
    },
    {
      id: '5',
      ...getProductData('lotion-nettoyante'),
      price: 29,
      image: '/images/lotion-nettoyante-3.png',
      hoverVideo: '/videos/lotion-nettoyante-3.mp4',
      badge: translations.common?.bestSeller || 'Best Seller',
    },
    {
      id: '3',
      ...getProductData('gel-anti-cellulite'),
      price: 79,
      image: '/images/gel-anti-cellulite-2.png',
      hoverVideo: '/videos/gel-anti-cellulite-3.mp4',
      badge: translations.common?.bestSeller || 'Best Seller',
    },
  ]
}

export default function BestSellersSection() {
  const { t, locale, translations } = useTranslation()
  const baseUrl = getBaseUrl(locale)
  const bestSellers = getBestSellers(baseUrl, translations, locale)

  return (
    <section className="py-10 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto px-4 lg:px-8 max-w-[960px]">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm text-gold-600 font-medium tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('sections.bestSellersSubtitle')}
          </motion.p>
          <motion.h2
            className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('sections.bestSellers')}
          </motion.h2>
        </motion.div>

        {/* Products Grid - 2 rows of 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 products-grid-landscape">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
