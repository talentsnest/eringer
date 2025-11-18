'use client'

import { motion } from 'framer-motion'
import { 
  GiFlowerPot, 
  GiMushroomGills, 
  GiCactus, 
  GiHoneyJar, 
  GiSunflower,
  GiWaterDrop,
  GiFruitBowl,
  GiHerbsBundle,
  GiOlive,
  GiFlowerEmblem
} from 'react-icons/gi'
import { useTranslation } from '@/lib/i18n/useTranslation'

const ingredientIcons: Record<string, any> = {
  edelweiss: GiFlowerEmblem,
  reishi: GiMushroomGills,
  aloeVera: GiCactus,
  immortelle: GiSunflower,
  avocat: GiOlive,
  grenade: GiFruitBowl,
  pivoine: GiFlowerPot,
  prele: GiHerbsBundle,
  echinacee: GiFlowerPot,
  papaye: GiFruitBowl,
  acmella: GiFlowerPot,
  cristeMarine: GiHerbsBundle,
  jojoba: GiWaterDrop,
  theVert: GiCactus,
  varech: GiHerbsBundle,
  murierBlanc: GiHerbsBundle,
}

const ingredientKeys = [
  'edelweiss',
  'reishi',
  'aloeVera',
  'immortelle',
  'avocat',
  'grenade',
  'pivoine',
  'prele',
  'echinacee',
  'papaye',
  'acmella',
  'cristeMarine',
  'jojoba',
  'theVert',
  'varech',
  'murierBlanc',
]

export default function IngredientsSection() {
  const { t, translations } = useTranslation()

  const ingredients = ingredientKeys.map((key) => {
    const ingredient = translations.ingredients?.[key as keyof typeof translations.ingredients] || {}
    return {
      key,
      icon: ingredientIcons[key] || GiFlowerPot,
      name: ingredient.name || '',
      description: ingredient.description || '',
    }
  })

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage:
              'url(data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M30 0l30 30-30 30L0 30z" fill="%23d4ae7a" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E)',
          }}
        />
      </div>

      <div className="w-full relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 px-4 lg:px-8"
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
            {t('sections.ingredientsSubtitle')}
          </motion.p>
          <motion.h2
            className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('sections.ingredients')}
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('sections.ingredientsDescription')}
          </motion.p>
        </motion.div>

        {/* Ingredients - 3 rows, section tilted, full width, overflow allowed */}
        <div className="w-full overflow-hidden py-8">
          <motion.div
            className="flex flex-col gap-4"
            style={{
              transform: 'rotate(-2deg)',
            }}
            initial={{ opacity: 0, y: 30, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Row 1 */}
            <div className="flex flex-nowrap items-center">
              {ingredients.slice(0, 5).map((ingredient, index) => (
                <motion.div
                  key={ingredient.key}
                  className="group relative p-6 lg:p-8 bg-white/60 rounded-xl shadow-lg hover:bg-white hover:opacity-100 hover:shadow-2xl transition-all duration-300 cursor-hover flex-shrink-0"
                  style={{ 
                    width: `calc(100vw / 5)`,
                    minWidth: '200px'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.08, transition: { duration: 0.2, ease: 'easeOut' } }}
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-4"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.2,
                    }}
                  >
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center group-hover:from-gold-200 group-hover:to-gold-300 transition-colors">
                      <ingredient.icon className="w-6 h-6 lg:w-8 lg:h-8 text-gold-600" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-base lg:text-lg font-serif font-bold text-gray-900 mb-2">
                    {ingredient.name}
                  </h3>
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                    {ingredient.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-gold-100/20 to-transparent rounded-full blur-xl group-hover:from-gold-200/30 transition-colors" />
                </motion.div>
              ))}
            </div>

            {/* Row 2 - décalée, peut déborder des deux côtés */}
            <div className="flex flex-nowrap items-center" style={{ marginLeft: '-10%', width: '120%' }}>
              {ingredients.slice(6, 12).map((ingredient, index) => (
                <motion.div
                  key={ingredient.key}
                  className="group relative p-6 lg:p-8 bg-white/60 rounded-xl shadow-lg hover:bg-white hover:opacity-100 hover:shadow-2xl transition-all duration-300 cursor-hover flex-shrink-0"
                  style={{ 
                    width: `calc(100vw / 5)`,
                    minWidth: '200px'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index + 6) * 0.05 }}
                  whileHover={{ opacity: 1, y: -5, scale: 1.08, transition: { duration: 0.2, ease: 'easeOut' } }}
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-4"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: (index + 6) * 0.2,
                    }}
                  >
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center group-hover:from-gold-200 group-hover:to-gold-300 transition-colors">
                      <ingredient.icon className="w-6 h-6 lg:w-8 lg:h-8 text-gold-600" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-base lg:text-lg font-serif font-bold text-gray-900 mb-2">
                    {ingredient.name}
                  </h3>
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                    {ingredient.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-gold-100/20 to-transparent rounded-full blur-xl group-hover:from-gold-200/30 transition-colors" />
                </motion.div>
              ))}
            </div>

            {/* Row 3 */}
            <div className="flex flex-nowrap items-center">
              {ingredients.slice(13, 18).map((ingredient, index) => (
                <motion.div
                  key={ingredient.key}
                  className="group relative p-6 lg:p-8 bg-white/60 rounded-xl shadow-lg hover:bg-white hover:opacity-100 hover:shadow-2xl transition-all duration-300 cursor-hover flex-shrink-0"
                  style={{ 
                    width: `calc(100vw / 5)`,
                    minWidth: '200px'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index + 13) * 0.05 }}
                  whileHover={{ opacity: 1, y: -5, scale: 1.08, transition: { duration: 0.2, ease: 'easeOut' } }}
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-4"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: (index + 13) * 0.2,
                    }}
                  >
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center group-hover:from-gold-200 group-hover:to-gold-300 transition-colors">
                      <ingredient.icon className="w-6 h-6 lg:w-8 lg:h-8 text-gold-600" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-base lg:text-lg font-serif font-bold text-gray-900 mb-2">
                    {ingredient.name}
                  </h3>
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                    {ingredient.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-gold-100/20 to-transparent rounded-full blur-xl group-hover:from-gold-200/30 transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
