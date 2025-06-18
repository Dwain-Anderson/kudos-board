import { useContext, useEffect, useState, useReducer} from 'react';
import { BoardListContext } from '../context/BoardListContext';
import { Boards } from "../../../shared/api";
import { STATE_ENUM } from '../../../shared/constants';
import './BoardCard.css';

export default function BoardCard({ board }) {
    const {boards, updateBoardList} = useContext(BoardListContext);
    const [currentState, setCurrentState] = useState(null);

    const handleClick = (event) => {
        event.preventDefault();
        setCurrentState(STATE_ENUM.DELETE);
    }

    useEffect(() => {
        const deleteBoard = async (boardId) => {
            try {
                const board = await Boards.delete(boardId);
                updateBoardList(boards.filter(b => b.id !== boardId));
            }
            catch (error) {
                console.error(error);
            }
        }
        if (currentState === STATE_ENUM.DELETE) {
            deleteBoard(board.id);
        }
    }, [currentState]);



    return (
        <span className="card-container">
            <article className="card">
                <div className="card-image-container">
                    <img
                        src={board.imageUrl === "" ? null : board.imageUrl}
                        alt={`${board.title} poster`}
                        className="card-image"
                    />
                </div>
                <h2 className="card-title">{board.title}</h2>
                <p className="card-category">Category: {board.category}</p>
                <button className='delete-button' onClick={handleClick}>Delete</button>
            </article>
        </span>
    )
}
