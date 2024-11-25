import { useState } from "react";

const WorkoutForm = ({ onSubmit }) => {
  // 1.State :
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  //2.functions :
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ exercise, reps, weight });
    setExercise("");
    setReps("");
    setWeight("");
  };
  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <input
        type="text"
        placeholder="Exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        required
      />
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
  );
};

export default WorkoutForm;
