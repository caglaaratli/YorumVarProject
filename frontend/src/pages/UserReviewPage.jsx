import { useEffect, useState } from 'react';
import { getLoginUserReviews } from '../services/api';
import ReviewList from '../components/UserReview';

function UserReviewPage() {
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

  return <ReviewList reviews={reviews} />;
}

export default UserReviewPage;