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
        <>
            <Header/>
            <BoardListProvider>
                <section className="banner">
                    <Search/>
                    <Sort></Sort>
                    <button onClick={handleClick}>Create Board</button>
                </section>
                <BoardList/>
                {showModal && <BoardModal showModal={showModal} setShowModal={setShowModal}/>}
            </BoardListProvider>
            <Footer/>
        </>
    )
}
