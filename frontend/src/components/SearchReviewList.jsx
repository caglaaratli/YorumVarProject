import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const StarRating = ({ count }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg key={index} className={`w-4 h-4 fill-current ${index < count ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 20 20">
          <path d="M10 15l-5.5 3.3 1-5.7L1 8.6l5.8-.9L10 3l3.2 4.7 5.8.9-4.2 3.7 1 5.7z" />
        </svg>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  count: PropTypes.number.isRequired
};

const OriginalityText = ({ isOriginal }) => {
  return isOriginal === 1 ? 'Yes' : 'No';
};

OriginalityText.propTypes = {
  isOriginal: PropTypes.number.isRequired
};

function SearchReviewList({ reviews }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (reviews.length === 0) {
    return <p>No user reviews found.</p>;
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} className="border border-gray-300 my-4 p-4 rounded-lg">
          <h3 className="font-bold text-lg">{review.urun_Adi}</h3>
          <div className="mt-2">
            <p className="font-bold">Username: {review.username}</p>
            <p className="text-sm">Brands: {review.marka_adi}</p>
            <p className="text-sm">Site: {review.site_adi}</p>
            <p className="text-sm">Seller: {review.satici_isim}</p>
            <p className="text-sm">Delivery time: {review.teslimat_suresi} day</p>
            <p className="text-sm">Is the product original: <OriginalityText isOriginal={review.urun_orj} /></p>
          </div>
          <div className="mt-4 flex justify-between">
            <div><p className="text-xs">Cargo packaging:</p><StarRating count={review.kargo_paket_puani} /></div>
            <div><p className="text-xs">Delivery score:</p><StarRating count={review.teslimat_puani} /></div>
            <div><p className="text-xs">Price-performance score:</p><StarRating count={review.fiyat_puani} /></div>
            <div><p className="text-xs">Product quality:</p><StarRating count={review.urun_kalite_puani} /></div>
            <div><p className="text-xs">Customer Service:</p><StarRating count={review.musteri_hizmetleri_puani} /></div>
          </div>
          <p className="mt-4 text-sm">Comment: {review.yorum}</p>
          {review.photo_url && (
            <div className="mt-2">
              <img
                src={`http://localhost:3001/${review.photo_url}`}
                alt="Review Photo"
                className="w-20 h-20 object-cover cursor-pointer"
                onClick={() => handleImageClick(`http://localhost:3001/${review.photo_url}`)}
              />
            </div>
          )}
          <Link to={`/review/${review.id}`} className="text-blue-500">View Comments</Link> 
        </div>
      ))}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={handleCloseImage}>
          <img src={selectedImage} alt="Selected Review Photo" className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
}

SearchReviewList.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default SearchReviewList;
