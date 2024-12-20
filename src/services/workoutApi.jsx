import axios from "axios";

const WORKOUTS_URL = "http://localhost:5001/workouts"; // cela pouvait être mit dans une variable d'env

/**
 * Récupère tous les journaux d'entraînement.
 * @returns {Promise<Array>} Liste des journaux d'entraînement.
 */
export const getWorkouts = async () => {
  try {
    const response = await axios.get(WORKOUTS_URL); // Pour info : il est possible de créer une conf axios pour déterminer la base de l'URL ex : http://localhost:5001 et ne pas avoir à la déclarer à chaque fois
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des journaux d'entraînement :",
      error
    );
    return [];
  }
};

/**
 * Récupère un journal d'entraînement spécifique en fonction de son ID.
 * @param {number} id - ID du journal.
 * @returns {Promise<Object>} Données du journal.
 */
export const getWorkoutById = async (id) => {
  try {
    const response = await axios.get(`${WORKOUTS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du journal ${id} :`, error);
    return null;
  }
};

/**
 * Ajouter un nouveau journal d'entraînement.
 * @param {Object} workout - Détails du journal d'entraînement (exercice, répétitions, poids).
 * @returns {Promise<Object>} Données du journal ajouté.
 */
export const addWorkout = async (workout) => {
  try {
    const response = await axios.post(WORKOUTS_URL, workout);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du journal d'entraînement :", error);
    return null;
  }
};

/**
 * Supprimer un journal d'entraînement en fonction de son ID.
 * @param {number} id - ID du journal.
 * @returns {Promise<void>}
 */
export const deleteWorkout = async (id) => {
  try {
    await axios.delete(`${WORKOUTS_URL}/${id}`);
  } catch (error) {
    console.error(`Erreur lors de la suppression du journal ${id} :`, error);
  }
};
