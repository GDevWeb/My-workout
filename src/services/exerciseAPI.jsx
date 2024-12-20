import axios from "axios";

const API_URL = "http://localhost:5001/exercises"; // Cela pouvait être placé dans une variable d'env

/**
 * Récupère tous les exercices.
 * @returns {Promise<Array>} Liste des exercices.
 */
export const getExercises = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des exercices:", error);
    return [];
  }
};

export const getExercisesByMuscle = async (muscle) => {
  try {
    const response = await axios.get(`${API_URL}?bodyPart=${muscle}`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des exercices pour le muscle ${muscle}:`,
      error
    );
    return [];
  }
};
