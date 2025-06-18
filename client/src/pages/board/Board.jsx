import { Header, Footer } from "../../shared/components/Partials";
import CardListProvider from './context/CardListContext';
import CardList from "./components/CardList";
import { useParams, useLocation} from 'react-router';
import { Link } from "react-router-dom";
import { useState } from "react";
import CardModal from "./components/CardModal";

export default function Board() {
    const params = useParams();
    const location = useLocation();
    const boardId = params.id;

    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <Header />
            <Link to="/">Back To Home</Link>
            <div className="board-container">
                <CardListProvider boardId={boardId}>
                    <div className="board-actions">
                        <button onClick={() => setShowModal(true)}>Create Card</button>
                    </div>
                    <CardList />
                    {showModal && <CardModal showModal={showModal} setShowModal={setShowModal} />}
                </CardListProvider>
            </div>
            <Footer />
        </>
    );
}
