'use client'

import { motion } from 'framer-motion'
import { FiArrowRight, FiClock, FiActivity, FiHeart, FiCircle, FiStar, FiTrendingUp, FiLock } from 'react-icons/fi'
import { handleTrackedClick } from '@/lib/analytics'
import { useTranslation } from '@/lib/i18n/useTranslation'

const getBaseUrl = (locale: string) => {
  // Pour la version anglaise, ne pas inclure /en/ dans les URLs externes
  if (locale === 'en') {
    return 'https://eringerswitzerland.com'
  }
  return `https://eringerswitzerland.com/${locale}`
}

const iconMap: Record<string, any> = {
  Science: FiActivity,
  Philosophy: FiHeart,
  Ingredients: FiCircle,
  Craftsmanship: FiStar,
  Nature: FiTrendingUp,
  Sustainability: FiLock,
  // French categories
  'Philosophie': FiHeart,
  'Ingrédients': FiCircle,
  'Savoir-faire': FiStar,
  'Durabilité': FiLock,
}

export default function BlogSection() {
  const { t, locale, translations } = useTranslation()
  const baseUrl = getBaseUrl(locale)

  const blogPosts = translations.blog?.posts || []

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm text-gold-600 font-medium tracking-[0.3em] uppercase mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('blog.journal')}
          </motion.p>
          <motion.h2
            className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('blog.latestArticles')}
          </motion.h2>
        </motion.div>

        {/* Blog Grid - 2 columns, 3 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {blogPosts.map((post: any, index: number) => {
            const IconComponent = iconMap[post.category] || FiActivity
            return (
              <motion.article
                key={index}
                className="group cursor-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <a
                  href={`${baseUrl}/blogs/news`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleTrackedClick(e, `${baseUrl}/blogs/news`, post.title, 'external')}
                >
                  <div className="p-4 bg-white rounded-xl border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                        <IconComponent className="w-5 h-5 text-gold-600" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Category & Read Time */}
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-gold-100 text-gold-700 rounded-full">
                            {post.category}
                          </span>
                          <span className="flex items-center">
                            <FiClock className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-serif font-bold text-gray-900 group-hover:text-gold-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Date & Read More */}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs text-gray-500">{post.date}</span>
                          <motion.span
                            className="flex items-center text-gold-600 text-xs font-medium group-hover:text-gold-700"
                            whileHover={{ x: 3 }}
                          >
                            {t('blog.readMore')}
                            <FiArrowRight className="ml-1 w-3 h-3" />
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
