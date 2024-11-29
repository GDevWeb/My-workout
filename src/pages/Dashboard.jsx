import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import WorkoutForm from "../components/WorkoutForm";
import { AuthContext } from "../context/AuthContext";
import { ExercisesContext } from "../context/ExercisesContext";
import { addWorkout } from "../services/workoutApi";
import { formatDuration } from "../utils/calculate";
import { formatDate } from "../utils/formatDate";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const { workouts, loading, fetchWorkouts } = useContext(ExercisesContext);
  const navigate = useNavigate();

  // Redirection si non authentifié
  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handleAddWorkout = async (workout) => {
    const newWorkout = await addWorkout(workout);
    if (newWorkout) {
      await fetchWorkouts();
    }
  };

  return (
    <div className="flex flex-col min-h-screen container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Bienvenue, {currentUser.email}
      </h1>
      <h2 className="text-2xl text-center font-semibold text-blue-600 mb-4">
        Journal d&apos;entraînement
      </h2>
      <WorkoutForm onSubmit={handleAddWorkout} />
      <div className="mt-8">
        {loading ? (
          <p className="text-gray-500">Chargement des données...</p>
        ) : workouts.length > 0 ? (
          <>
            <h2 className="text-2xl text-center font-semibold text-blue-600 mb-4">
              Votre dernier entraînement
            </h2>
            <ul className="flex gap-4 items-center justify-center space-y-4">
              {workouts.slice(0, 1).map((workout) => (
                <li
                  key={workout.id}
                  className="card bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4 transition hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="mb-2">
                    <h1 className="text-xl font-extrabold">{workout.title}</h1>
                    <span className="text-sm text-gray-500">
                      {formatDate(workout.date)} à {workout.time}
                    </span>
                    <p>Charge totale : {workout.totalLoad} kg</p>
                    <p>
                      Durée totale : {formatDuration(workout.totalDuration)}
                    </p>
                  </div>
                  <Link
                    to={`/workouts/${workout.id}`}
                    className="flex items-center justify-end text-blue-500 hover:underline"
                  >
                    Voir les détails
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-500">
            Aucun entraînement enregistré pour le moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
