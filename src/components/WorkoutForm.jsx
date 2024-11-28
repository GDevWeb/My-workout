import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseApi";

const WorkoutForm = ({ onSubmit }) => {
  const [exercises, setExercises] = useState([]); // Liste des exercices disponibles
  const [workoutExercises, setWorkoutExercises] = useState([]); // Liste des exercices ajoutés au workout
  const [newExercise, setNewExercise] = useState({
    exercise: "",
    reps: "",
    weight: "",
    rest: "",
  });
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [loading, setLoading] = useState(true);
  const [manualDuration, setManualDuration] = useState("");

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

  const calculateTotalDuration = () => {
    const timePerRep = 5; // Estimé : 5 secondes par rép
    return workoutExercises.reduce((total, ex) => {
      const exerciseDuration = ex.reps * timePerRep;
      const restDuration = parseInt(ex.rest, 10) || 0;
      return total + exerciseDuration + restDuration;
    }, 0); // En secondes
  };

  const calculateTotalLoad = () => {
    return workoutExercises.reduce(
      (total, ex) => total + ex.reps * ex.weight,
      0
    );
  };

  const handleAddExercise = () => {
    if (
      !newExercise.exercise ||
      !newExercise.reps ||
      !newExercise.weight ||
      !newExercise.rest
    ) {
      alert("Veuillez remplir tous les champs pour ajouter un exercice.");
      return;
    }
    setWorkoutExercises((prev) => [...prev, newExercise]);
    setNewExercise({ exercise: "", reps: "", weight: "", rest: "" });
  };

  const handleRemoveExercise = (index) => {
    setWorkoutExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workoutExercises.length === 0) {
      alert("Ajoutez au moins un exercice.");
      return;
    }
    const workout = {
      date,
      time,
      exercises: workoutExercises,
      totalLoad: calculateTotalLoad(), // Ajout de la charge totale
      totalDuration: manualDuration
        ? parseInt(manualDuration, 10) * 60
        : calculateTotalDuration(), // Priorité à la durée saisie
    };
    onSubmit(workout);
    setWorkoutExercises([]);
    setManualDuration("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Reportez votre entraînement
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Heure
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
        </div>
        {loading ? (
          <p className="text-gray-500">Chargement des exercices...</p>
        ) : (
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Ajoutez un exercice
            </h2>
            <select
              value={newExercise.exercise}
              onChange={(e) =>
                setNewExercise((prev) => ({
                  ...prev,
                  exercise: e.target.value,
                }))
              }
              className="p-2 border border-gray-300 rounded-md mb-2 w-full"
            >
              <option value="">Choisissez un exercice</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.name}>
                  {ex.name} ({ex.bodyPart})
                </option>
              ))}
            </select>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Répétitions"
                value={newExercise.reps}
                onChange={(e) =>
                  setNewExercise((prev) => ({ ...prev, reps: e.target.value }))
                }
                className="p-2 border border-gray-300 rounded-md w-1/2"
              />
              <input
                type="number"
                placeholder="Poids (kg)"
                value={newExercise.weight}
                onChange={(e) =>
                  setNewExercise((prev) => ({
                    ...prev,
                    weight: e.target.value,
                  }))
                }
                className="p-2 border border-gray-300 rounded-md w-1/2"
              />
              <input
                type="time"
                placeholder="tps pause"
                value={newExercise.rest}
                onChange={(e) =>
                  setNewExercise((prev) => ({
                    ...prev,
                    rest: e.target.value,
                  }))
                }
                className="p-2 border border-gray-300 rounded-md w-1/2"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-md mt-4">
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                Durée totale
              </h2>
              <p className="text-gray-600">
                {Math.floor(calculateTotalDuration() / 60)} minutes et{" "}
                {calculateTotalDuration() % 60} secondes
              </p>

              <label
                htmlFor="manualDuration"
                className="block text-sm font-medium text-gray-700"
              >
                Durée totale (en minutes, optionnel)
              </label>
            </div>
            <div>
              <input
                type="number"
                id="manualDuration"
                placeholder="Durée totale en minutes"
                value={manualDuration}
                onChange={(e) => setManualDuration(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full mt-2"
              />
            </div>

            <button
              type="button"
              onClick={handleAddExercise}
              className="mt-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Ajouter cet exercice
            </button>
          </div>
        )}
        {workoutExercises.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-md mt-4">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Exercices ajoutés
            </h2>
            <ul className="space-y-2">
              {workoutExercises.map((ex, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>
                    {ex.exercise} - {ex.reps} reps à {ex.weight} kg + {ex.rest}
                  </span>
                  <button
                    onClick={() => handleRemoveExercise(idx)}
                    className="text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Sauvegarder l&apos;entraînement
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
