import dynamic from 'next/dynamic'
import HeroSection from '@/components/home/HeroSection'
import BestSellers from '@/components/home/BestSellers' // Charger immédiatement - section principale

// Lazy load uniquement les sections vraiment non critiques

// Charger les sections importantes immédiatement pour éviter le scrolling saccadé
import IngredientsSection from '@/components/home/IngredientsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import MediaSection from '@/components/home/MediaSection'
import BestSellersSection from '@/components/home/BestSellersSection'

// Lazy load uniquement les sections vraiment non critiques (en bas de page)
const BlogSection = dynamic(() => import('@/components/home/BlogSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
})

const WhereToFindUsSection = dynamic(
  () => import('@/components/home/WhereToFindUsSection'),
  {
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  }
)

export default function Home() {
  return (
    <>
      <HeroSection />
      <div id="products" data-section="products">
      <BestSellers />
      </div>
      <div id="ingredients">
      <IngredientsSection />
      </div>
      <div id="testimonials">
      <TestimonialsSection />
      </div>
      <div id="media">
        <MediaSection />
      </div>
      <div id="blog">
      <BlogSection />
      </div>
      <div id="best-sellers">
        <BestSellersSection />
      </div>
      <div id="where-to-find-us">
        <WhereToFindUsSection />
      </div>
    </>
  )
}


