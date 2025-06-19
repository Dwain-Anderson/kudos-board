import { Header, Footer } from "../../shared/components/Partials";
import CardListProvider from './context/CardListContext';
import CardList from "./components/CardList";
import { useParams, useLocation} from 'react-router';
import { Link } from "react-router-dom";
import { useState } from "react";
import CardModal from "./components/CardModal";
import BoardPreview from "./components/BoardPreview";
import './Board.css';

export default function Board() {
    const params = useParams();
    const location = useLocation();
    const boardId = params.id;

    const [showModal, setShowModal] = useState(false);


    // Get board data from location state
    const board = location.state || { title: "Board", category: "Unknown" };

    return (
        <div className="App">
            <Header />
            <div className="content-wrapper">
                <div className="board-container">
                    <Link to="/" className="back-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back To Home
                    </Link>

                    {/* Board preview card */}
                    <BoardPreview board={board} />

                    <CardListProvider boardId={boardId}>
                        <div className="board-actions">
                            <button
                                onClick={() => setShowModal(true)}
                                className="create-card-button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14M5 12h14"/>
                                </svg>
                                Create Card
                            </button>
                        </div>
                        <CardList />
                        {showModal && <CardModal showModal={showModal} setShowModal={setShowModal} />}
                    </CardListProvider>
                </div>
            </div>
            <Footer />
        </div>
    );
}
