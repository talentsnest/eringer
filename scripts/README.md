# 🚀 Scripts d'Optimisation

Ce dossier contient les scripts pour optimiser les assets du site (vidéos et images).

## 📋 Prérequis

### Pour la compression vidéo
```bash
brew install ffmpeg
```

### Pour l'optimisation d'images
**Option 1: sharp-cli (recommandé)**
```bash
npm install -g sharp-cli
```

**Option 2: ImageMagick**
```bash
brew install imagemagick
```

## 🎬 Compression Vidéo

Compresse toutes les vidéos MP4 dans `public/videos/` et crée des versions WebM.

```bash
npm run optimize:videos
# ou
bash scripts/compress-videos.sh
```

**Ce que fait le script:**
- ✅ Crée un backup des vidéos originales
- ✅ Compresse les MP4 (réduction de 60-80% de taille)
- ✅ Crée des versions WebM (meilleure compression)
- ✅ Préserve les originaux dans un dossier backup

**Gain estimé:** -3-5s de temps de chargement

## 🖼️ Optimisation Images

Convertit toutes les images PNG/JPG en WebP et AVIF.

```bash
npm run optimize:images
# ou
bash scripts/optimize-images.sh
```

**Ce que fait le script:**
- ✅ Crée un backup des images originales
- ✅ Génère des versions WebP (qualité 80)
- ✅ Génère des versions AVIF (qualité 50)
- ✅ Préserve les originaux dans un dossier backup

**Gain estimé:** -2-3s de temps de chargement, meilleur LCP

## 🔄 Optimisation Complète

Exécute les deux optimisations en une seule commande:

```bash
npm run optimize:all
```

## 📝 Notes

- Les backups sont créés dans `public/videos/backup_YYYYMMDD_HHMMSS/` et `public/images/backup_YYYYMMDD_HHMMSS/`
- Next.js utilisera automatiquement WebP/AVIF si disponible grâce à la configuration dans `next.config.js`
- Pour utiliser les vidéos WebM, ajoutez `<source src="video.webm" type="video/webm" />` avant le MP4 dans votre code

## ⚠️ Important

- **Toujours faire un commit Git avant d'exécuter les scripts**
- Les scripts modifient les fichiers originaux après compression réussie
- Les backups sont conservés pour récupération si nécessaire

