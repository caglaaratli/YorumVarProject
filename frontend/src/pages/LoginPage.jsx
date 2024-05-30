import LoginForm from "../components/LoginForm";
import { loginUser } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser as loginUserRedux } from '../redux/actions/authActions'; 
import Header from '../components/Header';

function Login() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux için dispatch hook'unu kullan


  const handleLogin = async (values) => {
    try {
      const response = await loginUser(values);
      if (response.data.token) {
        // Redux store'unda kullanıcı bilgilerini güncelle
        dispatch(loginUserRedux({
          userId: response.data.userId,
          email: response.data.email,
          name: response.data.name,
          surname: response.data.surname,
          username: response.data.username,
          phoneNumber: response.data.phone,
        }));

        localStorage.setItem("token", response.data.token); 
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: response.data.userId,
            email: response.data.email,
            name: response.data.name,
            surname: response.data.surname,
            username: response.data.username,
            phoneNumber: response.data.phone,
          })
        ); // Kullanıcı bilgilerini localStorage'a kaydet
        setMessage(response.data.message);
        setTimeout(() => setMessage(null), 4000);
        navigate("/");
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="flex bg-logo-pattern bg-cover bg-center flex-col min-h-screen">
      <Header />
    <div className="flex items-center  justify-center min-h-screen ">
      <div className="w-full max-w-md rounded-md p-8 space-y-8 bg-white  shadow-lg">
        <h1 className="text-2xl font-semibold text-center italic text-gray-600">
          Welcome
        </h1>
        {message && (
          <div className="text-center p-3 mb-2 bg-green-100 border border-green-400 text-green-700">
            {message}
          </div>
        )}
        <LoginForm onLogin={handleLogin} />
        <div className="mt-5 text-center">
          <p className="text-gray-600">
            Dont have an account?
            <a
              href="/register"
              className="text-indigo-500 hover:text-indigo-500 ml-2"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div></div>
  );
}

export default Login;
