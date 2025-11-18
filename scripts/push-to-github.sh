#!/bin/bash

# Script pour pousser vers GitHub
# Usage: ./scripts/push-to-github.sh

set -e

echo "🚀 Poussage vers GitHub..."

# Vérifier que nous sommes dans un repo git
if [ ! -d .git ]; then
    echo "❌ Erreur: Ce n'est pas un dépôt Git"
    exit 1
fi

# Vérifier le remote
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Erreur: Le remote 'origin' n'est pas configuré"
    exit 1
fi

# Afficher le statut
echo "📊 Statut actuel:"
git status --short

# Demander confirmation
read -p "Voulez-vous continuer le push? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Push annulé"
    exit 1
fi

# Pousser vers GitHub
echo "⬆️  Poussage vers origin/main..."
git push -u origin main

echo "✅ Push réussi!"


