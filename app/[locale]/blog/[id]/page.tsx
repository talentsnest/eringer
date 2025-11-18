'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiClock, FiUser } from 'react-icons/fi'

// Mock blog post data
const getBlogPostById = (id: string) => {
  const posts: Record<string, any> = {
    '1': {
      id: '1',
      title: 'The Power of Edelweiss in Skincare',
      image: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=1200',
      category: 'Ingredients',
      date: 'November 17, 2025',
      readTime: '5 min read',
      author: 'Dr. Sophie Martin',
      content: `
        <p class="lead">High in the Swiss Alps, where few plants can survive the harsh conditions, grows a remarkable flower that has captivated skincare experts worldwide: Edelweiss.</p>

        <h2>A Symbol of Purity and Resilience</h2>
        <p>Edelweiss (Leontopodium alpinum) has long been a symbol of the Alps, representing purity, resilience, and natural beauty. But beyond its cultural significance, this rare flower possesses extraordinary properties that make it a cornerstone of luxury skincare.</p>

        <h2>Surviving the Extremes</h2>
        <p>To thrive in the challenging Alpine environment, Edelweiss has developed powerful protective mechanisms. The flower grows at altitudes of 1,800 to 3,000 meters, where it faces intense UV radiation, extreme temperature fluctuations, and oxidative stress.</p>

        <p>These harsh conditions have made Edelweiss one of nature's most potent sources of antioxidants. The plant produces leontopodic acid and other compounds that protect it from environmental damage—the same properties that can benefit your skin.</p>

        <h2>Benefits for Your Skin</h2>
        <p><strong>Antioxidant Protection:</strong> Edelweiss extract contains twice the antioxidant capacity of vitamin C, helping to neutralize free radicals and prevent premature aging.</p>

        <p><strong>UV Protection:</strong> The plant's natural UV-absorbing compounds provide additional protection against sun damage, complementing your regular SPF routine.</p>

        <p><strong>Anti-Inflammatory:</strong> Edelweiss has proven anti-inflammatory properties, making it ideal for sensitive or reactive skin types.</p>

        <p><strong>Collagen Preservation:</strong> Studies show that Edelweiss extract helps preserve collagen production, maintaining skin firmness and elasticity.</p>

        <h2>Sustainable Harvesting</h2>
        <p>At ERINGER SWITZERLAND, we're committed to sustainable sourcing. Wild Edelweiss is protected throughout the Alps, so we work with specialized Alpine cultivators who grow the flowers organically. This ensures both the preservation of wild populations and the highest quality extract for our formulations.</p>

        <p>Each flower is hand-harvested at peak potency and carefully processed to preserve its beneficial compounds. It's a labor-intensive process, but one that reflects our commitment to both quality and environmental stewardship.</p>

        <h2>Experience the Alpine Difference</h2>
        <p>When you use products enriched with Edelweiss extract, you're harnessing millions of years of evolution—nature's own solution to protecting against environmental stress. It's the perfect ingredient for modern life, where our skin faces daily challenges from pollution, UV radiation, and stress.</p>

        <p>Discover the transformative power of this remarkable Alpine flower in our Masque Hydratant & Apaisant 72H and other signature products.</p>
      `,
    },
  }

  return posts[id] || posts['1']
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPostById(params.id)

  return (
    <div className="min-h-screen pt-32 pb-20">
      <article className="container mx-auto px-4 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gold-600 transition-colors cursor-hover"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium">
            {post.category}
          </span>

          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mt-6 mb-6">
            {post.title}
          </h1>

          <div className="flex items-center space-x-6 text-gray-600">
            <span className="flex items-center">
              <FiUser className="mr-2" />
              {post.author}
            </span>
            <span className="flex items-center">
              <FiClock className="mr-2" />
              {post.readTime}
            </span>
            <span>{post.date}</span>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          className="max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="aspect-[21/9] rounded-3xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="max-w-3xl mx-auto prose prose-lg prose-gray prose-headings:font-serif prose-headings:font-bold prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <motion.div
          className="max-w-3xl mx-auto mt-16 text-center bg-gradient-to-br from-gold-50 to-gold-100 rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Experience Edelweiss Benefits
          </h3>
          <p className="text-gray-600 mb-6">
            Discover our products enriched with pure Edelweiss extract
          </p>
          <Link href="/shop">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-medium rounded-full hover:shadow-lg transition-shadow cursor-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </Link>
        </motion.div>
      </article>
    </div>
  )
}

