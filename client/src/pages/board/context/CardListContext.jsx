import { useEffect, useState, createContext } from "react"
import { Cards } from "../../../shared/api";

export const CardListContext = createContext();

export default function CardListProvider({ boardId, children }) {
    const [cards, setCards] = useState([])

    const updateCardList = (newList) => {
        setCards(newList);
    }

    useEffect(() => {
        const fetchCards = async () => {
            const cards = await Cards.getAll(boardId);
            localStorage.setItem("cards", JSON.stringify(cards))
            updateCardList(cards);
        }
        fetchCards();
    }, [])


    return (
        <CardListContext.Provider value={{cards, updateCardList, boardId}}>
            {children}
        </CardListContext.Provider>
    )
}
