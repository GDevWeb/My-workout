import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  // 1. State :
  const { currentUser, logout } = useContext(AuthContext);

  // 3. Render :
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white-500 font-bold"
                : "hover:text-white-300 transition"
            }
          >
            Accueil
          </NavLink>
        </li>

        <li>
          {!currentUser ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-white-500 font-bold"
                  : "hover:text-white-300 transition"
              }
            >
              Connexion
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="hover:text-white-300 transition text-red-500"
            >
              Déconnexion
            </button>
          )}
        </li>

        {!currentUser && (
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-white-500 font-bold"
                  : "hover:text-white-300 transition"
              }
            >
              Inscription
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-white-500 font-bold"
                : "hover:text-white-300 transition"
            }
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
