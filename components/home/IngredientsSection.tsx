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
  vigneRouge: GiHerbsBundle,
  echinacee: GiFlowerPot,
  papaye: GiFruitBowl,
  acmella: GiFlowerPot,
  cristeMarine: GiHerbsBundle,
  jojoba: GiWaterDrop,
  theVert: GiCactus,
  varech: GiHerbsBundle,
  murierBlanc: GiHerbsBundle,
  cacao: GiOlive,
  cafeine: GiHerbsBundle,
  carthame: GiSunflower,
  cireAbeille: GiHoneyJar,
  coco: GiOlive,
  framboise: GiFruitBowl,
  glycerine: GiWaterDrop,
  citrouille: GiFruitBowl,
  amande: GiOlive,
  framboiseSeed: GiFruitBowl,
  noix: GiOlive,
  saccharide: GiWaterDrop,
  macadamia: GiOlive,
  mauve: GiFlowerPot,
  peptides: GiHerbsBundle,
  vanille: GiFlowerPot,
}

// Liste complète de 30 ingrédients avec noms courts
const allIngredients = [
  { key: 'edelweiss', name: 'Edelweiss', icon: GiFlowerEmblem },
  { key: 'reishi', name: 'Reishi', icon: GiMushroomGills },
  { key: 'aloeVera', name: 'Aloe Vera', icon: GiCactus },
  { key: 'immortelle', name: 'Immortelle', icon: GiSunflower },
  { key: 'avocat', name: 'Avocado', icon: GiOlive },
  { key: 'grenade', name: 'Pomegranate', icon: GiFruitBowl },
  { key: 'pivoine', name: 'Peony', icon: GiFlowerPot },
  { key: 'vigneRouge', name: 'Red Vine', icon: GiHerbsBundle },
  { key: 'echinacee', name: 'Echinacea', icon: GiFlowerPot },
  { key: 'papaye', name: 'Papaya', icon: GiFruitBowl },
  { key: 'acmella', name: 'Acmella', icon: GiFlowerPot },
  { key: 'cristeMarine', name: 'Sea Samphire', icon: GiHerbsBundle },
  { key: 'jojoba', name: 'Jojoba', icon: GiWaterDrop },
  { key: 'theVert', name: 'Green Tea', icon: GiCactus },
  { key: 'varech', name: 'Kelp', icon: GiHerbsBundle },
  { key: 'murierBlanc', name: 'White Mulberry', icon: GiHerbsBundle },
  { key: 'cacao', name: 'Cocoa Butter', icon: GiOlive },
  { key: 'cafeine', name: 'Caffeine', icon: GiHerbsBundle },
  { key: 'carthame', name: 'Safflower', icon: GiSunflower },
  { key: 'cireAbeille', name: 'Beeswax', icon: GiHoneyJar },
  { key: 'coco', name: 'Coconut Oil', icon: GiOlive },
  { key: 'framboise', name: 'Raspberry', icon: GiFruitBowl },
  { key: 'glycerine', name: 'Glycerin', icon: GiWaterDrop },
  { key: 'citrouille', name: 'Pumpkin Seeds', icon: GiFruitBowl },
  { key: 'amande', name: 'Almond Oil', icon: GiOlive },
  { key: 'framboiseSeed', name: 'Raspberry Seed', icon: GiFruitBowl },
  { key: 'noix', name: 'Walnut Oil', icon: GiOlive },
  { key: 'saccharide', name: 'Saccharide', icon: GiWaterDrop },
  { key: 'macadamia', name: 'Macadamia', icon: GiOlive },
  { key: 'mauve', name: 'Mallow', icon: GiFlowerPot },
]

export default function IngredientsSection() {
  const { t, translations } = useTranslation()

  // Mapper les ingrédients avec leurs traductions
  const ingredientsWithTranslations = allIngredients.map((ingredient) => {
    const translation = translations.ingredients?.[ingredient.key as keyof typeof translations.ingredients]
    const description = translation?.description || ''
    return {
      ...ingredient,
      name: translation?.name || ingredient.name,
      description: description,
    }
  })

  // Debug: vérifier que les descriptions sont bien récupérées
  if (typeof window !== 'undefined' && ingredientsWithTranslations.length > 0) {
    console.log('First ingredient:', ingredientsWithTranslations[0])
  }

  // Créer 3 rows avec 10 ingrédients chacun (doublés pour l'animation infinie)
  const row1 = [...ingredientsWithTranslations.slice(0, 10), ...ingredientsWithTranslations.slice(0, 10)]
  const row2 = [...ingredientsWithTranslations.slice(10, 20), ...ingredientsWithTranslations.slice(10, 20)]
  const row3 = [...ingredientsWithTranslations.slice(20, 30), ...ingredientsWithTranslations.slice(20, 30)]

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

        {/* Ingredients - 3 rows avec défilement animé */}
        <div className="w-full overflow-hidden py-8">
          <motion.div
            className="flex flex-col gap-6"
            style={{
              transform: 'rotate(-2deg)',
            }}
            initial={{ opacity: 0, y: 30, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Row 1 - Défile vers la gauche */}
            <div className="relative overflow-hidden">
              <div 
                className="flex flex-nowrap items-center"
                style={{
                  animation: 'scroll-left 80s linear infinite',
                }}
              >
                {row1.map((ingredient, index) => (
                  <div
                    key={`${ingredient.key}-${index}`}
                    className="group relative p-4 lg:p-6 bg-white/60 rounded-xl shadow-lg hover:bg-white hover:opacity-100 hover:shadow-2xl transition-all duration-300 cursor-hover flex-shrink-0 mx-2 flex flex-col"
                    style={{ 
                      width: '200px',
                      minWidth: '200px',
                      minHeight: '140px'
                    }}
                  >
                    {/* Icon */}
                    <div className="mb-3">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center group-hover:from-gold-200 group-hover:to-gold-300 transition-colors">
                        <ingredient.icon className="w-6 h-6 lg:w-7 lg:h-7 text-gold-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-sm lg:text-base font-serif font-bold text-gray-900 mb-1">
                      {ingredient.name}
                    </h3>
                    {ingredient.description && ingredient.description.trim() !== '' && (
                      <p className="text-xs text-gray-600 line-clamp-2 leading-tight mt-1">
                        {ingredient.description}
                      </p>
                    )}

                    {/* Decorative Element */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-gold-100/20 to-transparent rounded-full blur-xl group-hover:from-gold-200/30 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Défile vers la droite */}
            <div className="relative overflow-hidden">
              <div 
                className="flex flex-nowrap items-center"
                style={{
                  animation: 'scroll-right 80s linear infinite',
                }}
              >
                {row2.map((ingredient, index) => (
                  <div
                    key={`${ingredient.key}-${index}`}
                    className="group relative p-4 lg:p-6 bg-white/60 rounded-xl shadow-lg hover:bg-white hover:opacity-100 hover:shadow-2xl transition-all duration-300 cursor-hover flex-shrink-0 mx-2 flex flex-col"
                    style={{ 
                      width: '200px',
                      minWidth: '200px',
                      minHeight: '140px'
                    }}
                  >
                    {/* Icon */}
                    <div className="mb-3">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center group-hover:from-gold-200 group-hover:to-gold-300 transition-colors">
                        <ingredient.icon className="w-6 h-6 lg:w-7 lg:h-7 text-gold-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-sm lg:text-base font-serif font-bold text-gray-900 mb-1">
                      {ingredient.name}
                    </h3>
                    {ingredient.description && ingredient.description.trim() !== '' && (
                      <p className="text-xs text-gray-600 line-clamp-2 leading-tight mt-1">
                        {ingredient.description}
                      </p>
                    )}

                    {/* Decorative Element */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-gold-100/20 to-transparent rounded-full blur-xl group-hover:from-gold-200/30 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3 - Défile vers la gauche */}
            <div className="relative overflow-hidden">
              <div 
                className="flex flex-nowrap items-center"
                style={{
                  animation: 'scroll-left 80s linear infinite',
                }}
              >
                {row3.map((ingredient, index) => (
                  <div
                    key={`${ingredient.key}-${index}`}
                    className="group relative p-4 lg:p-6 bg-white/60 rounded-xl shadow-lg hover:bg-white hover:opacity-100 hover:shadow-2xl transition-all duration-300 cursor-hover flex-shrink-0 mx-2 flex flex-col"
                    style={{ 
                      width: '200px',
                      minWidth: '200px',
                      minHeight: '140px'
                    }}
                  >
                    {/* Icon */}
                    <div className="mb-3">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center group-hover:from-gold-200 group-hover:to-gold-300 transition-colors">
                        <ingredient.icon className="w-6 h-6 lg:w-7 lg:h-7 text-gold-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-sm lg:text-base font-serif font-bold text-gray-900 mb-1">
                      {ingredient.name}
                    </h3>
                    {ingredient.description && ingredient.description.trim() !== '' && (
                      <p className="text-xs text-gray-600 line-clamp-2 leading-tight mt-1">
                        {ingredient.description}
                      </p>
                    )}

                    {/* Decorative Element */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-gold-100/20 to-transparent rounded-full blur-xl group-hover:from-gold-200/30 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
