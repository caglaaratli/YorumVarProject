
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/LoginPage';
import SignUp from '../pages/SignupPage';
import HomePage from '../pages/HomePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;