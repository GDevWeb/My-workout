import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const CardExercise = ({
  id,
  title,
  date,
  exercises,
  totalDuration,
  totalLoad,
  workout,
}) => {
  return (
    <div
      className="card max-h-[400px] overflow-auto bg-white shadow-md rounded-lg p-4 flex flex-col gap-4 transition hover:bg-blue-50"
      key={id}
    >
      <div id="header" className="border-b pb-2">
        <h1 className="text-lg font-bold text-center text-gray-800">
          {title === "" ? "Séance d'entraînement" : title}
        </h1>
        <h2 className="text-sm font-bold text-gray-500">{formatDate(date)}</h2>
      </div>
      <main className="flex-auto">
        <p className="font-semibold text-gray-700 mb-2">Exercices :</p>
        <ul className="flex flex-wrap items-center justify-center space-y-2">
          {exercises.map((exercise, idx) => (
            <li
              key={exercise.id || idx}
              className="w-full p-2 bg-gray-50 rounded-md shadow-sm"
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
      <footer className="py-2 border-t">
        <p className="text-gray-800">
          <strong>Durée totale :</strong>{" "}
          <span>{Math.floor(totalDuration / 60)}</span> minutes
        </p>
        <p className="pb-2 text-gray-800">
          <strong>Charge totale :</strong> <span>{totalLoad}</span> kg
        </p>
        <div className="pt-2 border-t">
          <Link
            to={`/workouts/${workout.id}`}
            className="flex items-center justify-end text-blue-500 hover:underline"
          >
            Voir les détails
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default CardExercise;

CardExercise.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string]),
      exercise: PropTypes.string.isRequired,
      reps: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalDuration: PropTypes.number.isRequired,
  totalLoad: PropTypes.number.isRequired,
  workout: PropTypes.string.isRequired,
};
