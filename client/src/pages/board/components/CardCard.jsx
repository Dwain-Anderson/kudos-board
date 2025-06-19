import '../../../shared/Card.css'
import { STATE_ENUM } from '../../../shared/constants';
import { useState, useEffect, useContext } from 'react';
import { Cards } from "../../../shared/api";
import { CardListContext } from '../context/CardListContext';

export default function CardCard({card}) {
    const [currentState, setCurrentState] = useState(null);

    const { cards, updateCardList, boardId } = useContext(CardListContext);


    const handleClick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            setCurrentState(STATE_ENUM.DELETE);
    }

     useEffect(() => {
         const deleteCard = async (cardId) => {
             try {
                const card = await Cards.delete(cardId, boardId);
                updateCardList(cards.filter(c => c.id !== cardId));
             }
             catch (error) {
                 console.error(error);
             }
         }
         if (currentState === STATE_ENUM.DELETE) {
            deleteCard(card.id);
         }
     }, [currentState]);




    return (
        <span className="card-container">
            <article className="card">
                <div className="card-image-container">
                    <img
                        src={card.gif === "" ? null : card.gif}
                        alt={`${card.message} `}
                        className="card-image"
                    />
                </div>
                <h2 className="card-title">{card.message}</h2>
                <p className="card-category"> {card.upvotes}</p>
                <p>

                </p>
                <button onClick={handleClick} className='delete-button'>Delete</button>
            </article>
        </span>
    )
}
