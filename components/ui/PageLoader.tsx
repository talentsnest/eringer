'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useLoader } from '@/contexts/LoaderContext'

export default function PageLoader() {
  const { isLoading, setIsLoading, fadeOut, setFadeOut } = useLoader()
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasInitializedRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const minDisplayTimeRef = useRef(false)
  const hasStartedFadeOutRef = useRef(false)

  // Fonction helper pour démarrer le fade-out avec respect du délai minimum
  const startFadeOutSafe = useCallback(() => {
    if (hasStartedFadeOutRef.current) return
    hasStartedFadeOutRef.current = true

    // Attendre le délai minimum si nécessaire
    const checkAndFadeOut = () => {
      if (!minDisplayTimeRef.current) {
        setTimeout(checkAndFadeOut, 100)
        return
      }
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setFadeOut(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
    
    checkAndFadeOut()
  }, [setFadeOut, setIsLoading])

  // Minimum d'affichage pour s'assurer que le loader est visible même avec cache
  useEffect(() => {
    if (!isLoading) {
      minDisplayTimeRef.current = false
      hasStartedFadeOutRef.current = false
      return
    }
    
    // Délai minimum de 800ms pour que le loader soit visible
    const minDisplayTimer = setTimeout(() => {
      minDisplayTimeRef.current = true
    }, 800)

    return () => {
      clearTimeout(minDisplayTimer)
    }
  }, [isLoading])

  // Gérer la vidéo quand elle est montée
  useEffect(() => {
    if (!isLoading) return
    
    const video = videoRef.current
    if (!video) {
      // Si pas de vidéo, fermer le loader après un court délai
      timeoutRef.current = setTimeout(() => {
        startFadeOutSafe()
      }, 500)
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }

    if (hasInitializedRef.current) return
    hasInitializedRef.current = true

    // Set video playback speed to 2x
    video.playbackRate = 2

    let hasEnded = false

    // Fonction pour démarrer le fade-out
    const startFadeOut = () => {
      if (hasEnded) return
      hasEnded = true
      startFadeOutSafe()
    }

    // Gérer la fin de la vidéo
    const handleVideoEnd = () => {
      startFadeOut()
    }

    // Forcer le lancement de la vidéo
    const forcePlay = () => {
      if (hasEnded || !video) return
      video.play().catch((error) => {
        console.error('Erreur de lecture vidéo:', error)
        startFadeOut()
      })
    }

    // Event listeners
    video.addEventListener('ended', handleVideoEnd)
    video.addEventListener('canplay', forcePlay, { once: true })
    video.addEventListener('canplaythrough', forcePlay, { once: true })
    video.addEventListener('loadeddata', forcePlay, { once: true })

    // Fallback agressif : passer au contenu après 3 secondes max
    timeoutRef.current = setTimeout(() => {
      if (!hasEnded) {
        console.warn('Timeout vidéo loader, passage au contenu')
        startFadeOut()
      }
    }, 3000)

    // Essayer de lancer immédiatement si déjà chargé
    if (video.readyState >= 3) {
      forcePlay()
    } else {
      // Attendre un peu et réessayer
      setTimeout(() => {
        if (video.readyState >= 2 && !hasEnded && video) {
          forcePlay()
        }
      }, 200)
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (video) {
        video.removeEventListener('ended', handleVideoEnd)
      }
    }
  }, [isLoading, setFadeOut, setIsLoading, startFadeOutSafe])

  // Reset quand isLoading change
  useEffect(() => {
    if (!isLoading) {
      hasInitializedRef.current = false
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: fadeOut ? 0 : 1,
          scale: 1
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full h-full flex items-center justify-center"
      >
        <video
          ref={videoRef}
          className="w-1/3 h-1/3 object-contain"
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedData={(e) => {
            const video = e.currentTarget
            video.play().catch(() => {})
          }}
          onCanPlay={(e) => {
            const video = e.currentTarget
            if (video.paused) {
              video.play().catch(() => {})
            }
          }}
          onEnded={() => {
            startFadeOutSafe()
          }}
          onError={() => {
            console.error('Erreur de chargement vidéo loader')
            startFadeOutSafe()
          }}
        >
          <source src="/videos/loader.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </motion.div>
  )
}

