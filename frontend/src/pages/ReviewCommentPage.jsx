import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReview, getComments } from '../services/api';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { useSelector } from 'react-redux';

const ReviewCommentPage = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState(null);
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

  if (!review) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto flex">
      <div className="w-1/3 p-4">
        <h3 className="font-bold text-lg">{review.urun_Adi}</h3>
        <p className="font-bold">Username: {review.username}</p>
        <p className="text-sm">Brands: {review.marka_adi}</p>
        <p className="text-sm">Site: {review.site_adi}</p>
        <p className="text-sm">Seller: {review.satici_isim}</p>
        <p className="text-sm">Delivery time: {review.teslimat_suresi} day</p>
        <p className="text-sm">Is the product original: {review.urun_orj === 1 ? 'Yes' : 'No'}</p>
      </div>
      <div className="w-2/3 p-4">
        <h3 className="font-bold text-lg">Comments</h3>
        {message && <p className="text-red-500">{message}</p>}
        <CommentList 
          comments={comments} 
          isAuthenticated={isAuthenticated} 
          handleMessage={handleMessage} 
          refreshComments={refreshComments} 
        />
        <CommentForm 
          reviewId={reviewId} 
          isAuthenticated={isAuthenticated} 
          handleMessage={handleMessage} 
          refreshComments={refreshComments} 
        />
      </div>
    </div>
  );
};

export default ReviewCommentPage;
