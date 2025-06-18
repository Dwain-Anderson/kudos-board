import { Header, Footer } from "../../shared/components/Partials";
import CardListProvider from './context/CardListContext';
import CardList from "./components/CardList";
import { useParams, useLocation} from 'react-router';
import { Link } from "react-router";

export default function Board() {
    const params = useParams();
    const location = useLocation();
    const boardId = params.id;

    return (
        <>
            <Header />
            <Link to="/">Back To Home</Link>
            <div className="board-container">
                <CardListProvider boardId={boardId}>
                    <CardList />
                </CardListProvider>
            </div>
            <Footer />
        </>
    );
}
