
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center px-16 justify-between">

        {/* Logo */}
        <div className="flex items-center space-x-4">
          {/* U-img class'ını img elementine ekledim, bu sizin logonuzun sınıfı olacak */}
          <img src="/logo.png" className="h-10 u-img" />
          
          {/* Navigasyon Linkleri */}
          <div className="hidden sm:flex space-x-4">
            <Link to="/reviews" className="text-red-400 hover:text-red-700">Değerlendirmeler</Link>
          </div>
        </div>

        {/* Sağ Üst Köşedeki Butonlar */}
        <div className="flex items-center  space-x-4  ">
          <Link to="/login" className="text-gray-600 hover:text-zinc-900  ">Login</Link>
          <span className="text-gray-400">/</span>
          <Link to="/register" className="text-gray-600 hover:text-zinc-900 ">Sign Up</Link>
          <button className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded">
            + Yorum Yaz
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
