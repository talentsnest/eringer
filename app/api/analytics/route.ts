import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const analyticsFilePath = path.join(process.cwd(), 'data', 'analytics.json')

export async function GET() {
  try {
    // Vérifier si le fichier existe
    if (!fs.existsSync(analyticsFilePath)) {
      return NextResponse.json({ clicks: [], stats: {} })
    }

    // Lire les données
    const data = JSON.parse(fs.readFileSync(analyticsFilePath, 'utf-8'))
    const clicks = data.clicks || []

    // Calculer les statistiques
    const stats: Record<string, { count: number; label: string; type: string; url: string }> = {}

    clicks.forEach((click: { url: string; label: string; type: string }) => {
      const key = click.url
      if (!stats[key]) {
        stats[key] = {
          count: 0,
          label: click.label,
          type: click.type,
          url: click.url,
        }
      }
      stats[key].count++
    })

    // Convertir en tableau et trier par nombre de clics
    const statsArray = Object.values(stats).sort((a, b) => b.count - a.count)

    return NextResponse.json({
      clicks,
      stats: statsArray,
      totalClicks: clicks.length,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ clicks: [], stats: [], totalClicks: 0 })
  }
}


