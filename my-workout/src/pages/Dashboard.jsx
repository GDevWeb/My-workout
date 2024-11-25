import { useEffect, useState } from "react";
import WorkoutForm from "../components/WorkoutForm";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

const Dashboard = () => {
  // 1.States :
  const [workouts, setWorkouts] = useState(() =>
    getFromLocalStorage("workouts", [])
  );

  useEffect(() => {
    saveToLocalStorage("workouts", workouts);
  }, [workouts]);

  const handleAddWorkout = (workout) => {
    setWorkouts((prev) => [...prev, workout]);
  };

  return (
    <div className="dashboard">
      <h1>Journal d&apos;entraînement</h1>
      <WorkoutForm onSubmit={handleAddWorkout} />

      <ul>
        {workouts.map((workout, index) => {
          <li key={index}>
            {workout.exercise} - {workout.reps} reps à {workout.weight} kg
          </li>;
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
