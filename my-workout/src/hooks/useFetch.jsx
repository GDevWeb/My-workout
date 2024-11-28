import axios from "axios";

export const fetchApi = async (API_URL) => {
  try {
    const response = await axios.get(API_URL);
    console.log("from useFetchApi", response.data);

    return response.data;
  } catch (error) {
    console.error("Erreur de la récupération des données :", error);
    return [];
  }
};
