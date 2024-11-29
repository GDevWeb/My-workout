import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CardRecipe from "./CardRecipe";

const Recipes = () => {
  // 1. States :
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("diet");

  const spoonacularAPIKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const handleSearchQuery = (filter) => {
    setActiveFilter(filter);
    setLoading(true);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const baseUrl = `https://api.spoonacular.com/recipes/complexSearch`;

        const params = new URLSearchParams({
          apiKey: spoonacularAPIKey,
        });

        // Ajout des filtres dynamiquement
        if (activeFilter === "diet") {
          params.append("diet", "vegetarian");
        } else if (activeFilter === "maxProtein") {
          params.append("maxProtein", 50);
        } else if (activeFilter === "maxCarbs") {
          params.append("maxCarbs", 30);
        }

        const response = await fetch(`${baseUrl}?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRecipes(data.results.slice(0, 8) || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [activeFilter, spoonacularAPIKey]);

  //effets d'apparition
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Idées de Recettes
      </h1>
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
              ? "Régime (Végétarien)"
              : filter === "maxProtein"
              ? "Max Protéines"
              : "Max Glucides"}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : recipes.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {recipes.map((recipe) => (
            <motion.div key={recipe.id} variants={cardVariants}>
              <CardRecipe
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-600">Aucune recette trouvée.</p>
      )}
    </div>
  );
};

export default Recipes;
