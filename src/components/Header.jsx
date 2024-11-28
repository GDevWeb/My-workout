import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Journal d&apos;entraînement</h1>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
