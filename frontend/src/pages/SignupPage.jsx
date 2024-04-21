import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { registerUser } from "../services/api";

function SignUp() {
  const [message, setMessage] = useState(null);

  const handleRegistration = async (values) => {
    try {
      await registerUser(values);
      setMessage("Registration successful!");
      setTimeout(() => setMessage(null), 4000); // Başarılı kayıt mesajını 4 saniye sonra silecek.
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Registration failed. Please try again later."); // Hata durumunda kullanıcıya bilgi vermek.
      setTimeout(() => setMessage(null), 4000); // Hata mesajını 4 saniye sonra silecek.
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
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
  );
}

export default SignUp;
