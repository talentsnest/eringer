import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import PageTransition from '@/components/ui/PageTransition'
import PageLoader from '@/components/ui/PageLoader'
import WebVitals from '@/components/ui/WebVitals'
import LangUpdater from '@/components/ui/LangUpdater'
import { LoaderProvider } from '@/contexts/LoaderContext'
import { Locale } from '@/lib/i18n/translations'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const { locale } = await params
  
  const metadata = {
    fr: {
      title: 'ERINGER Switzerland | Soins de Luxe Suisses',
      description: 'Découvrez l\'éclat intemporel avec ERINGER Switzerland. Soins de luxe suisses enrichis d\'ingrédients alpins naturels comme l\'Edelweiss et le Reishi.',
      keywords: 'soins de luxe, cosmétiques suisses, Edelweiss, ingrédients naturels, beauté premium',
    },
    en: {
      title: 'ERINGER Switzerland | Luxury Swiss Skincare',
      description: 'Discover timeless radiance with ERINGER Switzerland. Premium Swiss skincare enriched with natural Alpine ingredients like Edelweiss and Reishi.',
      keywords: 'luxury skincare, Swiss cosmetics, Edelweiss, natural ingredients, premium beauty',
    },
  }

  const meta = metadata[locale] || metadata.fr

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: 'ERINGER Switzerland' }],
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  return (
    <>
      <LangUpdater />
      <WebVitals />
      <LoaderProvider>
      <PageLoader />
      <ScrollProgress />
      <Header />
      <PageTransition>
        <main className="min-h-screen">
          {children}
        </main>
      </PageTransition>
      <Footer />
      </LoaderProvider>
    </>
  )
}

