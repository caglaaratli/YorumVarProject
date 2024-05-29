import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchReviews } from '../services/api';
import SearchReviewList from '../components/SearchReviewList';
import Header from '../components/Header';

const SearchReviewsPage = () => {
  const { productName } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await searchReviews(productName);
        setReviews(result.data);
      } catch (error) {
        setError('An error occurred while fetching reviews.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex-col md:flex-row">
        <h1 className="text-center text-2xl font-bold mt-10 mb-5">Reviews for {productName}</h1>
        <SearchReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default SearchReviewsPage;
