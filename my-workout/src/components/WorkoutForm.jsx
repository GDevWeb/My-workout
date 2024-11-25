import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseApi";

const WorkoutForm = ({ onSubmit }) => {
  const [exercise, setExercise] = useState("");
  const [exercises, setExercises] = useState([]);
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des exercices :", error);
      } finally {
        setLoading(false); // Arrêter le chargement une fois les exercices récupérés
      }
    };
    fetchExercises();
  }, []); // Le tableau vide garantit que l'effet ne se déclenche qu'une fois

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise) {
      alert("Veuillez sélectionner un exercice.");
      return;
    }
    onSubmit({ exercise, reps, weight });
    setExercise("");
    setReps("");
    setWeight("");
  };

  return (
    <>
      <h1>Reportez votre entraînement</h1>
      <form onSubmit={handleSubmit}>
        {loading ? (
          <p>Chargement des exercices...</p>
        ) : (
          <>
            <select
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              required
            >
              <option value="">Choisissez un exercice</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.name}>
                  {ex.name} ({ex.bodyPart})
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Répétitions"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Poids (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <button type="submit">Ajouter</button>
          </>
        )}
      </form>
    </>
  );
};

export default WorkoutForm;
