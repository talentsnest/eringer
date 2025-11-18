'use client'

import { motion } from 'framer-motion'
import { FiMapPin } from 'react-icons/fi'
import { useTranslation } from '@/lib/i18n/useTranslation'

const getLocations = (switzerland: string) => [
  {
    id: 1,
    name: 'Hôtel ERINGER Hérémence',
    address: `Hérémence, ${switzerland}`,
  },
  {
    id: 2,
    name: 'ERINGER Institut Hérémence',
    address: `Hérémence, ${switzerland}`,
  },
  {
    id: 3,
    name: 'Institut Rose Mex',
    address: `Mex, ${switzerland}`,
  },
  {
    id: 4,
    name: 'Chez Virginie Crans-Montana',
    address: `Crans-Montana, ${switzerland}`,
  },
]

export default function WhereToFindUsSection() {
  const { t } = useTranslation()
  const locations = getLocations(t('common.switzerland'))

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
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
            {t('sections.whereToFindSubtitle')}
          </motion.p>
          <motion.h2
            className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('sections.whereToFind')}
          </motion.h2>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center">
                    <FiMapPin className="w-6 h-6 text-gold-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">
                    {location.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {location.address}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

