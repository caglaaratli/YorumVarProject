import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-2 sm:py-4 px-4 sm:px-6">
      <div className="flex items-center justify-between">
        {/* Logo ve Navigasyon Linkleri */}
        <div className="flex items-center space-x-4 flex-grow pl-4 sm:pl-16"> {/* Sol içeriye kaydırma */}
          <img src="/logo.png" className="h-8 sm:h-10" alt="Logo" />

          <div className="flex sm:hidden space-x-4">
            <Link to="/all-reviews" className="text-sm text-red-400 hover:text-red-700">Reviews</Link>
          </div>
          
          <div className="hidden sm:flex space-x-4">
            <Link to="/all-reviews" className="text-sm text-red-400 hover:text-red-700">Reviews</Link>
          </div>
        </div>

        {/* Sağ Üst Köşedeki Butonlar */}
        <div className="flex items-center space-x-2 sm:space-x-4 pr-4 sm:pr-16"> {/* Sağ içeriye kaydırma */}
          <Link to="/login" className="text-xs sm:text-sm text-gray-600 hover:text-zinc-900">Login</Link>
          <span className="text-gray-400 text-xs sm:text-sm">/</span>
          <Link to="/register" className="text-xs sm:text-sm text-gray-600 hover:text-zinc-900">Sign Up</Link>
          <button className="bg-red-400 hover:bg-red-500 text-white font-semibold py-1 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-sm">
            + Comment
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
