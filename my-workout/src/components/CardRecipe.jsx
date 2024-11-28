import PropTypes from "prop-types";

const CardRecipe = ({ id, title, image }) => {
  return (
    <div
      className="card min-h-[400px] bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4 transition hover:shadow-xl hover:-translate-y-1"
      key={id}
    >
      <header className="border-b pb-4">
        <h1 className="text-lg font-semibold text-gray-900 text-center">
          {title || "Idée recette"}
        </h1>
      </header>
      <main className="flex-grow flex items-center justify-center">
        {image && (
          <img
            src={image}
            alt={title}
            className="rounded-lg object-cover max-h-40 w-full"
          />
        )}
      </main>
      <footer className="border-t pt-4 flex justify-center">
        <button className="text-sm font-medium text-blue-500 hover:text-blue-700 transition">
          Voir la recette
        </button>
      </footer>
    </div>
  );
};

CardRecipe.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default CardRecipe;
