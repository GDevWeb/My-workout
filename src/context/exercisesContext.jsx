import { createContext, useEffect, useState } from "react";
import { getWorkouts } from "../services/workoutApi";

export const ExercisesContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des exercices :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <ExercisesContext.Provider value={{ workouts, loading, fetchWorkouts }}>
      {children}
    </ExercisesContext.Provider>
  );
};
