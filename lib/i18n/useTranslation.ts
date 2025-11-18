'use client'

import { useParams } from 'next/navigation'
import { translations, Locale } from './translations'

export function useTranslation() {
  const params = useParams()
  const locale = (params?.locale as Locale) || 'fr'

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return { t, locale, translations: translations[locale] }
}

