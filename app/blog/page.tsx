'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight, FiClock } from 'react-icons/fi'

const blogPosts = [
  {
    id: '1',
    title: 'The Power of Edelweiss in Skincare',
    excerpt: 'Discover why this rare Alpine flower has become a cornerstone of luxury skincare and how its unique properties can transform your skin.',
    image: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=800',
    category: 'Ingredients',
    date: 'November 17, 2025',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Building Your Perfect Morning Routine',
    excerpt: 'Expert tips for creating a skincare routine that works for your unique needs and fits seamlessly into your busy lifestyle.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200',
    category: 'Skincare Tips',
    date: 'November 10, 2025',
    readTime: '7 min read',
  },
  {
    id: '3',
    title: 'Sustainability in Swiss Cosmetics',
    excerpt: 'How we maintain our commitment to the environment while delivering luxury skincare that meets the highest standards.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
    category: 'Sustainability',
    date: 'November 3, 2025',
    readTime: '6 min read',
  },
  {
    id: '4',
    title: 'Understanding Your Skin Type',
    excerpt: 'A comprehensive guide to identifying your skin type and choosing the right products for optimal results.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800',
    category: 'Skincare Tips',
    date: 'October 27, 2025',
    readTime: '8 min read',
  },
  {
    id: '5',
    title: 'The Science of Anti-Aging',
    excerpt: 'Explore the latest research in anti-aging skincare and how Swiss precision brings these innovations to life.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800',
    category: 'Science',
    date: 'October 20, 2025',
    readTime: '10 min read',
  },
  {
    id: '6',
    title: 'Alpine Botanicals: Nature\'s Secret',
    excerpt: 'Learn about the unique properties of Alpine plants and why they\'re so effective in skincare formulations.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800',
    category: 'Ingredients',
    date: 'October 13, 2025',
    readTime: '6 min read',
  },
]

export default function BlogPage() {
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
            Journal
          </motion.p>
          <motion.h1
            className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Stories & Insights
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore the world of luxury skincare, sustainability, and Swiss precision
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group cursor-hover"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.id}`}>
                <div className="overflow-hidden rounded-2xl mb-4">
                  <motion.div
                    className="aspect-[4/3] bg-gray-200 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>

                <div className="space-y-3">
                  {/* Category & Read Time */}
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center">
                      <FiClock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-gold-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Date & Read More */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <motion.span
                      className="flex items-center text-gold-600 text-sm font-medium group-hover:text-gold-700"
                      whileHover={{ x: 5 }}
                    >
                      Read More
                      <FiArrowRight className="ml-2" />
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

