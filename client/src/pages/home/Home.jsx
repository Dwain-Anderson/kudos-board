import BoardList from './components/BoardList';
import BoardListProvider from './context/BoardListContext';
import Search from './components/Search';
import Sort from './components/Filter';
import BoardModal from './components/BoardModal';
import { useState } from 'react';
import { Header, Footer } from '../../shared/components/Partials'
import './Home.css';


export default function Home() {
    const [showModal, setShowModal] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        setShowModal(true);
    }

    return (
        <div className="App">
            <Header/>
            <div className="content-wrapper">
                <BoardListProvider>
                    <section className="banner">
                        <button
                            onClick={handleClick}
                            className="create-board-button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                            Create Board
                        </button>
                        <div className="banner-section">
                            <Search/>
                            <Sort/>
                        </div>
                    </section>
                    <BoardList/>
                    {showModal && <BoardModal showModal={showModal} setShowModal={setShowModal}/>}
                </BoardListProvider>
            </div>
            <Footer/>
        </div>
    )
}
