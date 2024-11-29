import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
      <footer className="bg-blue-500 text-center text-white py-4 shadow-md">
        <p>© 2024 Mon Journal d&apos;entraînement - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default Layout;
