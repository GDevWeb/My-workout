import { useEffect, useState } from "react";
import WorkoutForm from "../components/WorkoutForm";
import { addWorkout, deleteWorkout, getWorkouts } from "../services/workoutApi";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const data = await getWorkouts();
      setWorkouts(data);
    };
    fetchWorkouts();
  }, []);

  const handleAddWorkout = async (workout) => {
    const newWorkout = await addWorkout(workout);
    if (newWorkout) {
      setWorkouts((prev) => [...prev, newWorkout]);
    }
  };

  const handleDeleteWorkout = async (id) => {
    await deleteWorkout(id);
    setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
  };

  return (
    <div>
      <h1>Journal d'entraînement</h1>
      <WorkoutForm onSubmit={handleAddWorkout} />
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            {workout.exercise} - {workout.reps} reps à {workout.weight} kg
            <button onClick={() => handleDeleteWorkout(workout.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
