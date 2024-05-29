import { Route, Routes } from 'react-router-dom';
import Login from '../pages/LoginPage';
import SignUp from '../pages/SignupPage';
import HomePage from '../pages/HomePage';
import Profile from '../pages/Profile';
import NewReview from '../pages/NewReview';
import AllReviewPage from '../pages/AllReviewPage';
import UserReviewPage from '../pages/UserReviewPage';
import AccountSettingsPage from '../pages/AccountSettingsPage';
import ReviewCommentPage from '../pages/ReviewCommentPage'; 
import SearchReviewsPage from '../pages/SearchReviewsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/new-review" element={<NewReview useSidebar={true} />} />
      <Route path="/all-reviews" element={<AllReviewPage />} />
      <Route path="/login-user-review" element={<UserReviewPage useSidebar={true} />} />
      <Route path="/account-settings" element={<AccountSettingsPage />} />
      <Route path="/review/:reviewId" element={<ReviewCommentPage />} /> 
      <Route path="/search-reviews/:productName" element={<SearchReviewsPage />} />
    </Routes>
  );
};

export default AppRoutes;
