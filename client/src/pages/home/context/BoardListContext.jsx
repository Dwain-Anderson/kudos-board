import { useEffect, useState, createContext } from "react"
import { Boards } from "../../../shared/api";

export const BoardListContext = createContext();

export default function BoardListProvider({ children }) {
    const [boards, setBoards] = useState([])

    const updateBoardList = (newList) => {
        setBoards(newList);
    }

    useEffect(() => {
        /**
         * Fetches all boards from the server and updates state
         * @async
         * @returns {Promise<void>}
         */
        const fetchBoards = async () => {
            const boards = await Boards.getAll();
            localStorage.setItem("boards", JSON.stringify(boards))
            updateBoardList(boards);
        }
        fetchBoards();
    }, [])


    return (
        <BoardListContext.Provider value={{boards, updateBoardList}}>
            {children}
        </BoardListContext.Provider>
    )
}
