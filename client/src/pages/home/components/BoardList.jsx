import React, { useContext } from "react";
import BoardCard from "./BoardCard";
import { BoardListContext } from "../context/BoardListContext";
import "../../../shared/components/List.css";

export default function BoardList() {
  const { boards, updateBoardList } = useContext(BoardListContext);

  if (boards.length === 0) {
    return (
      <div className="list-wrapper">
        <div className="list-empty">
          <h3>Welcome to Kudos Board!</h3>
          <p>No boards have been created yet.</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="list-wrapper">
        <div className="list-grid">
          {boards.map((board, index) => (
            <BoardCard key={index} board={board} />
          ))}
        </div>
      </div>
    );
  }
}
