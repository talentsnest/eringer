'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function LangUpdater() {
  const params = useParams()
  const locale = (params?.locale as string) || 'fr'

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  return null
}

