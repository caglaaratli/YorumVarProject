import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

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
    <div>
      {message && <div className="message">{message}</div>}
      <SignUpForm handleRegistration={handleRegistration} />
    </div>
  );
}

export default SignUp;
