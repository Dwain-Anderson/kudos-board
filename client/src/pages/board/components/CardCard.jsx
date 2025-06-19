import '../../../pages/home/components/BoardCard.css'
import './CardCard.css' // For card-specific styles
import { STATE_ENUM } from '../../../shared/constants';
import { useState, useEffect, useContext } from 'react';
import { Cards } from "../../../shared/api";
import { CardListContext } from '../context/CardListContext';

export default function CardCard({card}) {
    const [currentState, setCurrentState] = useState(null);
    const [upvotes, setUpvotes] = useState(card.upvotes);
    const { cards, updateCardList, boardId } = useContext(CardListContext);


    const handleClick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            setCurrentState(STATE_ENUM.DELETE);
    }

    const handleUpvote = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setCurrentState(STATE_ENUM.UPVOTE);
    }

     useEffect(() => {
        const deleteCard = async (cardId) => {
            const card = await Cards.delete(cardId, boardId);
            updateCardList(cards.filter(c => c.id !== cardId));
        }
        const upvoteCard = async (cardId) => {
            setUpvotes(upvotes + 1);
            const data = {...card, upvotes: card.upvotes + 1}
            await Cards.update(cardId, boardId, data);
        }
        switch (currentState) {
            case STATE_ENUM.DELETE:
                deleteCard(card.id);
                break;
            case STATE_ENUM.UPVOTE:
                upvoteCard(card.id);
                break;
            default:
        }
     }, [currentState]);


    return (
        <span className="card-container">
            <article className="card">
                <div className="card-image-container">
                    <img
                        src={card.gifUrl || 'https://placehold.co/600x300?text=No+Image'}
                        alt={`${card.message}`}
                        className="card-image"
                    />
                </div>
                <h2 className="card-title">{card.message}</h2>
                {card.author && <p className="card-category">By: {card.author}</p>}

                <div className="card-actions">
                    <button onClick={handleUpvote} className="card-upvote-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 19V5M5 12l7-7 7 7"/>
                        </svg>
                        <span className="card-upvote">{upvotes}</span>
                    </button>
                    <button onClick={handleClick} className='delete-button'>Delete</button>
                </div>
            </article>
        </span>
    )
}
