'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/product/ProductCard'
import { FiFilter } from 'react-icons/fi'

const categories = ['All', 'Face Care', 'Body Care', 'Serums', 'Masks', 'New Arrivals']

const products = [
  {
    id: '1',
    name: 'Masque Hydratant & Apaisant 72H',
    description: 'Enriched with Edelweiss and Immortelle flower for deep hydration',
    price: 89,
    image: '/images/product1.png',
    hoverVideo: '/videos/product1.mp4',
    category: 'Masks',
    badge: 'Best Seller',
    tags: ['72h hydration', 'Edelweiss', 'Soothing', 'Barrier repair', 'Sensitive skin'],
  },
  {
    id: '3',
    name: 'Gel Anti-Cellulite Sculptez et Raffermissez',
    description: 'Anti-cellulite gel for sculpting and firming with cooling and firming effects',
    price: 79,
    image: '/images/gel-anti-cellulite-2.png',
    hoverVideo: '/videos/gel-anti-cellulite-3.mp4',
    category: 'Body Care',
    tags: ['Firming', 'Toning', 'Cooling effect', 'Quick absorption'],
  },
  {
    id: '4',
    name: 'Lotion Corporelle Douceur et Régénération',
    description: 'Nourishing body lotion for softness and regeneration of skin tissues',
    price: 65,
    image: '/images/lotion-corporelle.png',
    category: 'Body Care',
    tags: ['24h moisture', 'Non-greasy', 'Soft skin', 'Alpine botanicals'],
  },
  {
    id: '5',
    name: 'Lotion Nettoyante et Purifiante',
    description: 'Purifying & cleansing face lotion for balanced and luminous skin',
    price: 29,
    image: '/images/lotion-nettoyante-3.png',
    category: 'Face Care',
    tags: ['Cleansing', 'Purifying', 'Echinacea', 'Peony', 'Aloe Vera'],
  },
  {
    id: '6',
    name: 'Stick Lèvres Douceur et Protection',
    description: 'Lip balm with natural ingredients for softness and protection',
    price: 19,
    image: '/images/stick-levres.png',
    category: 'New Arrivals',
    tags: ['Lip care', 'Cocoa butter', 'Beeswax', 'Coconut oil', 'Vanilla'],
  },
  {
    id: '7',
    name: 'Masque Anti-Âge',
    description: 'Anti-aging mask with smoothing and revitalizing effects',
    price: 89,
    image: '/images/masque-anti-age.png',
    category: 'Masks',
    tags: ['Anti-aging', 'Acmella Oleracea', 'Papaya', 'Immortelle'],
  },
  {
    id: '8',
    name: 'Crème Éclat Équilibre et Lumière',
    description: 'Radiance cream for combination skin',
    price: 75,
    image: '/images/creme-visage-eclat.png',
    category: 'Face Care',
    tags: ['Radiance', 'Balance', 'Sea Fennel', 'Papaya', 'Anti-pollution'],
  },
  {
    id: '9',
    name: 'Crème Anti-Âge Lissage et Fermeté',
    description: 'Anti-aging face cream for smoothing and firming',
    price: 99,
    image: '/images/creme-anti-age.png',
    category: 'Face Care',
    tags: ['Anti-aging', 'Firming', 'Edelweiss', 'Reishi', 'Jojoba'],
  },
  {
    id: '10',
    name: 'Sérum Anti-Cernes et Anti-Poches',
    description: 'Anti-dark circles and anti-puffiness eye contour serum',
    price: 69,
    image: '/images/serum-anti-cernes.png',
    category: 'Serums',
        tags: ['Eye care', 'Avocado', 'Pomegranate', 'Red Vine'],
  },
  {
    id: '12',
    name: 'Sérum Ultra Hydratant',
    description: 'Ultra hydrating serum for intense hydration and youthful radiance',
    price: 89,
    image: '/images/serum-ultra-hydratant.png',
    hoverVideo: '/videos/serum-ultra.mp4',
    category: 'Serums',
    tags: ['Hydration', 'Avocado peptides', 'Vanilla', 'Anti-aging'],
  },
  {
    id: '13',
    name: 'Gelée Micellaire Extradouce',
    description: 'Extra gentle micellar gel for gentle cleansing',
    price: 32,
    image: '/images/gelee-micellaire-3.png',
    hoverVideo: '/videos/gelee-micellaire-3.mp4',
    category: 'Face Care',
    tags: ['Cleansing', 'Green tea', 'Acacia gum', 'Gentle'],
  },
  {
    id: '14',
    name: 'Sérum Perles Anti-Pollution',
    description: 'Natural anti-pollution shield serum with active pearls',
    price: 94,
    image: '/images/product2.png',
    hoverVideo: '/videos/product2-2.mp4',
    category: 'Serums',
    tags: ['Anti-pollution', 'White mulberry', 'Bladderwrack', 'Peony'],
  },
  {
    id: '17',
    name: 'Sérum Anti-Âge Effet Liftant',
    description: 'Anti-aging serum with lifting and anti-wrinkle effect',
    price: 119,
    image: '/images/serum-anti-age.png',
    category: 'Serums',
    tags: ['Anti-aging', 'Lifting', 'Reishi', 'Immortelle', 'Tiger grass'],
  },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products
    return products.filter((product) => product.category === selectedCategory)
  }, [selectedCategory])

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm text-gold-600 font-medium tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Luxury Collection
          </motion.p>
          <motion.h1
            className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our Products
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover our premium Swiss skincare collection crafted with the finest Alpine ingredients
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all cursor-hover ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Count */}
        <motion.p
          className="text-center text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </motion.p>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          layout
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

