import { useContext } from 'react';
import CardCard from './CardCard';
import { CardListContext } from '../context/CardListContext';
import '../../../shared/components/List.css';

export default function CardList()  {
    const { cards, updateCardList } = useContext(CardListContext);

    if (cards.length === 0) {
        return (
            <div className="list-wrapper">
                <div className="list-empty">
                    <p>No cards yet. </p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="list-wrapper">
                <div className="list-grid">
                    {cards.map((card, index) => (
                        <CardCard key={index} card={card} />
                    ))}
                </div>
            </div>
        )
    }
}
