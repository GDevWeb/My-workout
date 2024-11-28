import { useContext } from "react";
import CardExercise from "./components/CardExercise";
import Recipes from "./components/Recipes";
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
      <CardExercise
        key={id}
        id={id}
        title={title}
        date={date}
        exercises={exercises}
        totalDuration={totalDuration}
        totalLoad={totalLoad}
      />
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
            <Recipes />
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
