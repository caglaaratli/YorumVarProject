import { useEffect, useState } from 'react';
import { getLoginUserReviews } from '../services/api';
import ReviewList from '../components/UserReview';
import Header from '../components/Header';

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    <div className="container mx-auto flex-col md:flex-row" >
      <ReviewList reviews={reviews} />
    </div>
    </div>
  );
}

export default UserReviewPage;
