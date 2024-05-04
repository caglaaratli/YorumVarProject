import PropTypes from "prop-types";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import useForm from "../hooks/useForm";

function LoginForm({ onLogin }) {
  const { values, errors, handleChange, validate } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: { required: true, name: "E-mail" },
      password: { required: true, name: "Password" },
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return; // Doğrulama başarısız ise hiçbir şey yapma.

    onLogin(values); // Doğrulama başarılı ise üst bileşene değerleri gönder.
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-5">
        <label htmlFor="email" className="flex items-center space-x-2">
          <HiOutlineMail className="w-5 h-5 text-gray-500" />
          <span className="block text-sm font-medium text-gray-700">Email</span>
        </label>
        <div className="mt-2 flex rounded-md shadow-sm">
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            className="flex-1 shadow block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2"
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
    </form>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
