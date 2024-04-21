import LoginForm from "../components/LoginForm";
import { loginUser } from "../services/api";
import { useState } from "react";

function Login() {
  const [message, setMessage] = useState(null);

  const handleLogin = async (values) => {
    await loginUser(values);
  };

  const handleLoginError = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          setMessage("User information is incorrect. please check.");
          break;
        case 404:
          setMessage("User not found.");
          break;
        default:
          setMessage("Login failed. Please try again later.");
      }
    } else {
      setMessage("Login failed. Please try again later.");
    }
    console.error("Login failed:", error);
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
        <LoginForm onLogin={handleLogin} onLoginError={handleLoginError} setMessage={setMessage} />
        <div className="mt-5 text-center">
          <p className="text-gray-600">
            Dont have an account?
            <a href="/register" className="text-indigo-500 hover:text-indigo-500 ml-2">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
