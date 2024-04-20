import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md  py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-8" />
          <Link
            to="/reviews"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Değerlendirmeler
          </Link>
        </div>

        <div className="flex  items-center space-x-3">
          <Link to="/login" className="text-gray-600 hover:text-indigo-600">
            Login
          </Link>
          <span>/</span>
          <Link to="/register" className="text-gray-600 hover:text-indigo-600">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
