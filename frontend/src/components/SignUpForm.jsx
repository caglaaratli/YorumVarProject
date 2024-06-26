
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import useForm from "../hooks/useForm";
import PropTypes from 'prop-types';

function SignUpForm({ onSubmit, setMessage }) {
  const validateSchema = {
    firstName: { required: true, name: "First Name" },
    lastName: { required: true, name: "Last Name" },
    usernameInput : {required:true , name : "Username"},
    phone: { required: true, name: "Phone Number" },
    email: { required: true, name: "Email" },
    password: { required: true, name: "Password" },
  };

  const { values, errors, handleChange, validate } = useForm(
    {
      firstName: "",
      lastName: "",
      usernameInput :"",
      phone: "",
      email: "",
      password: "",
    },
    validateSchema
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      setMessage("Validation failed, please check your entries."); // Burada bir hata mesajı ayarlayabilirsiniz.
      return;
    }
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Submission failed:", error);
      setMessage("Registration failed. Please try again later."); // Burada bir hata mesajı ayarlayabilirsiniz.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John"
              />
            </div>
            {errors.firstName && (
              <div className="mt-1">
                <p className="text-red-500 text-xs italic">
                  {errors.firstName}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 ">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Doe"
              />
            </div>
            {errors.lastName && (
              <div className="mt-1">
                <p className="text-red-500 text-xs italic">{errors.lastName}</p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="usernameInput"
                name="usernameInput"
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="JohnDone"
              />
            </div>
            {errors.usernameInput && (
              <div className="mt-1">
                <p className="text-red-500 text-xs italic">
                  {errors.usernameInput}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlinePhone className="text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="+123456789"
              />
            </div>
            {errors.phone && (
              <div className="mt-1">
                <p className="text-red-500 text-xs italic">{errors.phone}</p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              {/* İkonlar için ayrı bir konteyner */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineMail className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <div className="mt-1">
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockPasswordLine className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="********"
              />
            </div>
            {errors.password && (
              <div className="mt-1">
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              id="regButton"
              className="w-28 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
  );
}



SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
};

export default SignUpForm;