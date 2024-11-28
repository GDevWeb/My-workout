import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
      <footer className="bg-gray-200 text-center p-4">
        <p>© 2024 Mon Application</p>
      </footer>
    </div>
  );
};

export default Layout;
