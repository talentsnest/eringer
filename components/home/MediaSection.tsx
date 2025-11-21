'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '@/lib/i18n/useTranslation'

const mediaLogos = [
  {
    id: 1,
    name: 'Marie Claire',
    logo: '/images/Marie_Claire_Magazine_logo.svg.png',
    url: '', // URL à ajouter quand l'article sortira
  },
  {
    id: 2,
    name: 'Le Figaro',
    logo: '/images/Logo_Le_Figaro.svg.png',
    url: '', // URL à ajouter quand l'article sortira
  },
]

export default function MediaSection() {
  const { t } = useTranslation()

  return (
    <section className="py-6 lg:py-8 bg-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-gray-500 font-medium mb-6">
            {t('sections.media')}
          </p>
        </motion.div>

        <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-12 xl:gap-16 overflow-x-hidden">
          {mediaLogos.map((media, index) => (
            <motion.a
              key={media.id}
              href={media.url || '#'}
              className={`opacity-60 hover:opacity-100 transition-opacity duration-300 flex-shrink-0 ${media.url ? 'cursor-pointer' : 'cursor-default'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ opacity: 1 }}
              onClick={(e) => {
                if (!media.url) {
                  e.preventDefault()
                }
              }}
            >
              <Image
                src={media.logo}
                alt={media.name}
                width={150}
                height={60}
                className="h-6 sm:h-8 md:h-10 lg:h-12 xl:h-16 w-auto max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-none object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

