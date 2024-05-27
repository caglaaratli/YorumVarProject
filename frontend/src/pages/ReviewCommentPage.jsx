import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReview, getComments, addComment } from '../services/api';

const ReviewCommentPage = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [replyParentId, setReplyParentId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment({
        rev_id: reviewId,
        parent_id: 0,
        comment,
      });
      setComment('');
      getComments(reviewId).then((response) => {
        setComments(response.data);
      }).catch((error) => {
        console.error('Error fetching comments:', error);
      });
      alert('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment', error);
      alert('Failed to add comment');
    }
  };

  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault();
    try {
      await addComment({
        rev_id: reviewId,
        parent_id: parentId,
        comment: replyComment,
      });
      setReplyComment('');
      setReplyParentId(null);
      getComments(reviewId).then((response) => {
        setComments(response.data);
      }).catch((error) => {
        console.error('Error fetching comments:', error);
      });
      alert('Reply added successfully!');
    } catch (error) {
      console.error('Error adding reply', error);
      alert('Failed to add reply');
    }
  };

  const renderComments = (parentId) => {
    return comments
      .filter((c) => c.parent_id === parentId)
      .map((comment) => (
        <div key={comment.id} className="border border-gray-300 my-2 p-2">
          <p><strong>{comment.username}:</strong> {comment.comment}</p>
          <button onClick={() => setReplyParentId(comment.id)} className="text-blue-500">Reply</button>
          {replyParentId === comment.id && (
            <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mt-2">
              <textarea
                value={replyComment}
                onChange={(e) => setReplyComment(e.target.value)}
                placeholder="Write your reply"
                required
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
              <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
          )}
          <div className="ml-4">
            {renderComments(comment.id)}
          </div>
        </div>
      ));
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
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          renderComments(0)
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment"
            required
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
          <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewCommentPage;
