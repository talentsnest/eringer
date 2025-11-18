# 🚀 Optimisations de Performance - Implémentations

Ce document contient les optimisations concrètes à implémenter pour améliorer les performances du site.

---

## 1. Optimisation des Polices (next/font)

### Avant (globals.css)
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
```

### Après (app/layout.tsx)
```typescript
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

// Dans le body
<body className={`${playfair.variable} ${inter.variable}`}>
```

### Dans tailwind.config.js
```javascript
fontFamily: {
  serif: ['var(--font-playfair)', 'serif'],
  sans: ['var(--font-inter)', 'sans-serif'],
}
```

**Gain:** -500ms-1s, meilleur CLS

---

## 2. Mémorisation React - ProductCard

### Avant
```typescript
export default function ProductCard({ ... }) {
  // Pas de mémorisation
}
```

### Après
```typescript
import { memo, useCallback, useMemo } from 'react'

const ProductCard = memo(function ProductCard({ ... }) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // ... code existant
  }, [])

  const videoConfig = useMemo(() => ({
    threshold: 0.5,
    rootMargin: '0px',
  }), [])

  // ... reste du code
})

export default ProductCard
```

**Gain:** -30-50% de re-renders

---

## 3. Optimisation Vidéos - HeroSection

### Avant
```tsx
<video
  preload="auto"  // ❌
  autoPlay
  muted
  loop
/>
```

### Après
```tsx
<video
  preload="metadata"  // ✅
  autoPlay
  muted
  loop
  playsInline
  loading="lazy"  // Si supporté
/>
```

**Gain:** -1-2s de chargement initial

---

## 4. Lazy Loading des Sections

### Avant (app/page.tsx)
```typescript
import BestSellers from '@/components/home/BestSellers'
import IngredientsSection from '@/components/home/IngredientsSection'
// ... tous chargés immédiatement
```

### Après
```typescript
import dynamic from 'next/dynamic'

const BestSellers = dynamic(() => import('@/components/home/BestSellers'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
})

const IngredientsSection = dynamic(
  () => import('@/components/home/IngredientsSection'),
  {
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  }
)
```

**Gain:** -500ms-1s de temps initial

---

## 5. Optimisation next.config.js

### Configuration Complète
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Compression
  compress: true,
  
  // Sécurité
  poweredByHeader: false,
  
  // Images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Headers de cache
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

**Gain:** Meilleur caching, -20-30% de requêtes répétées

---

## 6. useMemo pour Filtres (Shop Page)

### Avant
```typescript
const filteredProducts = products.filter(...)
```

### Après
```typescript
const filteredProducts = useMemo(() => {
  if (selectedCategory === 'All') return products
  return products.filter(p => p.category === selectedCategory)
}, [products, selectedCategory])
```

**Gain:** Évite recalculs inutiles

---

## 7. Optimisation CSS - will-change

### Ajouter dans globals.css
```css
/* GPU acceleration pour animations */
.motion-element,
[data-framer-component] {
  will-change: transform, opacity;
}

/* Pause animations hors viewport */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Gain:** Meilleure fluidité 60fps

---

## 8. Priority Images

### HeroSection - Image/Vidéo Above-the-fold
```tsx
// Dans HeroSection, marquer comme priority
<Image
  src={heroImage}
  priority  // ✅ Chargement prioritaire
  ...
/>
```

**Gain:** Meilleur LCP

---

## 9. Prefetch Links

### Header Navigation
```tsx
import Link from 'next/link'

<Link href="/shop" prefetch={true}>
  Shop
</Link>
```

**Gain:** Navigation plus rapide

---

## 10. Intersection Observer Hook Réutilisable

### Créer hooks/useIntersectionObserver.ts
```typescript
import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1, ...options }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options.threshold, options.rootMargin])

  return { ref, isIntersecting }
}
```

**Gain:** Code plus propre, meilleure performance

---

## 11. Compression Vidéo - Script

### Créer scripts/compress-videos.sh
```bash
#!/bin/bash

# Compresser toutes les vidéos dans public/videos
for video in public/videos/*.mp4; do
  if [ -f "$video" ]; then
    filename=$(basename "$video" .mp4)
    echo "Compressing $filename..."
    
    # Compresser MP4
    ffmpeg -i "$video" \
      -vcodec libx264 \
      -crf 28 \
      -preset slow \
      -acodec aac \
      -b:a 128k \
      -movflags +faststart \
      "public/videos/${filename}_compressed.mp4"
    
    # Créer version WebM
    ffmpeg -i "$video" \
      -c:v libvpx-vp9 \
      -crf 30 \
      -b:v 0 \
      -c:a libopus \
      -b:a 128k \
      "public/videos/${filename}.webm"
  fi
done

echo "Compression terminée!"
```

**Gain:** -60-80% de taille vidéo

---

## 12. Web Vitals Tracking

### Créer lib/web-vitals.ts
```typescript
import { onCLS, onFID, onLCP } from 'web-vitals'

export function reportWebVitals() {
  if (typeof window !== 'undefined') {
    onCLS(console.log)
    onFID(console.log)
    onLCP(console.log)
    
    // Ou envoyer à votre analytics
    // onLCP((metric) => {
    //   fetch('/api/analytics', {
    //     method: 'POST',
    //     body: JSON.stringify(metric),
    //   })
    // })
  }
}
```

### Dans app/layout.tsx
```typescript
import { reportWebVitals } from '@/lib/web-vitals'

export default function RootLayout({ children }) {
  if (typeof window !== 'undefined') {
    reportWebVitals()
  }
  // ...
}
```

**Gain:** Monitoring des performances

---

## 📊 Ordre d'Implémentation Recommandé

1. **Jour 1:** Optimisation polices (next/font) - 30min
2. **Jour 1:** Changer preload vidéos - 15min
3. **Jour 1:** React.memo ProductCard - 30min
4. **Jour 2:** Lazy loading sections - 1h
5. **Jour 2:** useMemo filtres - 30min
6. **Jour 3:** Optimisation next.config.js - 1h
7. **Semaine 2:** Compression vidéos/images - 1 jour
8. **Semaine 2:** Web Vitals tracking - 2h

---

## ✅ Checklist d'Implémentation

- [ ] Optimiser polices avec next/font
- [ ] Changer preload="auto" → "metadata"
- [ ] Ajouter React.memo sur ProductCard
- [ ] Implémenter useCallback pour handlers
- [ ] Lazy loading sections non critiques
- [ ] useMemo pour calculs coûteux
- [ ] Optimiser next.config.js
- [ ] Compresser toutes les vidéos
- [ ] Convertir images en WebP/AVIF
- [ ] Ajouter will-change CSS
- [ ] Implémenter Web Vitals tracking
- [ ] Tester avec Lighthouse

---

**Note:** Commencer par les optimisations rapides (Jour 1-2) pour des résultats immédiats, puis continuer avec les optimisations plus longues.

