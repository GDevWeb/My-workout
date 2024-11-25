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
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

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
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Reportez votre entraînement
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {loading ? (
          <p className="text-gray-500">Chargement des exercices...</p>
        ) : (
          <>
            <select
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
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
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              placeholder="Poids (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Ajouter
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default WorkoutForm;
