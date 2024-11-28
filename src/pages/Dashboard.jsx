import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutForm from "../components/WorkoutForm";
import { AuthContext } from "../context/authContext";
import { addWorkout, deleteWorkout, getWorkouts } from "../services/workoutApi";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // Redirection si pas authentifié
    }

    const fetchWorkouts = async () => {
      const data = await getWorkouts();
      setWorkouts(data);
    };
    fetchWorkouts();
  }, [currentUser, navigate]);

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

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes et ${remainingSeconds} secondes`;
  };

  return currentUser ? (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Bienvenue, {currentUser.email}
      </h1>
      <h2 className="text-2xl text-center font-semibold text-blue-600 mb-4">
        Journal d&apos;entraînement
      </h2>
      <WorkoutForm onSubmit={handleAddWorkout} />
      <div className="mt-8">
        {workouts.length > 0 ? (
          <ul className="space-y-4">
            {workouts.map((workout) => (
              <li
                key={workout.id}
                className="p-4 bg-gray-100 shadow rounded-md"
              >
                <div className="mb-2">
                  <span className="text-sm text-gray-500">
                    {workout.date} à {workout.time}
                  </span>
                  <span className="block text-gray-700 font-semibold">
                    Charge totale : {workout.totalLoad} kg
                  </span>
                  <span className="block text-gray-700 font-semibold">
                    Durée totale : {formatDuration(workout.totalDuration)}
                  </span>
                </div>
                <ul className="pl-4">
                  {workout.exercises.map((ex, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>
                        <strong>{ex.exercise}</strong> - {ex.reps} reps à{" "}
                        {ex.weight} kg, Pause : {ex.rest} sec
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className="bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            Aucun entraînement enregistré pour le moment.
          </p>
        )}
      </div>{" "}
    </div>
  ) : (
    <h2 className="text-center text-red-500 mt-10">
      Vous devez être authentifié pour accéder à cette page !
    </h2>
  );
};

export default Dashboard;
