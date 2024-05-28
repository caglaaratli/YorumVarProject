import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getLoginUserReviews } from '../services/api';
import ReviewList from '../components/UserReview';
import Header from '../components/Header';
function UserReviewPage({ useSidebar }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLoginUserReviews()
      .then(response => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {useSidebar && <Header />}
      <div className="container mx-auto flex-col md:flex-row">
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}

UserReviewPage.propTypes = {
  useSidebar: PropTypes.bool.isRequired,
};

export default UserReviewPage;
