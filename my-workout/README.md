# **Documentation complète pour le projet "Journal d'entraînement"**

---

## **Introduction**

L'application "Journal d'entraînement" est conçue pour permettre aux utilisateurs de suivre leurs entraînements, enregistrer leurs progrès, et visualiser des données clés sur leur activité physique. L'objectif est de fournir une interface intuitive et des fonctionnalités avancées adaptées aux débutants comme aux sportifs réguliers.

---

## **Fonctionnalités actuelles**

### **1. Gestion des entraînements (Workouts)**

- **Ajout de plusieurs types d'exercices** dans un workout :
  - Sélection d'exercices existants avec répétitions, poids, et temps de pause.
  - Calcul automatique de la charge totale (somme des répétitions × poids).
- **Gestion des informations temporelles** :
  - Saisie ou préremplissage de la date et de l'heure.
  - Calcul automatique de la durée totale de l'entraînement (temps de pause + estimation par répétition).
  - Option pour saisir manuellement la durée totale.

---

### **2. Interface utilisateur (UI) avec Tailwind CSS**

- **Formulaire stylisé** :
  - Ajout d'exercices dynamiquement.
  - Affichage en temps réel des exercices ajoutés.
  - Boutons d'action clairs et accessibles.
- **Tableau de bord** :
  - Liste des workouts avec :
    - Titre.
    - Date et heure.
    - Charge totale.
    - Durée totale.
    - Liste des exercices (nom, répétitions, poids, pause).
  - Présentation propre et responsive.

---

### **3. Authentification**

- Gestion de l'accès utilisateur avec Firebase :
  - Redirection automatique des utilisateurs non authentifiés vers la page de connexion.
  - Affichage personnalisé basé sur l'état de connexion.

---

## **Refactorisation prévue**

### **1. Découpage en composants**

- **Atomic Design** :
  - Décomposer le formulaire en composants réutilisables :
    - `Input` : Composant pour les champs de saisie.
    - `Button` : Composant pour les boutons.
    - `Form` : Conteneur pour gérer l'ensemble du formulaire.
  - Utiliser ces composants pour simplifier la lisibilité et la maintenabilité.

### **2. Centralisation des fonctions**

- Créer des **hooks personnalisés** pour des fonctionnalités spécifiques :
  - ✅`useFetchExercises` : Gérer la récupération des exercices via un contexte global.
  - ✅`useWorkoutForm` : Encapsuler la logique de gestion des entrées dans le formulaire.
- Déplacer les fonctions utilitaires dans des fichiers dédiés :
  - ✅Formatage des dates/heures.
  - ✅Calculs (durée totale, charge totale).

### **3. Mise en place d'un contexte**

- **Contexte global pour les exercices** :
  - ✅Gérer la récupération et la mise en cache des exercices (éviter des appels API répétitifs).
  - ✅Exemple : `ExercisesContext` pour partager les données entre plusieurs composants.

---

## **Fonctionnalités envisagées**

### **1. Création et gestion d'exercices personnalisés**

- Permettre à l'utilisateur d'ajouter ses propres exercices s'ils ne figurent pas dans la liste fournie.
- Afficher une liste mixte :
  - Exercices de l'API.
  - Exercices personnalisés.

### **2. Page d'accueil dynamique**

- **Pour les utilisateurs authentifiés** :
  - ✅Afficher les X derniers entraînements (ex. : les 5 derniers).
  - ✅Fournir des statistiques clés (charge totale, durée cumulée).
- **Pour les visiteurs non authentifiés** :
  - ✅Afficher un message promotionnel ou un aperçu des fonctionnalités de l'application.

---

## **Arborescence du projet après refactorisation**

```
src/
├── assets/                # Fichiers statiques (CSS, images)
├── components/            # Composants réutilisables
│   ├── ✅CardExercise.jsx
│   ├── ✅Header.jsx
│   ├── ✅Layout.jsx
│   ├── ✅NavBar.jsx
│   ├── Button.jsx
│   ├── Input.jsx
│   └── ✅WorkoutForm.jsx
├── context/               # Contexte global
│   ├── ✅AuthContext.jsx
│   └── ✅ExercisesContext.jsx
├── hooks/                 # Hooks personnalisés
│   ├── useFetchExercises.js
│   └── ✅useWorkoutForm.js
├── pages/                 # Pages principales
│   ├── ✅Dashboard.jsx
│   ├── ✅Login.jsx
│   ├── ✅Signup.jsx
│   └── ✅Home.jsx
├── services/              # Fonctions d'interaction API
│   ├── ✅exerciseApi.js
│   └── ✅workoutApi.js
├── utils/                 # Fonctions utilitaires
│   ├── ✅calculate.js       # Calculs (charge, durée, etc.)
│   └── ✅formatDate.js      # Formatage des dates/heures
└── ✅Home.jsx                # Composant principal
```

---

## **Roadmap**

### **Court terme :**

- Découper et refactoriser le code (composants, hooks, contexte).
- Ajouter la gestion des exercices personnalisés.
- ✅Dynamiser la page d'accueil selon l'état de l'utilisateur. (limitation de call api "Spoonacular")

### **Moyen terme :**

- Ajouter des statistiques globales (charge cumulée, progression, etc.).
- Intégrer des graphiques simples pour visualiser les progrès.

### **Long terme :**

- Ajouter une gestion multi-utilisateurs (amis, partage de données).
- Intégrer un mode hors ligne avec stockage local.

---

## **Installation et lancement**

### **1. Installation des dépendances**

```bash
npm install
```

### **2. Lancer le serveur de développement**

```bash
npm run dev
```

### **3. Lancer JSON Server (pour l'API locale)**

```bash
json-server --watch db.json --port 5000
```

---

### Debug

---

### Info pour tester

#### Authentification via firebase

Bonjour Ali 😀, je sais que je ne devrais pas te donner les infos suivantes mais c'est + simple

- créer un `.env` ou un `.env.local` à la racine du projet

```
# FireBase
VITE_FIREBASE_API_KEY=AIzaSyDQgmISGsEYLrKKMWbLq-iVEuUEMYA6KA4
VITE_FIREBASE_AUTH_DOMAIN=my-workout-c79c2.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-workout-c79c2
VITE_FIREBASE_STORAGE_BUCKET=my-workout-c79c2.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1088084142844
VITE_FIREBASE_APP_ID=1:1088084142844:web:dd06d3566072aacef30579
VITE_MEASUREMENT_ID=G-89C6GEZVDR

# Spoonacular
VITE_SPOONACULAR_API_KEY=`ta_clé_api`

```

#### Spoonacular

1. créer une boite mail temporaire [tempMail](https://temp-mail.org/fr/view/6748a417a8c45a001b1307ff)
2. créer un compte sur [spoonacular](https://spoonacular.com/)
