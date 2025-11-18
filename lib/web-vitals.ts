import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from 'web-vitals'

type WebVitalsCallback = (metric: Metric) => void

// Fonction pour envoyer les métriques à votre service d'analytics
function sendToAnalytics(metric: Metric) {
  // Option 1: Console (pour développement)
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric.name, metric.value, metric.id)
  }

  // Option 2: Envoyer à votre API
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // })

  // Option 3: Google Analytics 4
  // if (typeof window !== 'undefined' && (window as any).gtag) {
  //   (window as any).gtag('event', metric.name, {
  //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //     event_label: metric.id,
  //     non_interaction: true,
  //   })
  // }
}

// Fonction principale pour reporter les Web Vitals
export function reportWebVitals(onPerfEntry?: WebVitalsCallback) {
  if (typeof window === 'undefined') return

  const callback = onPerfEntry || sendToAnalytics

  // Largest Contentful Paint (LCP)
  // Mesure le temps de chargement du plus grand élément visible
  onLCP(callback)

  // Interaction to Next Paint (INP) - remplace FID
  // Mesure le temps de réponse aux interactions
  onINP(callback)

  // Cumulative Layout Shift (CLS)
  // Mesure la stabilité visuelle
  onCLS(callback)

  // First Contentful Paint (FCP)
  // Mesure le temps jusqu'au premier rendu de contenu
  onFCP(callback)

  // Time to First Byte (TTFB)
  // Mesure le temps de réponse du serveur
  onTTFB(callback)
}

// Export des types pour TypeScript
export type { Metric }

