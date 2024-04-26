
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/LoginPage';
import SignUp from '../pages/SignupPage';
import HomePage from '../pages/HomePage';
import Profile from '../pages/Profile';
import NewReview from '../pages/NewReview';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/new-review" element={<NewReview />} />
    </Routes>
  );
};

export default AppRoutes;