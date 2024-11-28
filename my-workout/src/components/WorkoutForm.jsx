import useWorkoutForm from "../hooks/useWorkoutForm";

const WorkoutForm = ({ onSubmit }) => {
  const {
    title,
    setTitle,
    date,
    setDate,
    time,
    setTime,
    exercises,
    loading,
    workoutExercises,
    newExercise,
    setNewExercise,
    handleAddExercise,
    handleRemoveExercise,
    handleSubmit,
  } = useWorkoutForm(onSubmit);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Reportez votre entraînement
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Titre de la séance
          </label>
          <input
            type="text"
            id="title"
            placeholder="Nom de la séance"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="flex gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Heure
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
        </div>
        {loading ? (
          <p className="text-gray-500">Chargement des exercices...</p>
        ) : (
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Ajoutez un exercice
            </h2>
            <select
              value={newExercise.exercise}
              onChange={(e) =>
                setNewExercise((prev) => ({
                  ...prev,
                  exercise: e.target.value,
                }))
              }
              className="p-2 border border-gray-300 rounded-md mb-2 w-full"
            >
              <option value="">Choisissez un exercice</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.name}>
                  {ex.name} ({ex.bodyPart})
                </option>
              ))}
            </select>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Répétitions"
                value={newExercise.reps}
                onChange={(e) =>
                  setNewExercise((prev) => ({ ...prev, reps: e.target.value }))
                }
                className="p-2 border border-gray-300 rounded-md w-1/3"
              />
              <input
                type="number"
                placeholder="Poids (kg)"
                value={newExercise.weight}
                onChange={(e) =>
                  setNewExercise((prev) => ({
                    ...prev,
                    weight: e.target.value,
                  }))
                }
                className="p-2 border border-gray-300 rounded-md w-1/3"
              />
              <input
                type="time"
                placeholder="Pause (sec)"
                value={newExercise.rest}
                onChange={(e) =>
                  setNewExercise((prev) => ({
                    ...prev,
                    rest: e.target.value,
                  }))
                }
                className="p-2 border border-gray-300 rounded-md w-1/3"
              />
            </div>
            <button
              type="button"
              onClick={handleAddExercise}
              className="mt-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Ajouter cet exercice
            </button>
          </div>
        )}
        {workoutExercises.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-md mt-4">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Exercices ajoutés
            </h2>
            <ul className="space-y-2">
              {workoutExercises.map((ex, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>
                    {ex.exercise} - {ex.reps} reps à {ex.weight} kg, Pause :{" "}
                    {ex.rest} min
                  </span>
                  <button
                    onClick={() => handleRemoveExercise(idx)}
                    className="text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Sauvegarder l&apos;entraînement
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
