import PropTypes from "prop-types";

const CardExercise = ({
  id,
  title,
  date,
  exercises,
  totalDuration,
  totalLoad,
}) => {
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
};

export default CardExercise;

CardExercise.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      exercise: PropTypes.string.isRequired,
      reps: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalDuration: PropTypes.number.isRequired,
  totalLoad: PropTypes.number.isRequired,
};
