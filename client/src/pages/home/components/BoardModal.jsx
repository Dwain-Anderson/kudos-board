import { useEffect, useState, useContext } from "react";
import { Boards } from "../../../shared/api";
import { BoardListContext } from '../context/BoardListContext';
import { fetchGifs } from "../../../shared/api";
import './BoardModal.css';

export default function BoardModal({showModal, setShowModal}) {
    const [boardData, setBoardData] = useState(null)
    const { boards, updateBoardList } = useContext(BoardListContext);

    if (!showModal) {
        return null;
    }

    const handleOverlayClick = (event) => {
        if (event.target.className === 'modal') {
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
    }

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
                    let imageUrl = '';
                    if (gifs && gifs.length > 0) {
                        imageUrl = gifs[0].images.original.url;
                    }

                    const finalizedBoardData = await Boards.create({...boardData, imageUrl});
                    updateBoardList([...boards, finalizedBoardData])
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
