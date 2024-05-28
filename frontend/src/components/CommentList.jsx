import { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../services/api';

const CommentList = ({ comments, isAuthenticated, handleMessage, refreshComments }) => {
  const [replyComment, setReplyComment] = useState('');
  const [replyParentId, setReplyParentId] = useState(null);

  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault();
    if (!isAuthenticated) {
      handleMessage("You must be logged in to post a reply.");
      return;
    }
    if (replyComment.trim() === '') {
      handleMessage("Reply cannot be empty.");
      return;
    }
    try {
      await addComment({
        rev_id: comments[0].rev_id,
        parent_id: parentId,
        comment: replyComment,
      });
      setReplyComment('');
      setReplyParentId(null);
      refreshComments();
      alert('Reply added successfully!');
    } catch (error) {
      console.error('Error adding reply', error);
      alert('Failed to add reply');
    }
  };

  const handleReplyClick = (commentId) => {
    if (replyParentId === commentId) {
      setReplyParentId(null);
      setReplyComment('');
    } else {
      setReplyParentId(commentId);
      setReplyComment('');
    }
  };

  const renderComments = (parentId) => {
    return comments
      .filter((c) => c.parent_id === parentId)
      .map((comment) => (
        <div key={comment.id} className="border border-gray-300 rounded-md my-2 p-2">
          <p><strong>{comment.username}:</strong> {comment.comment}</p>
          <button onClick={() => handleReplyClick(comment.id)} className="text-blue-500">Reply</button>
          {replyParentId === comment.id && (
            <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mt-2">
              <textarea
                value={replyComment}
                onChange={(e) => setReplyComment(e.target.value)}
                placeholder="Write your reply"
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              ></textarea>
              <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-lg">Submit</button>
            </form>
          )}
          <div className="ml-4">
            {renderComments(comment.id)}
          </div>
        </div>
      ));
  };

  return (
    <div>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        renderComments(0)
      )}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleMessage: PropTypes.func.isRequired,
  refreshComments: PropTypes.func.isRequired,
};

export default CommentList;
