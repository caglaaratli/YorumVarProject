import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

function SignUp() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleRegistration = async (values) => {
    const income = await registerUser(values);

    if (income.status === 200) {
      if (
        income.data === "Email is already in use" ||
        income.data === "Username is already in use"
      ) {
        setMessage(income.data);
        setTimeout(() => {
          setMessage(null);
        }, 2000); 
      } else if (income.data === "User registered successfully") {
        setMessage(income.data);
        setTimeout(() => {
          setMessage(null);
          navigate("/login");
        }, 2000); 
      }
    } else if (income.status === 500) {
      setMessage("Registration failed. Please try again later.");
      setTimeout(() => {
        setMessage(null);
      }, 2000); 
    }
  };
  return (
    <div className="flex flex-col bg-logo-pattern bg-cover bg-center   min-h-screen">
      <Header /> 
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-md shadow-lg">
        <h1 className="text-2xl font-bold text-center italic text-gray-600">
          Sign Up
        </h1>
        {message && (
          <div className="text-center p-3 mb-2 bg-green-100 border border-green-400 text-green-700">
            {message}
          </div>
        )}
        <SignUpForm onSubmit={handleRegistration} setMessage={setMessage} />
      </div>
    </div> 
    </div>
  );
}

export default SignUp;
