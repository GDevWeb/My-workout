import { useEffect, useState } from "react";
import CardRecipe from "./CardRecipe";

const Recipes = () => {
  // 1. States :
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("diet");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=cdd56df4dbd843a5bde3cf26d302f6bb`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRecipes(data.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data :", error);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [searchQuery]);

  return (
    <div className="mt-10">
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
