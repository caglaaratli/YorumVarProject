import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { registerUser } from "../services/api";



function SignUp() {
  
  const [message, setMessage] = useState(null);

  const handleRegistration = async (values) => {
    //let temp_values = values;
    const income = await registerUser(values);

    if(income.status == 200){
      console.log(income.data);
      if(income.data == 'Email is already in use'){
        setMessage(income.data); 
      }

      if(income.data == 'User registered successfully'){
        setMessage(income.data);  
   
            // BURADA PROFILE BİLGİLERİNİ LOCAL STORAGE'A KAYDET VE PROFİLE SAYFASINDA LOCAL STORAGE'DAN ÇAĞIR
        window.location.href = "/profile";
      }
    }else if(income.status == 500){

      setMessage("Registration failed. Please try again later.");  

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
