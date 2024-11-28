import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseAPI";

const useFetchExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);

      try {
        const data = await getExercises();
        setExercises(data);
        setError(null);
      } catch (error) {
        console.error("Erreur lors de la récupération des exercices:", error);
        setError("Une erreur est survenue lors de la récupération des données");
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  return exercises, loading, error;
};

export default useFetchExercises;
