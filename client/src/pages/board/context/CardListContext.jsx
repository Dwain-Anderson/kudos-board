import { useEffect, useState, createContext } from "react"
import { Cards } from "../../../shared/api";
import { sortByPin } from "../../../shared/constants";

export const CardListContext = createContext();

export default function CardListProvider({ boardId, children }) {
    const [cards, setCards] = useState([])

    const updateCardList = (newList) => {
        const sortedList = sortByPin(newList);
        setCards(sortedList);
        return sortedList;
    }

    useEffect(() => {
        /**
         * Fetches cards for the current board and updates state
         * @async
         * @returns {Promise<void>}
         */
        const fetchCards = async () => {
            let cards = await Cards.getAll(boardId);
            cards = updateCardList(cards);
            localStorage.setItem("cards", JSON.stringify(cards))
        }
        fetchCards();
    }, [])


    return (
        <CardListContext.Provider value={{cards, updateCardList, boardId}}>
            {children}
        </CardListContext.Provider>
    )
}
