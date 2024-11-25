import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6">{children}</main>
      <footer className="bg-blue-500 text-white text-center py-4">
        © 2024 Journal d&apos;entraînement. Tous droits réservés.
      </footer>
    </div>
  );
};

export default Layout;
