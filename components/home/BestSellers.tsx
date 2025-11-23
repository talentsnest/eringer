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

// Mapping des clés de produits vers leurs URLs (les noms sont traduits)
const productUrlMap: Record<string, Record<string, string>> = {
  'masque-hydratant': {
    fr: '/products/masque-hydratant-72h',
    en: '/products/masque-hydratant-72h',
  },
  'lotion-corporelle': {
    fr: '/products/lotion-nourrissante-corps',
    en: '/products/lotion-nourrissante-corps',
  },
  'serum-ultra': {
    fr: '/products/serum-ultra-hydatrant',
    en: '/products/serum-ultra-hydatrant',
  },
  'masque-anti-age': {
    fr: '/products/masque-anti-age',
    en: '/products/masque-anti-age',
  },
  'creme-anti-age': {
    fr: '/products/creme-visage-anti-age',
    en: '/products/creme-visage-anti-age',
  },
  'serum-anti-cernes': {
    fr: '/products/serum-contour-anti-cernes-anti-poches',
    en: '/products/serum-contour-anti-cernes-anti-poches',
  },
  'serum-anti-age': {
    fr: '/products/serum-anti-age',
    en: '/products/serum-anti-age',
  },
  'lotion-nettoyante': {
    fr: '/products/demaquillants-nettoyants',
    en: '/products/demaquillants-nettoyants',
  },
  'gelee-micellaire': {
    fr: '/products/demaquillants-nettoyants-2',
    en: '/products/demaquillants-nettoyants-2',
  },
  'serum-perles': {
    fr: '/products/serum-perles-actives-anti-pollution',
    en: '/products/serum-perles-actives-anti-pollution',
  },
  'gel-anti-cellulite': {
    fr: '/products/raffermissant-sculptant',
    en: '/products/raffermissant-sculptant',
  },
  'stick-levres': {
    fr: '/products/stick-levres',
    en: '/products/stick-levres',
  },
  'creme-eclat': {
    fr: '/products/creme-visage-eclat-peaux-mixtes',
    en: '/products/creme-visage-eclat-peaux-mixtes',
  },
}

const getProductData = (productKey: string, translations: any, locale: string, baseUrl: string) => {
  const product = translations.products?.[productKey] || {}
  const urlPath = productUrlMap[productKey]?.[locale] || '/collections/all'
  
  return {
    id: productKey,
    name: product.name || '',
    description: product.description || '',
    tags: product.tags || [],
    productUrl: `${baseUrl}${urlPath}`,
  }
}

export default function BestSellers() {
  const { t, locale, translations: currentTranslations } = useTranslation()
  const baseUrl = getBaseUrl(locale)

  // Produits avec leurs données statiques (prix, images, vidéos)
  const productConfigs = {
    'masque-hydratant': {
      id: '1',
      price: 55,
      image: '/images/product1.png',
      hoverVideo: '/videos/product1.mp4',
    },
    'creme-eclat': {
      id: '8',
      price: 59,
      image: '/images/creme-visage-eclat.png',
      hoverVideo: '/videos/creme-visage.mp4',
      badge: t('common.bestSeller'),
    },
    'serum-ultra': {
      id: '12',
      price: 55,
      image: '/images/serum-ultra-hydratant.png',
      hoverVideo: '/videos/serum-ultra.mp4',
    },
    'serum-anti-cernes': {
      id: '10',
      price: 45,
      image: '/images/serum-anti-cernes.png',
      hoverVideo: '/videos/serum-anti-cernes.mp4',
      badge: t('common.bestSeller'),
    },
    'serum-perles': {
      id: '14',
      price: 89,
      image: '/images/product2.png',
      hoverVideo: '/videos/product2-2.mp4',
      badge: t('common.bestSeller'),
    },
    'masque-anti-age': {
      id: '7',
      price: 59,
      image: '/images/masque-anti-age.png',
      hoverVideo: '/videos/masque-anti-age.mp4',
      badge: t('common.bestSeller'),
    },
    'creme-anti-age': {
      id: '9',
      price: 69,
      image: '/images/creme-anti-age.png',
      hoverVideo: '/videos/creme-anti-age.mp4',
    },
    'serum-anti-age': {
      id: '17',
      price: 59,
      image: '/images/serum-anti-age.png',
      hoverVideo: '/videos/serum-anti-age.mp4',
    },
    'lotion-nettoyante': {
      id: '5',
      price: 29,
      image: '/images/lotion-nettoyante-3.png',
      hoverVideo: '/videos/lotion-nettoyante-3.mp4',
    },
    'gelee-micellaire': {
      id: '13',
      price: 32,
      image: '/images/gelee-micellaire-3.png',
      hoverVideo: '/videos/gelee-micellaire-3.mp4',
    },
    'gel-anti-cellulite': {
      id: '3',
      price: 59,
      image: '/images/gel-anti-cellulite-2.png',
      hoverVideo: '/videos/gel-anti-cellulite-3.mp4',
    },
    'lotion-corporelle': {
      id: '4',
      price: 39,
      image: '/images/lotion-corporelle.png',
      hoverVideo: '/videos/lotion-corporelle.mp4',
    },
    'stick-levres': {
      id: '6',
      price: 13,
      image: '/images/stick-levres.png',
      hoverVideo: '/videos/stick-levres.mp4',
    },
  }

  const categories = {
    hydratation: ['masque-hydratant', 'creme-eclat', 'serum-ultra', 'serum-anti-cernes', 'serum-perles'],
    antiAging: ['masque-anti-age', 'creme-anti-age', 'serum-anti-age', 'serum-anti-cernes', 'serum-perles'],
    nettoyage: ['lotion-nettoyante', 'gelee-micellaire'],
    corps: ['gel-anti-cellulite', 'lotion-corporelle', 'stick-levres'],
  }

  const categoryNames = {
    hydratation: t('sections.hydration'),
    hydratationSubtitle: t('sections.hydrationSubtitle'),
    antiAging: t('sections.antiAging'),
    antiAgingSubtitle: t('sections.antiAgingSubtitle'),
    nettoyage: t('sections.cleaning'),
    nettoyageSubtitle: t('sections.cleaningSubtitle'),
    corps: t('sections.body'),
    corpsSubtitle: t('sections.bodySubtitle'),
  }

  return (
    <div className="py-10 lg:py-16 bg-white">
      {Object.entries(categories).map(([categoryKey, productKeys], categoryIndex) => {
        const products = productKeys.map((productKey) => {
          const config = productConfigs[productKey as keyof typeof productConfigs]
          const translated = getProductData(productKey, currentTranslations, locale, baseUrl)
          return {
            ...config,
            ...translated,
          }
        })

        const isFullWidth = categoryKey === 'hydratation' || categoryKey === 'antiAging'
        const gridCols = isFullWidth ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

        // Skip rendering nettoyage and corps individually - they'll be rendered together
        if (categoryKey === 'nettoyage' || categoryKey === 'corps') {
          return null
        }

        return (
          <section key={categoryKey} id={categoryKey} className={categoryIndex > 0 ? 'mt-10' : ''}>
            {/* Section Header */}
            <motion.div
              className={`text-center mb-12 ${isFullWidth ? 'px-[30px]' : 'container mx-auto px-4 lg:px-8'}`}
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
                {categoryNames[`${categoryKey}Subtitle` as keyof typeof categoryNames] || categoryNames[categoryKey as keyof typeof categoryNames]}
              </motion.p>
              <motion.h2
                className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {categoryNames[categoryKey as keyof typeof categoryNames]}
              </motion.h2>
            </motion.div>

            {/* Products Grid */}
            <div className={isFullWidth ? 'w-full px-[30px]' : 'container mx-auto px-4 lg:px-8'}>
              <div className={`grid ${gridCols} gap-8 ${isFullWidth ? '' : 'products-grid-landscape'}`}>
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )
      })}
      
      {/* Nettoyage & Corps side by side */}
      <section className="mt-10 w-full px-[30px]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {['nettoyage', 'corps'].map((categoryKey) => {
            const productKeys = categories[categoryKey as keyof typeof categories]
            const products = productKeys.map((productKey) => {
              const config = productConfigs[productKey as keyof typeof productConfigs]
              const translated = getProductData(productKey, currentTranslations, locale, baseUrl)
              return {
                ...config,
                ...translated,
              }
            })

            const colSpan = categoryKey === 'nettoyage' ? 'lg:col-span-2' : 'lg:col-span-3'

            return (
              <div key={categoryKey} id={categoryKey} className={colSpan}>
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
                    {categoryNames[`${categoryKey}Subtitle` as keyof typeof categoryNames] || categoryNames[categoryKey as keyof typeof categoryNames]}
                  </motion.p>
                  <motion.h2
                    className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {categoryNames[categoryKey as keyof typeof categoryNames]}
                  </motion.h2>
                </motion.div>

                {/* Products Grid - Single row on desktop, 1 per row on mobile */}
                <div className="flex flex-col md:flex-row gap-4">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="w-full md:flex-1"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
