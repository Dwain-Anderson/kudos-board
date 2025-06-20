import { useContext, useEffect, useState } from "react";
import { BoardListContext } from "../context/BoardListContext";
import { Boards } from "../../../shared/api";
import { STATE_ENUM } from "../../../shared/constants";
import { Link } from "react-router-dom";
import "../../../shared/components/Card.css";

export default function BoardCard({ board }) {
  const { boards, updateBoardList } = useContext(BoardListContext);
  const [currentState, setCurrentState] = useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentState(STATE_ENUM.DELETE);
  };

  useEffect(() => {
    /**
     * Delete a board
     * @param {string} boardId - The id of the board to delete
     */
    const deleteBoard = async (boardId) => {
      try {
        const board = await Boards.delete(boardId);
        updateBoardList(boards.filter((b) => b.id !== boardId));
      } catch (error) {}
    };
    if (currentState === STATE_ENUM.DELETE) {
      deleteBoard(board.id);
    }
  }, [currentState]);

  return (
    <div className="card">
      <div className="card-image-container">
        <img
          src={board.imageUrl}
          alt={`${board.title} poster`}
          className="card-image"
        />
      </div>
      <div className="card-content">
        <h2 className="card-title">{board.title}</h2>
        <p className="card-subtitle">Category: {board.category}</p>
      </div>
      <div className="card-footer">
        <Link
          state={board}
          to={`/board-details/${board.id}`}
          className="btn btn-primary"
        >
          View Details
        </Link>
        <div className="card-actions">
          <button className="card-action-btn" onClick={handleClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
