// Convertit une durée en secondes au format "mm:ss"
export const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} minutes et ${remainingSeconds} secondes`;
};

// Convertit une chaîne de type "mm:ss" en secondes
export const parseRestTime = (rest) => {
  if (typeof rest === "string" && rest.includes(":")) {
    const [minutes, seconds] = rest
      .split(":")
      .map((part) => parseInt(part, 10));
    const result = minutes * 60 + (seconds || 0);
    console.log("utils - parseRestTime", result);
    return result;
  }
  return parseInt(rest, 10) || 0;
};

// Calcul de la durée totale en secondes
export const calculateTotalDuration = async (array, timePerRep = 5) => {
  return array.reduce((total, ex) => {
    const exerciseDuration = ex.reps * timePerRep;
    const restDuration = parseRestTime(ex.rest);
    console.log("utils - restDuration", restDuration);
    const result = total + exerciseDuration + restDuration;
    console.log("utils - calculateTotalDuration", result);
    return result;
  }, 0);
};

// Charge total :
export const calculateTotalLoad = (array) => {
  if (!Array.isArray(array) || array.length === 0) return 0;
  console.log("utils - calculateTotalLoad", array);
  const result = array.reduce((total, ex) => total + ex.reps * ex.weight, 0);
  console.log("utils - calculateTotalLoad", result);
  return result;
};
