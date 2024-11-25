import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const Signup = () => {
  // 1.State:
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2.Functions:
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirection après inscription
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error.message);
    }
  };
  return (
    <form onSubmit={handleSignup}>
      <h1>Inscription</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">S&apos;inscrire</button>
    </form>
  );
};

export default Signup;
