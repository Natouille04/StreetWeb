#!/bin/bash

# --- Configuration ---
# Définir le répertoire de votre projet (à adapter !)
PROJECT_DIR="./"

# --- Fonction d'exécution et de vérification des erreurs ---
run_command() {
    echo "▶️ Exécution de: $*"
    if "$@"; then
        echo "✅ Succès: $*"
        return 0
    else
        echo "❌ Échec lors de l'exécution de: $*" >&2
        return 1
    fi
}

# --- Début du Script ---

echo "=========================================="
echo "🚀 DÉPLOIEMENT DE L'APPLICATION COMMENCÉ"
echo "=========================================="

# 1. Naviguer vers le répertoire du projet
if ! run_command cd "$PROJECT_DIR"; then
    echo "🛑 Impossible de naviguer vers $PROJECT_DIR. Abandon."
    exit 1
fi

# 2. Exécuter git pull
if ! run_command git pull; then
    echo "🛑 Échec de git pull. Veuillez vérifier la connexion ou les conflits. Abandon."
    exit 1
fi

# 3. Exécuter npm run build
# Assurez-vous d'avoir les dépendances installées (npm install) si nécessaire
if ! run_command npm run build; then
    echo "🛑 Échec de npm run build. Vérifiez les erreurs de compilation. Abandon."
    exit 1
fi

# 4. Redémarrer le service Apache
# Cela nécessitera un mot de passe ou des droits sudo sans mot de passe configurés.
if ! run_command sudo systemctl restart apache2; then
    echo "🛑 Échec du redémarrage d'Apache2. Vérifiez si vous avez les droits sudo et si le service est actif. Abandon."
    exit 1
fi

echo "=========================================="
echo "🎉 DÉPLOIEMENT TERMINÉ AVEC SUCCÈS"
echo "=========================================="
