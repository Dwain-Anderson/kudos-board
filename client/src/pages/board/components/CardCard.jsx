import '../../../pages/home/components/BoardCard.css'
import './CardCard.css'
import { STATE_ENUM } from '../../../shared/constants';
import { useState, useEffect, useContext } from 'react';
import { Cards } from "../../../shared/api";
import { CardListContext } from '../context/CardListContext';

export default function CardCard({ card }) {
    const [currentState, setCurrentState] = useState(null);
    const [upvotes, setUpvotes] = useState(card.upvotes);
    const { cards, updateCardList, boardId } = useContext(CardListContext);

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
            const updatedCards = cards.map(c =>
                c.id === card.id ? { ...c, upvotes: newUpvoteCount } : c
            );
            updateCardList(updatedCards);
        } catch (error) {
            setUpvotes(upvotes);
        }
    };

    useEffect(() => {
        const deleteCard = async (cardId) => {
            try {
                await Cards.delete(cardId, boardId);
                updateCardList(cards.filter(c => c.id !== cardId));
            } catch (error) {
                console.error("Failed to delete card:", error);
            }
        }

        if (currentState === STATE_ENUM.DELETE) {
            deleteCard(card.id);
        }
    }, [currentState, boardId, cards, updateCardList, card.id]);

    return (
        <span className="card-container">
            <article className="card">
                <div className="card-image-container">
                    <img
                        src={card.gifUrl}
                        alt={`${card.message}`}
                        className="card-image"
                    />
                </div>
                <h2 className="card-title">{card.message}</h2>
                {card.author && <p className="card-category">By: {card.author}</p>}

                <div className="card-actions">
                    <button
                        onClick={handleUpvote}
                        className="card-upvote-button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                        <span className="card-upvote">{upvotes}</span>
                    </button>
                    <button onClick={((event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setCurrentState(STATE_ENUM.DELETE);
                    })} className='delete-button'>Delete</button>
                </div>
            </article>
        </span>
    )
}
