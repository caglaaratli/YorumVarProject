import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { logoutUser } from "../redux/actions/authActions";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-md py-2 sm:py-4 px-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-grow pl-4 sm:pl-16">
          <img src="/logo.png" className="h-8 sm:h-10" alt="Logo" />
          <Link
            to="/all-reviews"
            className="text-sm text-red-400 hover:text-red-700"
          >
            Reviews
          </Link>
        </div>

        <div className="relative flex items-center space-x-2 sm:space-x-4 pr-4 sm:pr-16">
          {isAuthenticated ? (
            <>
              <FaUserCircle
                className="text-2xl cursor-pointer"
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              />
              {isAccordionOpen && (
                <div
                  className="absolute top-full mt-2 bg-white border rounded shadow-lg w-40 z-50"
                  style={{ transform: "translateX(-60%)", left: "40%" }}
                >
                  <div className="py-1">
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Welcome, {user.name}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/login-user-review"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Reviews
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                     Log Out
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs sm:text-sm text-gray-600 hover:text-zinc-900"
              >
                Login
              </Link>
              <span className="text-gray-400 text-xs sm:text-sm">/</span>
              <Link
                to="/register"
                className="text-xs sm:text-sm text-gray-600 hover:text-zinc-900"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
