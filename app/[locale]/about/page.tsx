'use client'

import { motion } from 'framer-motion'
import { FiAward, FiHeart, FiFeather, FiShield } from 'react-icons/fi'

const values = [
  {
    iconName: 'leaf',
    title: 'Natural Ingredients',
    description: 'We source the finest Alpine botanicals and natural ingredients, carefully selected for their proven efficacy and purity.',
  },
  {
    iconName: 'shield',
    title: 'Swiss Quality',
    description: 'Every product is crafted in Switzerland with uncompromising quality standards and precision.',
  },
  {
    iconName: 'heart',
    title: 'Ethical & Cruelty-Free',
    description: 'We are committed to ethical practices, never testing on animals and supporting sustainable sourcing.',
  },
  {
    iconName: 'award',
    title: 'Proven Results',
    description: 'Our formulations are backed by science and deliver visible, long-lasting results for all skin types.',
  },
]

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  leaf: FiFeather,
  shield: FiShield,
  heart: FiHeart,
  award: FiAward,
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 mb-20">
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
            Our Story
          </motion.p>
          <motion.h1
            className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            About Eringer Switzerland
          </motion.h1>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-center italic text-gray-600 mb-8">
              "Born in the heart of the Swiss Alps, Eringer Switzerland embodies the purity, 
              precision, and timeless beauty of our homeland."
            </p>

            <p>
              Our journey began with a simple vision: to harness the extraordinary power of Alpine 
              botanicals and combine them with Swiss precision to create skincare that truly transforms. 
              Every product we craft is a testament to this vision.
            </p>

            <p>
              The Swiss Alps have always been a source of inspiration and wonder. The rare plants that 
              thrive in these harsh conditions have developed unique properties to protect and regenerate 
              themselves. We've spent years researching and carefully extracting these precious ingredients, 
              including our signature Edelweiss extract, to bring their benefits to your skin.
            </p>

            <p>
              At Eringer Switzerland, we believe that luxury is not just about indulgence—it's about 
              efficacy, purity, and respect for both your skin and our planet. Every formula is meticulously 
              developed, tested, and refined to ensure it meets our exacting standards.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = iconMap[value.iconName] || FiAward
              return (
                <motion.div
                  key={value.title}
                  className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-8 h-8 text-gold-600" />
                  </motion.div>

                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="container mx-auto px-4 lg:px-8 py-20" id="sustainability">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
              Our Commitment to the Planet
            </h2>
            <p className="text-gray-600 text-lg">
              We believe luxury and sustainability go hand in hand
            </p>
          </div>

          <div className="bg-gradient-to-br from-botanical-50 to-botanical-100 rounded-3xl p-8 lg:p-12">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                <strong>Sustainable Sourcing:</strong> We work directly with Alpine farmers and 
                cooperatives to ensure our ingredients are harvested sustainably and ethically.
              </p>
              <p>
                <strong>Eco-Friendly Packaging:</strong> Our packaging is made from recycled 
                materials and is fully recyclable. We're constantly innovating to reduce our 
                environmental footprint.
              </p>
              <p>
                <strong>Carbon Neutral:</strong> We've committed to carbon neutrality across 
                our entire supply chain and operations.
              </p>
              <p>
                <strong>Giving Back:</strong> A portion of every sale goes to Alpine conservation 
                projects to protect the pristine environment that inspires us.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

