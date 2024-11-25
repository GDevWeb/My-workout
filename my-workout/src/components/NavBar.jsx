import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const NavBar = () => {
  // 1.state
  const { currentUser } = useContext(AuthContext);
  // 2.functions
  // 3.render :
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <a href="/" className="hover:text-blue-300 transition">
            Accueil
          </a>
        </li>

        {!currentUser ? (
          <li>
            <a href="/login" className="hover:text-blue-300 transition">
              Connexion
            </a>
          </li>
        ) : (
          <li>
            <a href="/logout" className="hover:text-blue-300 transition">
              Déconnexion
            </a>
          </li>
        )}

        {!currentUser ? (
          <li>
            <a href="/signup" className="hover:text-blue-300 transition">
              Inscription
            </a>
          </li>
        ) : null}
        <li>
          <a href="/dashboard" className="hover:text-blue-300 transition">
            Dashboard
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
