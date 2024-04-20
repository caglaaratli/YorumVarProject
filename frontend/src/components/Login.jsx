import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import useForm from "../hooks/useForm"; // Dosya yolu doğru olduğundan emin olun
import { loginUser } from "../services/api";

function Login() {
  const { values, errors, handleChange, validate } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: { required: true, name: "Email" },
      password: { required: true, name: "Password" },
    }
  );

  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return; // Form doğrulama

    try {
      await loginUser(values); // Login işlemi
      setMessage("Login successful!");
      setTimeout(() => setMessage(null), 3000); // Mesajı 5 saniye sonra kaldır
    } catch (error) {
      if (error.response) {
        // HTTP status kodlarına göre farklı hata mesajları göster
        switch (error.response.status) {
          case 401: // Unauthorized
            setMessage("User information is incorrect. please check.");
            break;
          case 404: // Not Found
            setMessage("User not found.");
            break;
          default:
            setMessage("Login failed. Please try again later.");
        }
      } else {
        // Diğer hatalar için genel bir hata mesajı
        setMessage("Login failed. Please try again later.");
      }
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-blue-200">
      <div className="w-full max-w-md rounded-md p-8 space-y-8 bg-white  shadow-lg">
        <h1 className="text-2xl font-semibold text-center italic text-gray-600">
          Welcome
        </h1>
        {message && (
          <div className="text-center p-3 mb-2 bg-green-100 border border-green-400 text-green-700">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label htmlFor="email" className="flex items-center space-x-2">
              <HiOutlineMail className="w-5 h-5 text-gray-500" />
              <span className="block text-sm font-medium text-gray-700">
                Email
              </span>
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="flex-1 shadow  block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <div className="text-red-500 text-xs">{errors.email}</div>
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="password" className="flex items-center space-x-2">
              <RiLockPasswordLine className="w-5 h-5 text-gray-500" />
              <span className="block text-sm font-medium text-gray-700">
                Password
              </span>
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                className="flex-1 shadow block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2"
                placeholder="********"
              />
            </div>
            {errors.password && (
              <div className="text-red-500 text-xs">{errors.password}</div>
            )}
          </div>
          <div className="mt-5 flex justify-center">
            <button
              type="submit"
              className="w-24  px-4 py-2  text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Log in
            </button>
          </div>
          <div className="mt-5 text-center">
            <p className="text-gray-600  ">
              Dont have an account?
              <a
                href="/register"
                className="text-indigo-500 hover:text-indigo-500 ml-2"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
