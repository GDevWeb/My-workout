import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseApi";

const WorkoutForm = ({ onSubmit }) => {
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      const data = await getExercises();
      setExercises(data);
      console.log(data);
    };
    fetchExercises();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ exercise, reps, weight });
    setExercise("");
    setReps("");
    setWeight("");
  };

  return (
    <div>
      <button onClick={"fetchExercises"}>Charger les exercices</button>
      {loading && <p>Chargement des exercices...</p>}
      <form onSubmit={handleSubmit}>
        <select
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          required
        >
          <option value="">Choisissez un exercice</option>
          {exercises.map((ex, index) => (
            <option key={index} value={ex.name}>
              {ex.name}
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
      </form>

      <>
        <h2>Ma liste des exercices</h2>
        <ul>
          {exercises.map((exercise, index) => (
            <li key={index}>{exercise.name}</li>
          ))}
        </ul>
      </>
    </div>
  );
};

export default WorkoutForm;
