import "../../../shared/components/Card.css";
import { STATE_ENUM } from "../../../shared/constants";
import { useState, useEffect, useContext } from "react";
import { Cards } from "../../../shared/api";
import { CardListContext } from "../context/CardListContext";

export default function CardCard({ card }) {
  const [currentState, setCurrentState] = useState(null);
  const [upvotes, setUpvotes] = useState(card.upvotes);
  const { cards, updateCardList, boardId, openCommentsModal } = useContext(CardListContext);
  const [isPinned, setIsPinned] = useState(card.pinned);

  /**
   * Handles upvoting a card
   * @param {Event} event - The click event
   */
  const handleUpvote = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const newUpvoteCount = upvotes + 1;
    setUpvotes(newUpvoteCount);

    try {
      const updatedData = { ...card, upvotes: newUpvoteCount };
      await Cards.update(card.id, boardId, updatedData);
      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, upvotes: newUpvoteCount } : c,
      );
      updateCardList(updatedCards);
    } catch (error) {
      setUpvotes(upvotes);
    }
  };

  const handlePinAction = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentState(STATE_ENUM.PIN);

    try {
      const updatedCardData = card.pinned
        ? { pinned: false, pinnedAt: null }
        : { pinned: true, pinnedAt: new Date() };
      setIsPinned(!isPinned);
      const newCard = { ...card, ...updatedCardData };
      updateCardList([...cards.filter((c) => c.id !== card.id), newCard]);
      await Cards.update(card.id, boardId, updatedCardData);
    } catch (error) {}
  };


  useEffect(() => {
    const deleteCard = async (cardId) => {
      try {
        await Cards.delete(cardId, boardId);
        const tmpCards = cards.filter((c) => c.id !== cardId);
        updateCardList(tmpCards);
      } catch (error) {

      }
    };

    if (currentState === STATE_ENUM.DELETE) {
      deleteCard(card.id);
    }
  }, [currentState]); // Remove cards from dependency array

  const handleCommentsClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    openCommentsModal(card);
  };

  return (
    <div className="card">
      <div className="card-image-container">
        <img src={card.gifUrl} alt={`${card.message}`} className="card-image" />
      </div>
      <div className="card-content">
        <p className="card-text">{card.message}</p>
        {card.author && <p className="card-author">By: {card.author}</p>}
      </div>
      <div className="card-footer">
        <div className="card-meta">
          {isPinned && (
            <span className="card-badge card-badge-primary">Pinned</span>
          )}
          <span className="card-upvote">{upvotes} upvotes</span>
        </div>
        <div className="card-actions">
          <button onClick={handlePinAction} className="card-action-btn">
            {isPinned ? "Unpin" : "Pin"}
          </button>
          <button onClick={handleUpvote} className="card-action-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Upvote
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setCurrentState(STATE_ENUM.DELETE);
            }}
            className="card-action-btn"
          >
            Delete
          </button>
          <button onClick={handleCommentsClick} className="card-action-btn">
            Comments
          </button>
        </div>
      </div>
    </div>
  );
}
