import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ExercisesContext } from "./context/ExercisesContext";

function Home() {
  // 1. State
  const { currentUser } = useContext(AuthContext);
  const { workouts } = useContext(ExercisesContext);

  // Récupérer les 4 derniers entraînements
  const lastWorkouts = workouts.slice(0, 4);

  // Rendu des cartes d'entraînement
  const renderLastWorkouts = lastWorkouts.map((workout) => {
    const { id, title, date, exercises, totalDuration, totalLoad } = workout;
    return (
      <div
        className="card bg-white shadow-md rounded-lg p-4 flex flex-col gap-4 transition hover:bg-blue-50"
        key={id}
      >
        <div id="header" className="border-b pb-2">
          <h1 className="text-lg font-bold text-gray-800">
            {title === "" ? "Séance d'entraînement" : title}
          </h1>
          <h2 className="text-sm text-gray-600">Date : {date}</h2>
        </div>
        <main>
          <p className="font-semibold text-gray-700 mb-2">Exercices :</p>
          <ul className="space-y-2">
            {exercises.map((exercise, idx) => (
              <li
                key={exercise.id || idx}
                className="p-2 bg-gray-50 rounded-md shadow-sm"
              >
                <p className="text-gray-800">
                  <strong>Nom :</strong> {exercise.exercise}
                </p>
                <p className="text-gray-700">
                  <strong>Réps :</strong> {exercise.reps}
                </p>
                <p className="text-gray-700">
                  <strong>Poids :</strong> {exercise.weight} kg
                </p>
              </li>
            ))}
          </ul>
        </main>
        <footer className="pt-2 border-t">
          <p className="text-gray-800">
            <strong>Durée totale :</strong>{" "}
            <span>{Math.floor(totalDuration / 60)}</span> minutes
          </p>
          <p className="text-gray-800">
            <strong>Charge totale :</strong> <span>{totalLoad}</span> kg
          </p>
        </footer>
      </div>
    );
  });

  return (
    <div className="Home min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Suivez vos progrès et atteignez vos objectifs !
        </h2>
        {!currentUser ? (
          <p className="text-gray-600 text-center">
            Connectez-vous pour enregistrer vos entraînements et visualiser vos
            progrès au fil du temps.
          </p>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-4">
              Vos{" "}
              {lastWorkouts.length > 1
                ? `${lastWorkouts.length} dernières séances`
                : "dernière séance"}{" "}
              d&apos;entraînement :
            </p>
            <div className="workouts-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderLastWorkouts}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
