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

        <h1>
          Bonjour ALi, merci pour ta patience. J&apos;ai finalisé ce 2nd Tp avec
          quelques modifications. Om est plus de minuit. Je vais dormir 😫💤
        </h1>


        <h1>
          Bonjour Gaëtan, c'est super je suis entrain de ragarder ce que tu as fait, très bon travail ! Bon courage pour cette journée ;)
        </h1>
      </main>
    </div>
  );
}

export default App;
