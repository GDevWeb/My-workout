import { useEffect, useState } from "react";
import CardRecipe from "./CardRecipe";

const Recipes = () => {
  // 1. States :
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("diet");

  // API Key
  const spoonacularAPIKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  // 2. Functions :
  const handleSearchQuery = (filter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const baseUrl = `https://api.spoonacular.com/recipes/complexSearch`;
        const queryParams = `?query=${activeFilter}&apiKey=${spoonacularAPIKey}`;
        const response = await fetch(baseUrl + queryParams);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRecipes(data.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [activeFilter]);

  return (
    <div className="mt-10">
      <div
        id="optionsSearchQuery"
        className="flex flex-wrap gap-4 flex-col sm:flex-row justify-center items-center mb-6"
      >
        <h2 className="text-xl font-semibold text-center mb-4 sm:mb-0">
          Filtres
        </h2>
        {["diet", "maxProtein", "maxCarbs"].map((filter) => (
          <button
            key={filter}
            value={filter}
            onClick={() => handleSearchQuery(filter)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeFilter === filter
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100 text-gray-800"
            }`}
          >
            {filter === "diet"
              ? "Diet"
              : filter === "maxProtein"
              ? "Max Protéines"
              : "Max Glucides"}
          </button>
        ))}
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Idées de Recettes
      </h1>
      {loading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <CardRecipe
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Aucune recette trouvée.</p>
      )}
    </div>
  );
};

export default Recipes;
