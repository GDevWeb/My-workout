# **Documentation complète pour le projet "Journal d'entraînement"**

## **Introduction**

L'application **"Journal d'entraînement"** permet aux utilisateurs de suivre leurs séances d'entraînement, d'enregistrer leurs progrès et de visualiser des données clés sur leur activité physique. Cette application inclut des fonctionnalités avancées comme l'intégration d'exercices personnalisés, des statistiques, et des recettes santé (via Spoonacular).

---

## **Fonctionnalités**

### **1. Gestion des entraînements**

- **Ajout dynamique d'exercices** :
  - Sélection d'exercices avec répétitions, poids et temps de pause.
  - Calcul automatique de la charge totale (poids x répétitions).
  - Calcul de la durée totale (temps estimé + pauses).
- **Gestion des métadonnées** :
  - Date et heure préremplies ou modifiables.
  - Durée totale saisie manuellement ou calculée automatiquement.

---

### **2. Intégration Spoonacular (recettes)**

- **Récupération des recettes via API** :
  - Affichage de 8 recettes via un fetch depuis Spoonacular.
  - Options de filtrage par :
    - Régime végétarien.
    - Max protéines.
    - Max glucides.
- **Animations dynamiques** :
  - Effets de transition pour les cartes de recettes grâce à Framer Motion.

---

### **3. Interface utilisateur (UI)**

- **Tailwind CSS** :
  - Formulaires, boutons, et cartes stylisés.
  - Design responsive adapté aux mobiles et desktop.
- **Animations (Framer Motion)** :
  - Transitions fluides pour améliorer l'expérience utilisateur.

---

### **4. Authentification Firebase**

- **Connexion et inscription** :
  - Gestion des utilisateurs via Firebase Authentication.
  - Redirection automatique des utilisateurs non connectés.
- **Personnalisation** :
  - Affichage de contenu dynamique basé sur l'état de connexion.

---

## **Derniers ajouts**

### **1. Filtrage et recettes santé**

- Affichage des recettes Spoonacular.
- Intégration d'un filtre par catégories (ex. végétarien, max protéines).

### **2. Effets de transition**

- Utilisation de Framer Motion pour ajouter des animations aux composants (recettes, transitions entre pages).

---

## **Structure des dossiers**

```
src/
├── assets/                # Fichiers statiques (images, CSS)
├── components/            # Composants réutilisables
│   ├── CardExercise.jsx   # Carte pour un exercice individuel
│   ├── Header.jsx         # Barre de navigation
│   ├── Layout.jsx         # Layout principal avec Outlet
│   ├── NavBar.jsx         # Navigation principale
│   └── WorkoutForm.jsx    # Formulaire pour créer un workout
├── context/               # Gestion des contextes globaux
│   ├── AuthContext.jsx    # Contexte pour l'authentification
│   └── ExercisesContext.jsx # Contexte pour les exercices
├── hooks/                 # Hooks personnalisés
│   ├── useFetchExercises.js # Récupération des exercices
│   └── useWorkoutForm.js    # Gestion logique du formulaire
├── pages/                 # Pages principales
│   ├── Dashboard.jsx      # Tableau de bord utilisateur
│   ├── Home.jsx           # Page d'accueil
│   ├── Login.jsx          # Page de connexion
│   └── Signup.jsx         # Page d'inscription
├── services/              # Intégration API
│   ├── exerciseApi.js     # Récupération des exercices
│   └── workoutApi.js      # CRUD des workouts
├── utils/                 # Fonctions utilitaires
│   ├── calculate.js       # Calculs (charge totale, durée totale)
│   └── formatDate.js      # Formatage des dates et heures
└── App.jsx                # Composant principal
```

---

## **Installation**

### **1. Installation des dépendances**

```bash
npm install
```

### **2. Lancer le serveur de développement**

```bash
npm run dev
```

### **3. Configuration JSON Server**

Si tu utilises JSON Server pour simuler une API locale :

```bash
json-server --watch db.json --port 5000
```

---

## **Configuration .env**

Crée un fichier `.env` ou `.env.local` à la racine du projet et ajoute les informations suivantes :

```env
# Firebase
VITE_FIREBASE_API_KEY=AIzaSyDQgmISGsEYLrKKMWbLq-iVEuUEMYA6KA4
VITE_FIREBASE_AUTH_DOMAIN=my-workout-c79c2.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-workout-c79c2
VITE_FIREBASE_STORAGE_BUCKET=my-workout-c79c2.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1088084142844
VITE_FIREBASE_APP_ID=1:1088084142844:web:dd06d3566072aacef30579
VITE_MEASUREMENT_ID=G-89C6GEZVDR

# Spoonacular
VITE_SPOONACULAR_API_KEY=ta_clé_api
```

---

## **Roadmap**

### **Court terme :**

- Finaliser le filtre des recettes (Spoonacular).
- Ajouter la gestion des exercices personnalisés.

### **Moyen terme :**

- Intégrer des statistiques globales (progression sur la charge totale, évolution des performances).

### **Long terme :**

- Intégrer un mode hors ligne (avec LocalStorage).
- Ajout de graphiques avancés pour visualiser les performances.

---

## **Notes pour Ali**

- **Authentification Firebase :**
  - Les clés sont déjà intégrées dans le `.env` pour simplifier les tests.
- **Spoonacular :**
  - La création d'un compte est rapide via [TempMail](https://temp-mail.org/fr/).
  - Le filtre fonctionne sur la base de 8 recettes affichées dynamiquement.

---

### **Contact**

En cas de question ou pour discuter d'une fonctionnalité, n'hésitez pas à me contacter ! 😊

---
