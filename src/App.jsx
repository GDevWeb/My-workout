import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  // 1.state
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="app min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow container mx-auto p-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Suivez vos progrès et atteignez vos objectifs !
        </h2>

        {!currentUser ? (
          <p className="text-gray-600">
            Connectez-vous pour enregistrer vos entraînements et visualiser vos
            progrès au fil du temps.
          </p>
        ) : (
          "Vos dernières séances d'entraînements"
        )}
      </main>
    </div>
  );
}

export default App;
