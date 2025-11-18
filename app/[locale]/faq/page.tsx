'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiPackage, FiShield, FiTruck } from 'react-icons/fi'

const faqCategories = [
  {
    title: 'Products & Ingredients',
    icon: FiPackage,
    questions: [
      {
        q: 'Are your products suitable for sensitive skin?',
        a: 'Yes, all our products are formulated with gentle, natural ingredients suitable for sensitive skin. However, we always recommend doing a patch test before full application.',
      },
      {
        q: 'What makes Edelweiss so special in skincare?',
        a: 'Edelweiss is a rare Alpine flower that has developed powerful antioxidant and protective properties to survive harsh mountain conditions. These same properties help protect and rejuvenate your skin.',
      },
      {
        q: 'Are your products vegan and cruelty-free?',
        a: 'All our products are cruelty-free and we never test on animals. Most of our products are vegan, but some contain Swiss honey. Each product page clearly indicates if it contains animal-derived ingredients.',
      },
      {
        q: 'How long do your products last once opened?',
        a: 'Our products typically have a shelf life of 12 months after opening. Each product has a PAO (Period After Opening) symbol indicating the exact timeframe.',
      },
    ],
  },
  {
    title: 'Shipping & Delivery',
    icon: FiTruck,
    questions: [
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Free shipping is available for orders over 150 CHF within Switzerland and EU.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Swiss orders: 1-3 business days. EU orders: 3-7 business days. International orders: 7-14 business days. Express shipping options are available at checkout.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes, once your order ships, you\'ll receive a tracking number via email. You can use this to monitor your delivery status.',
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    icon: FiShield,
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, you can return unused products in their original packaging for a full refund.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Contact our customer service team at contact@eringerswitzerland.com with your order number. We\'ll provide you with return instructions and a prepaid shipping label.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Refunds are processed within 5-7 business days after we receive your returned items. The refund will be credited to your original payment method.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === key ? null : key)
  }

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
            Help Center
          </motion.p>
          <motion.h1
            className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Find answers to common questions about our products, shipping, and policies
          </motion.p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center mr-4">
                  <category.icon className="w-6 h-6 text-gold-600" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  {category.title}
                </h2>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`
                  const isOpen = openIndex === key

                  return (
                    <motion.div
                      key={questionIndex}
                      className="bg-white rounded-2xl shadow-md overflow-hidden"
                      whileHover={{ shadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                    >
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-hover"
                      >
                        <span className="text-lg font-semibold text-gray-900 pr-8">
                          {item.q}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FiChevronDown className="w-6 h-6 text-gold-600 flex-shrink-0" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="max-w-2xl mx-auto mt-16 text-center bg-gradient-to-br from-gold-50 to-gold-100 rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our customer service team is here to help.
          </p>
          <motion.a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-medium rounded-full hover:shadow-lg transition-shadow cursor-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}

