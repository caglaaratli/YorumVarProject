import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReview, getComments } from '../services/api';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const ReviewCommentPage = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    getReview(reviewId).then((response) => {
      setReview(response.data);
    }).catch((error) => {
      console.error('Error fetching review:', error);
    });

    getComments(reviewId).then((response) => {
      setComments(response.data);
    }).catch((error) => {
      console.error('Error fetching comments:', error);
    });
  }, [reviewId]);

  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const refreshComments = () => {
    getComments(reviewId).then((response) => {
      setComments(response.data);
    }).catch((error) => {
      console.error('Error fetching comments:', error);
    });
  };

  const handleImageClick = (imageUrl) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      setImageSize({ width, height });
      setSelectedImage(imageUrl);
    };
    img.src = imageUrl;
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setImageSize({ width: 0, height: 0 });
  };

  const renderImage = () => {
    const MAX_SIZE = 600; // Maximum width or height
    let style = {};

    if (imageSize.width > MAX_SIZE || imageSize.height > MAX_SIZE) {
      const scale = Math.min(MAX_SIZE / imageSize.width, MAX_SIZE / imageSize.height);
      style = {
        width: imageSize.width * scale,
        height: imageSize.height * scale,
      };
    }

    return <img src={selectedImage} alt="Selected Review Photo" style={style} className="max-w-full max-h-full" />;
  };

  if (!review) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-pastel-blue">
      <Header />
      <div className="container mx-auto flex p-4 space-x-4">
        <div className="w-1/3 p-4 bg-white rounded-lg shadow-md flex flex-col items-center ">
          <div className="p-4 border border-gray-300 rounded-md w-full">
            <h3 className="font-bold text-lg">{review.urun_Adi}</h3>
            <p className="font-bold">Username: {review.username}</p>
            <p className="text-sm">Brands: {review.marka_adi}</p>
            <p className="text-sm">Site: {review.site_adi}</p>
            <p className="text-sm">Seller: {review.satici_isim}</p>
            <p className="text-sm">Delivery time: {review.teslimat_suresi} day</p>
            <p className="text-sm">Is the product original: {review.urun_orj === 1 ? 'Yes' : 'No'}</p>
          </div>
          {review.photo_url && (
            <div className="mt-2">
              <img
                src={`http://localhost:3001/${review.photo_url}`}
                alt="Review Photo"
                className="w-40 h-40 object-cover rounded-md cursor-pointer"
                onClick={() => handleImageClick(`http://localhost:3001/${review.photo_url}`)}
              />
            </div>
          )}
        </div>
        <div className="w-2/3 p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-bold text-lg">Comments</h3>
          {message && <p className="text-red-500">{message}</p>}
          <CommentList 
            comments={comments} 
            isAuthenticated={isAuthenticated} 
            handleMessage={handleMessage} 
            refreshComments={refreshComments} 
            className="rounded-lg"
          />
          <CommentForm 
            reviewId={reviewId} 
            isAuthenticated={isAuthenticated} 
            handleMessage={handleMessage} 
            refreshComments={refreshComments} 
            className="mt-4"
          />
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={handleCloseImage}>
          {renderImage()}
        </div>
      )}
    </div>
  );
};

export default ReviewCommentPage;
