import { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../services/api';

const CommentForm = ({ reviewId, isAuthenticated, handleMessage, refreshComments }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      handleMessage("You must be logged in to post a comment.");
      return;
    }
    if (comment.trim() === '') {
      handleMessage("Comment cannot be empty.");
      return;
    }
    try {
      await addComment({
        rev_id: reviewId,
        parent_id: 0,
        comment,
      });
      setComment('');
      refreshComments();
      alert('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment', error);
      alert('Failed to add comment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-md">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment"
        required
        className="w-full p-2 border border-gray-300 rounded-lg"
      ></textarea>
      <button type="submit" className="px-8 py-2 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

CommentForm.propTypes = {
  reviewId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleMessage: PropTypes.func.isRequired,
  refreshComments: PropTypes.func.isRequired,
};

export default CommentForm;
