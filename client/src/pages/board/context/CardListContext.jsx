import { useEffect, useState, createContext } from "react";
import { Cards } from "../../../shared/api";
import { sortByPin } from "../../../shared/constants";

export const CardListContext = createContext();

export default function CardListProvider({ boardId, children }) {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const updateCardList = (newList) => {
    const sortedList = sortByPin(newList);
    setCards(sortedList);
    return sortedList;
  };

  const openCommentsModal = (card) => {
    setSelectedCard(card);
    setShowCommentsModal(true);
  };

  const closeCommentsModal = () => {
    setShowCommentsModal(false);
  };

  useEffect(() => {
    /**
     * Fetches cards for the current board and updates state
     * @async
     * @returns {Promise<void>}
     */
    const fetchCards = async () => {
      let cards = await Cards.getAll(boardId);
      cards = updateCardList(cards);
      localStorage.setItem("cards", JSON.stringify(cards));
    };
    fetchCards();
  }, [boardId]);

  return (
    <CardListContext.Provider
      value={{
        cards,
        updateCardList,
        boardId,
        selectedCard,
        showCommentsModal,
        openCommentsModal,
        closeCommentsModal,
      }}
    >
      {children}
    </CardListContext.Provider>
  );
}
