#!/bin/bash

# Script d'optimisation d'images pour WebP et AVIF
# Utilise sharp-cli ou ImageMagick pour convertir les images

echo "🖼️  Début de l'optimisation des images..."

# Vérifier si sharp-cli est installé
if command -v sharp &> /dev/null; then
    USE_SHARP=true
    echo "✅ Utilisation de sharp-cli"
elif command -v convert &> /dev/null; then
    USE_SHARP=false
    echo "✅ Utilisation d'ImageMagick"
else
    echo "❌ Aucun outil d'optimisation trouvé."
    echo "   Installez sharp-cli: npm install -g sharp-cli"
    echo "   Ou ImageMagick: brew install imagemagick"
    exit 1
fi

# Créer un dossier de backup
BACKUP_DIR="public/images/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Backup créé dans: $BACKUP_DIR"

# Compter les images
IMAGE_COUNT=$(find public/images -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | grep -v ".webp" | grep -v ".avif" | wc -l | tr -d ' ')
echo "📊 $IMAGE_COUNT image(s) à optimiser"

# Fonction d'optimisation avec sharp
optimize_with_sharp() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"
    local ext="${filename##*.}"
    local dir=$(dirname "$input")
    
    echo ""
    echo "🔄 Optimisation de: $filename"
    
    # Backup original
    cp "$input" "$BACKUP_DIR/${filename}"
    
    # Créer WebP (qualité 80 = bon compromis)
    sharp -i "$input" -o "${dir}/${name}.webp" -q 80 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ WebP créé"
    else
        echo "⚠️  Échec WebP"
    fi
    
    # Créer AVIF (qualité 50 = très bonne compression)
    sharp -i "$input" -o "${dir}/${name}.avif" -q 50 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ AVIF créé"
    else
        echo "⚠️  Échec AVIF (peut nécessiter libavif)"
    fi
}

# Fonction d'optimisation avec ImageMagick
optimize_with_imagemagick() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"
    local dir=$(dirname "$input")
    
    echo ""
    echo "🔄 Optimisation de: $filename"
    
    # Backup original
    cp "$input" "$BACKUP_DIR/${filename}"
    
    # Créer WebP
    convert "$input" -quality 80 "${dir}/${name}.webp" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ WebP créé"
    else
        echo "⚠️  Échec WebP"
    fi
    
    # Créer AVIF (si supporté)
    convert "$input" -quality 50 "${dir}/${name}.avif" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ AVIF créé"
    else
        echo "⚠️  AVIF non supporté (installez libheif)"
    fi
}

# Traiter toutes les images
find public/images -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) ! -name "*.webp" ! -name "*.avif" | while read image; do
    if [ "$USE_SHARP" = true ]; then
        optimize_with_sharp "$image"
    else
        optimize_with_imagemagick "$image"
    fi
done

echo ""
echo "✨ Optimisation terminée!"
echo "📦 Les originaux sont sauvegardés dans: $BACKUP_DIR"
echo ""
echo "💡 Next.js utilisera automatiquement WebP/AVIF si disponible"
echo "   grâce à la configuration dans next.config.js"


