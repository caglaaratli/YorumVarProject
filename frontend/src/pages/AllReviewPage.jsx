import { useEffect, useState } from 'react';
import { getAllReviews } from '../services/api';
import ReviewList from '../components/AllReviewForm';
import Icon from "react-icomoon";
import iconSet from "../assets/selection.json"; 

function AllReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllReviews()
      .then(response => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setError('An error occurred while fetching reviews.');
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const filteredReviews = reviews.filter(review =>
      review.urun_Adi.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredReviews;
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto  flex-col md:flex-row" >
      <div className="flex justify-center items-center mt-10 mb-5">
      <div className="flex items-center bg-white rounded-full shadow-lg">
        <div className="p-4">
          <Icon iconSet={iconSet} icon="search" className="w-6 h-6" />
        </div>
        <input
          type="text"
          className="px-4 py-3 w-full sm:w-64 focus:outline-none rounded-full"
          placeholder="Search product"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
      <ReviewList reviews={handleSearch()} />
    </div>
  );
}

export default AllReviewsPage;
