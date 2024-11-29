import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExercisesContext } from "../context/exercisesContext";
import { deleteWorkout } from "../services/workoutApi";

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workouts, fetchWorkouts } = useContext(ExercisesContext);

  const workout = workouts.find((workout) => workout.id === id);

  if (!workout) {
    return <p>Workout introuvable</p>;
  }

  const handleDeleteWorkout = async (id) => {
    await deleteWorkout(id);
    await fetchWorkouts();
  };

  return (
    <div className="flex flex-col min-h-screen container mx-auto py-8">
      <div className="w-full flex items-center justify-start">
        <button
          onClick={() => navigate(-1)}
          className="w-fit bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600 transition mb-4"
        >
          Retour à la page précédente
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Détails de la séance : {workout.title}
      </h1>
      <p className="text-gray-700">
        Date : {workout.date} à {workout.time}
      </p>
      <p className="text-gray-700">Charge totale : {workout.totalLoad} kg</p>
      <p className="text-gray-700">
        Durée totale : {workout.totalDuration} secondes
      </p>
      <h2 className="text-2xl font-semibold mt-6">Exercices :</h2>
      <ul className="space-y-2 mt-4">
        {workout.exercises.map((exercise, idx) => (
          <li key={idx} className="p-4 bg-gray-100 shadow rounded-md">
            <p>
              <strong>{exercise.exercise}</strong> - {exercise.reps} reps à{" "}
              {exercise.weight} kg
            </p>
            <p>Pause : {exercise.rest} secondes</p>
          </li>
        ))}
        <div className="w-full flex items-center justify-end">
          <button
            onClick={() => handleDeleteWorkout(workout.id)}
            className="bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-600 transition"
          >
            Supprimer
          </button>
        </div>
      </ul>
    </div>
  );
};

export default WorkoutDetail;
