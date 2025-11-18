'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LoaderContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  fadeOut: boolean
  setFadeOut: (fadeOut: boolean) => void
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  // Réinitialiser le loader à chaque chargement de page
  useEffect(() => {
    // S'assurer que le loader est actif au démarrage
    setIsLoading(true)
    setFadeOut(false)

    // Cleanup au démontage
    return () => {
      setIsLoading(false)
      setFadeOut(false)
    }
  }, [])

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading, fadeOut, setFadeOut }}>
      {children}
    </LoaderContext.Provider>
  )
}

export function useLoader() {
  const context = useContext(LoaderContext)
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider')
  }
  return context
}

