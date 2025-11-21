'use client'

import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function TestimonialsSection() {
  const { t, translations } = useTranslation()

  const testimonialsRow1 = translations.testimonials?.row1 || []
  const testimonialsRow2 = translations.testimonials?.row2 || []

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonialsRow1 = [...testimonialsRow1, ...testimonialsRow1]
  const duplicatedTestimonialsRow2 = [...testimonialsRow2, ...testimonialsRow2]

  return (
    <section className="py-10 lg:py-16 bg-white relative overflow-hidden w-full">
      <div className="w-full">
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
            {t('sections.testimonials')}
          </motion.p>
          <motion.h2
            className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('sections.testimonialsSubtitle')}
          </motion.h2>
        </motion.div>

        {/* First Row - Scrolls Left */}
        <div className="mb-8 overflow-hidden w-full">
          <div className="flex gap-6 scroll-left" style={{ width: 'max-content' }}>
            {duplicatedTestimonialsRow1.map((testimonial: any, index: number) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 w-[400px] bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg"
              >
                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-base text-gray-700 text-center italic font-serif mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author - First Name Only */}
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.firstName}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Scrolls Right */}
        <div className="overflow-hidden w-full">
          <div className="flex gap-6 scroll-right" style={{ width: 'max-content' }}>
            {duplicatedTestimonialsRow2.map((testimonial: any, index: number) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 w-[400px] bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg"
              >
                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-base text-gray-700 text-center italic font-serif mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author - First Name Only */}
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.firstName}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
