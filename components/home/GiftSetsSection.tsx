'use client'

import { motion } from 'framer-motion'
import GiftSetCard from '@/components/product/GiftSetCard'
import { useTranslation } from '@/lib/i18n/useTranslation'

const getBaseUrl = (locale: string) => {
  if (locale === 'en') {
    return 'https://shop.eringerswitzerland.ch'
  }
  return `https://shop.eringerswitzerland.ch/${locale}`
}

// Données des coffrets
const giftSetsData = {
  fr: {
    antiAge: {
      title: 'Coffrets Anti-Âge',
      sets: [
        {
          name: 'Coffret SIGNATURE',
          price: 150,
          url: 'https://shop.eringerswitzerland.ch/fr/products/anti-aging-box-signature',
          products: [
            { name: 'Sérum Gel Anti-Âge Reishi', size: '30 ml', price: 59, description: 'Lisse les rides, fermeté renforcée' },
            { name: 'Masque Anti-Âge Crème (Papaye – Immortelle)', size: '100 ml', price: 59, description: 'Régénère et nourrit en profondeur' },
            { name: 'Gelée Micellaire Thé Vert', size: '100 ml', price: 32, description: 'Nettoie en douceur, antioxydant' },
          ],
        },
        {
          name: 'Coffret PRESTIGE',
          price: 232,
          url: 'https://shop.eringerswitzerland.ch/fr/products/anti-aging-box-prestige',
          products: [
            { name: 'Sérum Gel Anti-Âge Reishi', size: '30 ml', price: 59, description: 'Lisse les rides, fermeté renforcée' },
            { name: 'Crème Visage Anti-Âge Primer', size: '50 ml', price: 69, description: 'Base lissante, effet lifting' },
            { name: 'Masque Anti-Âge Crème (Papaye – Immortelle)', size: '100 ml', price: 59, description: 'Régénère et nourrit en profondeur' },
            { name: 'Sérum Anti-Cernes Grenade', size: '30 ml', price: 45, description: 'Atténue cernes et poches' },
            { name: 'Roller + Gua Sha', size: '', price: null, description: 'Massage drainant, éclat immédiat' },
          ],
        },
      ],
    },
    hydratation: {
      title: 'Coffrets Hydratation',
      sets: [
        {
          name: 'Coffret SIGNATURE',
          price: 139,
          url: 'https://shop.eringerswitzerland.ch/fr/products/moisturizing-box-signature',
          products: [
            { name: 'Masque Hydratant 72h Framboise', size: '100 ml', price: 55, description: 'Recharge en eau et repulpe la peau' },
            { name: 'Sérum Ultra Hydratant Avocat-Vigne', size: '30 ml', price: 55, description: 'Hydratation intensive, texture légère' },
            { name: 'Lotion Nettoyante Aloe Vera', size: '100 ml', price: 29, description: 'Nettoyant apaisant, idéal peaux déshydratées' },
          ],
        },
        {
          name: 'Coffret PRESTIGE',
          price: 214,
          url: 'https://shop.eringerswitzerland.ch/fr/products/moisturizing-box-prestige',
          products: [
            { name: 'Sérum Ultra Hydratant Avocat-Vigne', size: '30 ml', price: 55, description: 'Hydratation intensive, texture légère' },
            { name: 'Crème Éclat Papaye – Criste Marine', size: '50 ml', price: 59, description: 'Éclat et uniformité du teint' },
            { name: 'Masque Hydratant 72h Framboise', size: '100 ml', price: 55, description: 'Recharge en eau et repulpe la peau' },
            { name: 'Sérum Anti-Cernes Grenade', size: '30 ml', price: 45, description: 'Atténue cernes et poches' },
            { name: 'Roller + Gua Sha', size: '', price: null, description: 'Massage drainant, éclat immédiat' },
          ],
        },
      ],
    },
    winter: {
      title: 'Winter Collection',
      sets: [
        {
          name: 'Coffret SIGNATURE',
          price: 145,
          url: 'https://shop.eringerswitzerland.ch/fr/products/winter-box-signature',
          products: [
            { name: 'Gelée Micellaire Thé Vert', size: '100 ml', price: 32, description: 'Nettoie en douceur, antioxydant' },
            { name: 'Masque Hydratant 72h', size: '100 ml', price: 55, description: 'Hydratation longue durée' },
            { name: 'Sérum Anti-Cernes', size: '30 ml', price: 45, description: 'Atténue cernes et poches' },
            { name: 'Stick Lèvres Réparateur', size: '5 ml', price: 13, description: 'Nourrit et protège les lèvres' },
          ],
        },
        {
          name: 'Coffret PRESTIGE',
          price: 245,
          url: 'https://shop.eringerswitzerland.ch/fr/products/winter-box-prestige',
          products: [
            { name: 'Lotion Nettoyante Aloe Vera', size: '100 ml', price: 29, description: 'Nettoyant apaisant, idéal peaux déshydratées' },
            { name: 'Crème Éclat Papaye – Criste Marine', size: '50 ml', price: 59, description: 'Éclat et uniformité du teint' },
            { name: 'Masque Hydratant 72h', size: '100 ml', price: 55, description: 'Hydratation longue durée' },
            { name: 'Sérum Perles Actives', size: '30 ml', price: 89, description: 'Régénération cellulaire intense' },
            { name: 'Stick Lèvres Réparateur', size: '5 ml', price: 13, description: 'Nourrit et protège les lèvres' },
            { name: 'Roller + Gua Sha', size: '', price: null, description: 'Massage drainant, éclat immédiat' },
          ],
        },
      ],
    },
  },
  en: {
    antiAge: {
      title: 'Anti-Aging Gift Sets',
      sets: [
        {
          name: 'SIGNATURE Set',
          price: 150,
          url: 'https://shop.eringerswitzerland.ch/products/anti-aging-box-signature',
          products: [
            { name: 'Anti-Aging Reishi Gel Serum', size: '30 ml', price: 59, description: 'Smooths wrinkles, enhanced firmness' },
            { name: 'Anti-Aging Cream Mask (Papaya – Immortelle)', size: '100 ml', price: 59, description: 'Deeply regenerates and nourishes' },
            { name: 'Green Tea Micellar Gel', size: '100 ml', price: 32, description: 'Gently cleanses, antioxidant' },
          ],
        },
        {
          name: 'PRESTIGE Set',
          price: 232,
          url: 'https://shop.eringerswitzerland.ch/products/anti-aging-box-prestige',
          products: [
            { name: 'Anti-Aging Reishi Gel Serum', size: '30 ml', price: 59, description: 'Smooths wrinkles, enhanced firmness' },
            { name: 'Anti-Aging Face Cream Primer', size: '50 ml', price: 69, description: 'Smoothing base, lifting effect' },
            { name: 'Anti-Aging Cream Mask (Papaya – Immortelle)', size: '100 ml', price: 59, description: 'Deeply regenerates and nourishes' },
            { name: 'Pomegranate Anti-Dark Circles Serum', size: '30 ml', price: 45, description: 'Reduces dark circles and puffiness' },
            { name: 'Roller + Gua Sha', size: '', price: null, description: 'Draining massage, instant glow' },
          ],
        },
      ],
    },
    hydratation: {
      title: 'Hydration Gift Sets',
      sets: [
        {
          name: 'SIGNATURE Set',
          price: 139,
          url: 'https://shop.eringerswitzerland.ch/products/moisturizing-box-signature',
          products: [
            { name: '72h Raspberry Hydrating Mask', size: '100 ml', price: 55, description: 'Replenishes water and plumps skin' },
            { name: 'Avocado-Vine Ultra Hydrating Serum', size: '30 ml', price: 55, description: 'Intensive hydration, light texture' },
            { name: 'Aloe Vera Cleansing Lotion', size: '100 ml', price: 29, description: 'Soothing cleanser, ideal for dehydrated skin' },
          ],
        },
        {
          name: 'PRESTIGE Set',
          price: 214,
          url: 'https://shop.eringerswitzerland.ch/products/moisturizing-box-prestige',
          products: [
            { name: 'Avocado-Vine Ultra Hydrating Serum', size: '30 ml', price: 55, description: 'Intensive hydration, light texture' },
            { name: 'Papaya – Sea Samphire Radiance Cream', size: '50 ml', price: 59, description: 'Radiance and even skin tone' },
            { name: '72h Raspberry Hydrating Mask', size: '100 ml', price: 55, description: 'Replenishes water and plumps skin' },
            { name: 'Pomegranate Anti-Dark Circles Serum', size: '30 ml', price: 45, description: 'Reduces dark circles and puffiness' },
            { name: 'Roller + Gua Sha', size: '', price: null, description: 'Draining massage, instant glow' },
          ],
        },
      ],
    },
    winter: {
      title: 'Winter Collection',
      sets: [
        {
          name: 'SIGNATURE Set',
          price: 145,
          url: 'https://shop.eringerswitzerland.ch/products/winter-box-signature',
          products: [
            { name: 'Green Tea Micellar Gel', size: '100 ml', price: 32, description: 'Gently cleanses, antioxidant' },
            { name: '72h Hydrating Mask', size: '100 ml', price: 55, description: 'Long-lasting hydration' },
            { name: 'Anti-Dark Circles Serum', size: '30 ml', price: 45, description: 'Reduces dark circles and puffiness' },
            { name: 'Repairing Lip Balm', size: '5 ml', price: 13, description: 'Nourishes and protects lips' },
          ],
        },
        {
          name: 'PRESTIGE Set',
          price: 245,
          url: 'https://shop.eringerswitzerland.ch/products/winter-box-prestige',
          products: [
            { name: 'Aloe Vera Cleansing Lotion', size: '100 ml', price: 29, description: 'Soothing cleanser, ideal for dehydrated skin' },
            { name: 'Papaya – Sea Samphire Radiance Cream', size: '50 ml', price: 59, description: 'Radiance and even skin tone' },
            { name: '72h Hydrating Mask', size: '100 ml', price: 55, description: 'Long-lasting hydration' },
            { name: 'Active Pearls Serum', size: '30 ml', price: 89, description: 'Intense cellular regeneration' },
            { name: 'Repairing Lip Balm', size: '5 ml', price: 13, description: 'Nourishes and protects lips' },
            { name: 'Roller + Gua Sha', size: '', price: null, description: 'Draining massage, instant glow' },
          ],
        },
      ],
    },
  },
}

interface Product {
  name: string
  size: string
  price: number | null
  description?: string
}

interface GiftSet {
  name: string
  price: number
  products: Product[]
  url?: string
}

interface Category {
  title: string
  sets: GiftSet[]
}

function GiftSetCategory({ category, index, locale }: { category: Category; index: number; locale: string }) {
  const ctaText = locale === 'fr' ? 'Découvrir' : 'Discover'
  
  return (
    <motion.div
      className="mb-12 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Category Title */}
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gold-200 text-center">
        {category.title}
      </h3>
      
      {/* Sets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.sets.map((set, setIndex) => {
          const isPrestige = set.name.includes('PRESTIGE')
          
          return (
            <motion.div
              key={set.name}
              className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                isPrestige 
                  ? 'bg-gradient-to-br from-gold-600 via-gold-500 to-gold-700 border border-gold-400/50' 
                  : 'bg-gradient-to-br from-white to-gold-50/30 border border-gold-100/50'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: setIndex * 0.1 }}
            >
              {/* Set Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className={`text-lg font-semibold ${isPrestige ? 'text-white' : 'text-gray-900'}`}>
                  {set.name}
                </h4>
                <span className={`text-xl font-bold ${isPrestige ? 'text-gold-100' : 'text-gold-600'}`}>
                  {set.price} CHF
                </span>
              </div>
              
              {/* Products List */}
              <ul className="space-y-2.5">
                {set.products.map((product, productIndex) => (
                  <li key={productIndex} className="flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${isPrestige ? 'bg-gold-200' : 'bg-gold-400'}`} />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className={`text-sm font-medium ${isPrestige ? 'text-white' : 'text-gray-800'}`}>
                          {product.name}
                          {product.size && (
                            <span className={`font-normal ml-1 ${isPrestige ? 'text-gold-100/80' : 'text-gray-500'}`}>
                              {product.size}
                            </span>
                          )}
                        </span>
                        {product.price && (
                          <span className={`text-xs font-medium whitespace-nowrap ${isPrestige ? 'text-gold-200' : 'text-gold-600'}`}>
                            {product.price} CHF
                          </span>
                        )}
                      </div>
                      {product.description && (
                        <p className={`text-xs mt-0.5 italic ${isPrestige ? 'text-gold-100/70' : 'text-gray-500'}`}>
                          {product.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <div className="mt-5 flex justify-center">
                <a
                  href={set.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block text-center py-2.5 px-6 text-sm font-semibold transition-all duration-300 ${
                    isPrestige
                      ? 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gold-600'
                      : 'bg-gold-600 text-white hover:bg-gold-700 hover:shadow-lg'
                  }`}
                >
                  {ctaText}
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function GiftSetsSection() {
  const { t, locale, translations } = useTranslation()
  const baseUrl = getBaseUrl(locale)
  const data = giftSetsData[locale as 'fr' | 'en'] || giftSetsData.fr

  // Infos des produits contenus dans le coffret (dans le même ordre que productImages)
  const productInfos = [
    translations.products?.['gelee-micellaire'] || {
      name: 'Extra Gentle Micellar Gel',
      description: 'Extra gentle micellar gel for gentle cleansing',
      tags: ['Cleansing', 'Green tea', 'Acacia gum', 'Gentle'],
    },
    translations.products?.['masque-anti-age'] || {
      name: 'Anti-Aging Mask',
      description: 'Anti-aging mask with smoothing and revitalizing effects',
      tags: ['Anti-aging', 'Acmella Oleracea', 'Papaya', 'Immortelle'],
    },
    translations.products?.['serum-anti-age'] || {
      name: 'Anti-Aging Lifting Serum',
      description: 'Anti-aging serum with lifting and anti-wrinkle effects',
      tags: ['Anti-aging', 'Lifting', 'Reishi', 'Immortelle', 'Tiger grass'],
    },
  ]

  const giftSet = {
    id: 'coffret-main',
    name: translations.products?.['coffret-anti-aging']?.name || 'Coffret Anti-Aging',
    description: translations.products?.['coffret-anti-aging']?.description || '',
    price: 150,
    hoverVideo: '/videos/box1.mp4',
    videoAfterHover: '/videos/box2.mp4',
    productUrl: locale === 'fr' 
      ? 'https://shop.eringerswitzerland.ch/fr/products/coffret-anti-age'
      : 'https://shop.eringerswitzerland.ch/products/coffret-anti-age',
    tags: translations.products?.['coffret-anti-aging']?.tags || [],
productImages: [
        '/images/packaging/gelee-package.webp',
        '/images/packaging/masque anti age.webp',
        '/images/packaging/serum anti-age.webp',
      ],
    productInfos,
  }

  return (
    <section id="gift-sets" className="bg-white">
      {/* Hero Section with Mountains Background - Full Width */}
      <div 
        className="relative w-full py-16 lg:py-24"
        style={{
          backgroundImage: 'url(/images/mountains2.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Top gradient separator - white fade */}
        <div 
          className="absolute top-0 left-0 right-0 h-[100px] z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
        
        {/* Horizontal gradient overlay - white band in center */}
        <div 
          className="absolute inset-0 z-[5]"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 35%, rgba(255,255,255,1) 65%, rgba(255,255,255,0) 100%)',
          }}
        />
        
        <div className="relative z-10 mx-auto px-4 lg:px-8 max-w-[960px]">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-sm text-gold-700 font-medium tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('sections.giftSetsSubtitle')}
            </motion.p>
            <motion.h2
              className="text-4xl lg:text-5xl font-serif font-bold text-gold-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('sections.giftSets')}
            </motion.h2>
          </motion.div>

          {/* Single Gift Set Card - Centered */}
          <div className="flex justify-center">
            <motion.div
              className="w-full max-w-[320px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GiftSetCard {...giftSet} />
            </motion.div>
          </div>

          {/* CTA Button - Scroll to details */}
          <motion.div
            className="flex justify-center -mt-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => {
                const element = document.getElementById('gift-sets-details')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="inline-block py-3 px-8 border-2 border-gold-600 text-gold-600 bg-transparent font-semibold text-sm hover:bg-gold-600 hover:text-white transition-all duration-300"
            >
              {locale === 'fr' ? 'Voir tous les coffrets' : 'View all gift sets'}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Gift Sets Details Section */}
      <div id="gift-sets-details" className="py-10 lg:py-16 mx-auto px-4 lg:px-8 max-w-[960px]">
        {/* Gift Sets Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GiftSetCategory category={data.antiAge} index={0} locale={locale} />
          <GiftSetCategory category={data.hydratation} index={1} locale={locale} />
          <GiftSetCategory category={data.winter} index={2} locale={locale} />
        </motion.div>
      </div>
    </section>
  )
}
