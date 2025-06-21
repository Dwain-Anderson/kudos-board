import { useEffect, useState, useContext } from "react";
import { Boards } from "../../../shared/api";
import { BoardListContext } from "../context/BoardListContext";
import { fetchGifs } from "../../../shared/api";
import "../../../shared/components/Modal.css";

export default function BoardModal({ showModal, setShowModal }) {
  const [boardData, setBoardData] = useState(null);
  const { boards, updateBoardList } = useContext(BoardListContext);

  if (!showModal) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target.className === "modal-overlay") {
      setShowModal(false);
      setBoardData(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const boardData = {
      title: formData.get("title"),
      category: formData.get("category"),
      author: formData.get("author"),
    };
    setBoardData(boardData);
  };

  useEffect(() => {
    if (boardData) {
      /**
       * Creates a new board with the current board data
       * @async
       * @returns {Promise<void>}
       */
      const createBoard = async () => {
        try {
          const gifs = await fetchGifs(boardData.title);
          let imageUrl = "";
          if (gifs && gifs.length > 0) {
            imageUrl = gifs[0].images.original.url;
          } else {
            const k = Math.floor(Math.random() * 1000) + 1;
            imageUrl = `https://picsum.photos/${k}`
          }
          const finalizedBoardData = await Boards.create({
            ...boardData,
            imageUrl,
          });
          const updatedBoards = [...boards, finalizedBoardData]
          localStorage.setItem("boards", JSON.stringify(updatedBoards));
          updateBoardList(updatedBoards);
          setShowModal(false);
          setBoardData(null);
        } catch (error) {
          setShowModal(false);
          setBoardData(null);
        }
      };
      createBoard();
    }
  }, [boardData]);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Board</h2>
        </div>
        <div className="modal-section">
          <form
            id="add-board"
            className="form-container"
            onSubmit={handleFormSubmit}
          >
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              required
            />

            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <select
              id="category"
              name="category"
              className="form-select"
              required
            >
              <option value="">Select a category</option>
              <option value="Celebration">Celebration</option>
              <option value="Thank you">Thank you</option>
              <option value="Inspiration">Inspiration</option>
            </select>

            <label htmlFor="author" className="form-label">
              Author:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              className="form-input"
            />

            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
