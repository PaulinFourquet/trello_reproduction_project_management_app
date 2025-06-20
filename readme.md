# TrellTech Mobile App

## Description :

  Trelltech Mobile App est une application mobile développée pour offrir une expérience intuitive aux utilisateurs de Trelltech. Elle permet d'interagir avec l'API Trelltech pour effectuer diverses actions directement depuis un appareil mobile.

### Fonctionnalités : 
  - Gestion des Espaces de Travail :
      Création, mise à jour, suppression et affichage des espaces de travail.
  - Gestion des Tableaux :
      Création de tableaux avec choix de modèle (ex : kanban), puis mise à jour, suppression et affichage.
  - Gestion des Listes :
      Création, mise à jour, suppression et affichage des listes.
  - Gestion des Cartes :
      Création, mise à jour, suppression et affichage des cartes dans une liste.
  - Assignation de Personnes :
      Attribution de personnes à une carte.

### Technologies Utilisées :
  - React Native
  - JavaScript
  - Expo

### Installation :
*Assurez-vous d'avoir Node.js et npm installés sur votre machine*
  1. Cloner le dépôt : git clone https://github.com/PaulinFourquet/trello_reproduction_project_management_app.git
  2. Accéder au répertoire du projet : cd trello_reproduction_project_management_app
  3. Installer les dépendances : `npx install`
  4. Créer un fichier env.js à la racine du projet avec votre clef api et votre token trello
  5. Lancer l'application : `npx expo start`

## Développement :

Pour construire le projet en développement, suivez ces étapes :

1. Lancer le serveur de développement : `npx expo start`
2. Utiliser l'application Expo Go sur votre appareil mobile pour scanner le code QR et prévisualiser l'application.
3. Apporter des modifications au code et les voir reflétées en temps réel.

## Production :

Pour construire le projet en production, suivez ces étapes :

1. Générer une version de production : `npm run build` pour build sur toute les plateformes, `npm run build:ios` pour build sur ios et `npm run build:android` pour build pour android
2. Déployer les fichiers construits sur la plateforme d'hébergement de votre choix.

# Auteurs : 
  - Ryan
  - Jean-Francis
  - Paulin

# Licence : 

Ce projet est sous licence sous les termes de la licence [MIT](LICENSE).

Vous êtes libre de : Utiliser le code à des fins privées.
