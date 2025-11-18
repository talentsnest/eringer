// Fonction utilitaire pour tracker les clics
export const trackClick = async (url: string, label: string, type: 'product' | 'external' | 'social' | 'internal' = 'external') => {
  try {
    await fetch('/api/track-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        label,
        type,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error('Error tracking click:', error)
  }
}

// Fonction pour gérer les clics avec tracking
export const handleTrackedClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  url: string,
  label: string,
  type: 'product' | 'external' | 'social' | 'internal' = 'external'
) => {
  e.preventDefault()
  trackClick(url, label, type)
  // Rediriger après un court délai pour s'assurer que le tracking est envoyé
  setTimeout(() => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }, 100)
}


