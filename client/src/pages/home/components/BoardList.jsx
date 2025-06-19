import React, { useContext } from 'react';
import BoardCard from './BoardCard';
import { BoardListContext } from '../context/BoardListContext';
import "./BoardList.css"


export default function BoardList()  {
    const { boards, updateBoardList } = useContext(BoardListContext);

    if (boards.length === 0) {
         return (
         <div className="board-list-empty">
            <h3>Welcome to Kudos Board!</h3>
            <p>No boards have been created yet. Click the "Create Board" button to get started.</p>
        </div>
        )
    } else {
        return (
            <div className="board-list">
                {boards.map((board, index) => {
                    return <BoardCard key={index} board={board} />
                })}
            </div>
        )
    }
}
