import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/login">Connexion</Link>
      <Link to="/signup">Inscription</Link>
    </nav>
  );
};

export default NavBar;
