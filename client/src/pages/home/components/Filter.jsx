import { useContext } from "react";
import { BoardListContext } from "../context/BoardListContext";
import { FILTER_ENUM, MAX_RECENT_BOARDS } from "../../../shared/constants";
import "./Filter.css";

export default function Filter() {
  const { boards, updateBoardList } = useContext(BoardListContext);

  const filterBoards = (filterType) => {
    let filteredBoards = JSON.parse(localStorage.getItem("boards"));
    switch (filterType) {

      case FILTER_ENUM.ALL:
        filteredBoards = JSON.parse(localStorage.getItem("boards"));
        break;
      case FILTER_ENUM.RECENT:
        filteredBoards.sort((a, b) => Date(b.createdAt) - Date(a.createdAt));
        filteredBoards = filteredBoards.slice(0, MAX_RECENT_BOARDS);
        break;
      case FILTER_ENUM.CELEBRATION:
      case FILTER_ENUM.THANK_YOU:
      case FILTER_ENUM.INSPIRATION:
        filteredBoards = filteredBoards.filter(
          (board) => board.category === filterType,
        );
        break;
      default:
        break;
    }
    updateBoardList(filteredBoards);
  };

  const handleFilter = (event) => {
    event.preventDefault();
    const filterType = event.target.value;
    filterBoards(filterType);
  };

  return (
    <div className="filter-container">
      <div className="filter-button-container">
        <button
          type="button"
          className="filter-button"
          value={FILTER_ENUM.ALL}
          onClick={handleFilter}
        >
          All
        </button>
        <button
          type="button"
          className="filter-button"
          value={FILTER_ENUM.RECENT}
          onClick={handleFilter}
        >
          Recent
        </button>
        <button
          type="button"
          className="filter-button"
          value={FILTER_ENUM.CELEBRATION}
          onClick={handleFilter}
        >
          Celebration
        </button>
        <button
          type="button"
          className="filter-button"
          value={FILTER_ENUM.THANK_YOU}
          onClick={handleFilter}
        >
          Thank You
        </button>
        <button
          type="button"
          className="filter-button"
          value={FILTER_ENUM.INSPIRATION}
          onClick={handleFilter}
        >
          Inspiration
        </button>
      </div>
    </div>
  );
}
