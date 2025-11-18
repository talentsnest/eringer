#!/bin/bash

# Script de compression vidéo pour optimiser les performances
# Utilise ffmpeg pour compresser les vidéos MP4 et créer des versions WebM

echo "🎬 Début de la compression des vidéos..."

# Vérifier si ffmpeg est installé
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg n'est pas installé. Installez-le avec: brew install ffmpeg"
    exit 1
fi

# Créer un dossier de backup
BACKUP_DIR="public/videos/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Backup créé dans: $BACKUP_DIR"

# Compter les vidéos
VIDEO_COUNT=$(find public/videos -name "*.mp4" -not -name "*_compressed.mp4" -not -name "*_backup.mp4" | wc -l | tr -d ' ')
echo "📊 $VIDEO_COUNT vidéo(s) à compresser"

# Fonction de compression
compress_video() {
    local input="$1"
    local filename=$(basename "$input" .mp4)
    local dir=$(dirname "$input")
    
    echo ""
    echo "🔄 Compression de: $filename"
    
    # Backup original
    cp "$input" "$BACKUP_DIR/${filename}_backup.mp4"
    
    # Compresser MP4 (CRF 28 = bonne qualité, taille réduite)
    ffmpeg -i "$input" \
        -vcodec libx264 \
        -crf 28 \
        -preset slow \
        -acodec aac \
        -b:a 128k \
        -movflags +faststart \
        -y \
        "${dir}/${filename}_compressed.mp4" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        # Remplacer l'original par la version compressée
        mv "${dir}/${filename}_compressed.mp4" "$input"
        echo "✅ MP4 compressé avec succès"
        
        # Créer version WebM (meilleure compression)
        ffmpeg -i "$input" \
            -c:v libvpx-vp9 \
            -crf 30 \
            -b:v 0 \
            -c:a libopus \
            -b:a 128k \
            -y \
            "${dir}/${filename}.webm" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            echo "✅ WebM créé avec succès"
        else
            echo "⚠️  Échec de la création WebM (non bloquant)"
        fi
    else
        echo "❌ Échec de la compression"
        return 1
    fi
}

# Traiter toutes les vidéos MP4
find public/videos -name "*.mp4" -not -name "*_compressed.mp4" -not -name "*_backup.mp4" | while read video; do
    compress_video "$video"
done

echo ""
echo "✨ Compression terminée!"
echo "📦 Les originaux sont sauvegardés dans: $BACKUP_DIR"
echo ""
echo "💡 Pour utiliser les versions WebM dans le code, ajoutez:"
echo "   <source src=\"video.webm\" type=\"video/webm\" />"
echo "   avant le <source src=\"video.mp4\" type=\"video/mp4\" />"


