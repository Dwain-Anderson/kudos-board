import { useContext } from 'react';
import { BoardListContext } from '../context/BoardListContext';
import './Search.css';

export default function Search() {
    const { boards, updateBoardList } = useContext(BoardListContext);

    const handleSubmit = (event) => {
        event.preventDefault()
        const query = event.target.query.value
        const filteredBoards = boards.filter(board => board.title.toLowerCase().includes(query.toLowerCase()))
        updateBoardList(filteredBoards)
    };

    const handleClick = (event) => {
        event.preventDefault()
        updateBoardList(JSON.parse(localStorage.getItem("boards")))
    }

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <label htmlFor="board-search" className="sr-only">Search for boards</label>
                <input
                    id="board-search"
                    className="search-input"
                    type="text"
                    name="query"
                    placeholder="Search for kudos boards"
                    aria-label="Search for kudos boards"
                />
                <button className="search-button" type="submit"> Search </button>
            </form>
            <button className="search-button" onClick={handleClick}>Clear</button>
        </div>
    )
}
