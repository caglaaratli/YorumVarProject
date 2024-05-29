import { useEffect, useState } from 'react';
import { getAllReviews } from '../services/api';
import ReviewList from '../components/AllReviewForm';
import Icon from "react-icomoon";
import iconSet from "../assets/selection.json"; 
import Header from '../components/Header';

function AllReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');

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
    return reviews.filter(review =>
      review.urun_Adi.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR')) &&
      review.site_adi.toLocaleLowerCase('tr-TR').includes(filterBrand.toLocaleLowerCase('tr-TR'))
    );
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = event => {
    setFilterBrand(event.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex-col md:flex-row">
        <div className="flex justify-between items-center mt-10 mb-5">
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
          <div className="flex items-center bg-white rounded-full shadow-lg">
            <div className="p-4">
              <Icon iconSet={iconSet} icon="search" className="w-6 h-6" />
            </div>
            <input
              type="text"
              className="px-4 py-3 w-full sm:w-64 focus:outline-none rounded-full"
              placeholder="Filter by site"
              value={filterBrand}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <ReviewList reviews={handleSearch()} />
      </div>
    </div>
  );
}

export default AllReviewsPage;
