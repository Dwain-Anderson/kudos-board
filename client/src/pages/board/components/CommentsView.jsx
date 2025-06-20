import { useState, useEffect, useContext } from "react";
import { Comments } from "../../../shared/api";
import { CardListContext } from "../context/CardListContext";
import "../../../shared/components/Modal.css";

export default function CommentsView({ card, showModal, setShowModal }) {
  const [comments, setComments] = useState([]);
  const { updateCardList, boardId, closeCommentsModal } =
    useContext(CardListContext);

  useEffect(() => {
    if (showModal && card) {
      const fetchComments = () => {
        Comments.getAll(boardId, card.id)
          .then((fetchedComments) => {
            setComments(fetchedComments || []);
          })
          .catch((error) => {
            setComments([]);
          });
      };
      fetchComments();
    }
  }, [boardId, card, showModal]);

  if (!showModal || !card) {
    return null;
  }

  const handleClose = () => {
    if (typeof setShowModal === "function") {
      setShowModal(false);
    } else {
      closeCommentsModal();
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const formData = new FormData(event.target);
      const commentData = {
        message: formData.get("comment"),
        cardId: card.id,
      };

      if (formData.get("author")) {
        commentData.author = formData.get("author");
      }

      const comment = await Comments.create(commentData, boardId, card.id);

      if (comment) {
        setComments((prevComments) => [...prevComments, comment]);
        const cardComments = card.comments || [];
        const updatedCard = {
          ...card,
          comments: [...cardComments, comment],
        };

        updateCardList((prevCards) =>
          prevCards.map((c) => (c.id === card.id ? updatedCard : c)),
        );

        event.target.reset();
      }
    } catch (error) {}
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Card Comments</h2>
        </div>

        <div className="modal-section">
          <div className="preview-container">
            <img
              src={card.gifUrl}
              alt={`${card.message} preview`}
              className="preview-image"
            />
            <div className="preview-content">
              <p>{card.message}</p>
              {card.author && (
                <p className="preview-subtitle">By: {card.author}</p>
              )}
            </div>
          </div>
        </div>

        <div className="modal-section">
          <h3>Comments</h3>
          <div className="list-container">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="list-item">
                  <p>{comment.message}</p>
                  {comment.author && (
                    <p className="list-item-subtitle">By: {comment.author}</p>
                  )}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>

        <div className="modal-section">
          <h3>Add a comment</h3>
          <form onSubmit={handleAddComment} className="form-container">
            <textarea
              required
              name="comment"
              id="comment"
              placeholder="Write your comment here..."
              className="form-textarea"
            ></textarea>
            <input
              type="text"
              name="author"
              placeholder="Add Author (optional)"
              className="form-input"
            />
            <button type="submit" className="btn btn-primary">
              Add Comment
            </button>
          </form>
        </div>

        <button className="modal-close" onClick={handleClose}>
          ×
        </button>
      </div>
    </div>
  );
}
