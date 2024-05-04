import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Sidebar({ setContent }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`bg-gray-200 ${
        isOpen ? "w-64" : "w-20"
      } transition-width duration-300 h-full`}
    >
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="text-white p-2 m-2 bg-indigo-500 rounded"
        >
          {isOpen ? "<" : ">"}
        </button>
      )}
      <div
        className={`flex flex-col space-y-4 p-5 ${isOpen ? "block" : "hidden"}`}
      >
        <button
          onClick={() => setContent("account")}
          className="w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          My Account
        </button>
        <button
          onClick={() => setContent("login-user-review")}
          className="w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          My Reviews
        </button>
        <button
          onClick={() => setContent("add-review")}
          className="w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          New Review
        </button>
        <button
          onClick={() => setContent("account-settings")}
          className="w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Settings
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  setContent: PropTypes.func.isRequired,
};

export default Sidebar;
