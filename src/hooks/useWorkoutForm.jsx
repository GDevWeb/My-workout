import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseApi";
import { calculateTotalDuration, calculateTotalLoad } from "../utils/calculate";

const UseWorkoutForm = (onSubmit) => {
  const [exercises, setExercises] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({
    exercise: "",
    reps: "",
    weight: "",
    rest: "",
  });
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [loading, setLoading] = useState(true);

  // Fetch exercises
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des exercices :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const handleAddExercise = () => {
    if (
      !newExercise.exercise ||
      !newExercise.reps ||
      !newExercise.weight ||
      !newExercise.rest
    ) {
      alert("Veuillez remplir tous les champs pour ajouter un exercice.");
      return;
    }
    setWorkoutExercises((prev) => [...prev, newExercise]);
    setNewExercise({ exercise: "", reps: "", weight: "", rest: "" });
  };

  const handleRemoveExercise = (index) => {
    setWorkoutExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("Veuillez entrer un titre pour votre séance.");
      return;
    }
    if (workoutExercises.length === 0) {
      alert("Ajoutez au moins un exercice.");
      return;
    }

    const totalDuration = await calculateTotalDuration(workoutExercises, 5);
    const totalLoad = await calculateTotalLoad(workoutExercises);

    const workout = {
      title,
      date,
      time,
      exercises: workoutExercises,
      totalLoad,
      totalDuration,
    };

    onSubmit(workout);
    setWorkoutExercises([]);
    setTitle("");
  };

  return {
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
  };
};

export default UseWorkoutForm;
