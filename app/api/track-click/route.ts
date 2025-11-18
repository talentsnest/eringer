import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const analyticsFilePath = path.join(process.cwd(), 'data', 'analytics.json')

// S'assurer que le dossier data existe
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Initialiser le fichier analytics s'il n'existe pas
const initializeAnalytics = () => {
  ensureDataDirectory()
  if (!fs.existsSync(analyticsFilePath)) {
    fs.writeFileSync(analyticsFilePath, JSON.stringify({ clicks: [] }, null, 2))
  }
}

export async function POST(request: NextRequest) {
  try {
    initializeAnalytics()

    const body = await request.json()
    const { url, label, type, timestamp } = body

    // Lire les données existantes
    const data = JSON.parse(fs.readFileSync(analyticsFilePath, 'utf-8'))
    
    // Ajouter le nouveau clic
    data.clicks.push({
      url,
      label,
      type,
      timestamp,
    })

    // Sauvegarder
    fs.writeFileSync(analyticsFilePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking click:', error)
    return NextResponse.json({ success: false, error: 'Failed to track click' }, { status: 500 })
  }
}



