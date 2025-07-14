# MESSIE BOT

MESSIE BOT est une application web de chatbot avec plusieurs personnalités (Roméo, Guix, Lover, Toxic, Malin). Chaque personnalité a un style unique et interagit différemment avec l'utilisateur. L'application utilise l'API Gemini pour les réponses dynamiques.

## Fonctionnalités
- Interface de chat avec 5 personnalités (Roméo, Guix, Lover, Toxic, Malin).
- Roméo Bot demande le sexe de l'utilisateur et donne un numéro au 5e message pour une fille, ou passe en mode Toxic après 5 messages haineux pour un garçon.
- Vidéo aléatoire affichée sous le message d'accueil.
- Image de fond dans la zone de chat.
- Barre de boutons transparente pour les personnalités.
- Lien WhatsApp dans le footer.

## Déploiement
1. Clonez ce dépôt.
2. Assurez-vous que les fichiers `assets/images/background.jpg` et `assets/videos/*.mp4` sont présents.
3. Configurez la clé API Gemini dans `script.js` (remplacez par une variable d'environnement pour la production).
4. Déployez sur Vercel en important ce dépôt.

## Prérequis
- Clé API Google Gemini activée.
- Node.js et Git (pour le développement local).
- Compte Vercel pour le déploiement.

## Installation
```bash
git clone https://github.com/votre-username/messie-bot.git
cd messie-bot