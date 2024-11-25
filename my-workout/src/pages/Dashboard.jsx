import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutForm from "../components/WorkoutForm";
import { auth } from "../firebase/firebase";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

const Dashboard = () => {
  // 1.States :
  const [workouts, setWorkouts] = useState(() =>
    getFromLocalStorage("workouts", [])
  );

  // 2.Functions :
  const navigate = useNavigate();

  useEffect(() => {
    saveToLocalStorage("workouts", workouts);
  }, [workouts]);

  // Ajouter un exercice:
  const handleAddWorkout = (workout) => {
    setWorkouts((prev) => [...prev, workout]);
  };
  // Se déconnecter:<
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error.message);
    }
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

      <button onClick={handleLogout}>Se déconnecter</button>
      {/* Affichage des entraînements ici */}
    </div>
  );
};

export default Dashboard;
