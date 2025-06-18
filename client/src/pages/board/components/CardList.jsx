import { useContext } from 'react';
import CardCard from './CardCard';
import { CardListContext } from '../context/CardListContext';

export default function CardList()  {
    const { cards, updateCardList } = useContext(CardListContext);

    if (cards.length === 0) {
         return (
         <div className="card-list">
            <p>Welcome</p>
        </div>
        )
    } else {
        return (
            <div className="card-list">
                {cards.map((card, index) => {
                    return <CardCard key={index} card={card} />
                })}
            </div>
        )
    }
}
