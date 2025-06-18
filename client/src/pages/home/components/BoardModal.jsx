import { useEffect, useState, useContext } from "react";
import { Boards } from "../../../shared/api";
import { BoardListContext } from '../context/BoardListContext';
import './BoardModal.css';

export default function BoardModal({showModal, setShowModal}) {
    const [boardData, setBoardData] = useState(null)
    const { boards, updateBoardList } = useContext(BoardListContext);

    if (!showModal) {
        return null;
    }

    const handleOverlayClick = (event) => {
        if (event.target.className === 'modal-overlay') {
            setShowModal(false);
            setBoardData(null)
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const boardData = {
            title: formData.get('title'),
            category: formData.get('category'),
            author: formData.get('author'),
        };

        setBoardData(boardData);
        updateBoardList([...boards, boardData])
    }

    useEffect(() => {
        if (boardData) {
            const createBoard = async () => {
                try {
                    const board = await Boards.create(boardData);
                    setShowModal(false);
                    setBoardData(null);
                } catch (error) {
                }
            };
            createBoard();
        }
    }, [boardData]);

    return (
        <div className="modal" onClick={handleOverlayClick}>
            <div className="modal-content" >
                <div className="modal-header">
                    <h2>Add New Board</h2>
                </div>
                <div className="add-form">
                    <form id="add-board" onSubmit={handleFormSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" required/>

                        <label htmlFor="category">Category:</label>
                        <select id="category" name="category" className="category-select" required>
                            <option value="">Select a category</option>
                            <option value="Celebration">Celebration</option>
                            <option value="Thank you">Thank you</option>
                            <option value="Inspiration">Inspiration</option>
                        </select>

                        <label htmlFor="author">Author:</label>
                        <input type="text" id="author" name="author" required/>

                        <div className="form-actions">
                            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="submit" className="add-button">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
