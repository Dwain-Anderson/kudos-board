import { useState, useEffect, useContext } from "react";
import { Cards, fetchGifs } from "../../../shared/api";
import { CardListContext } from '../context/CardListContext';

export default function CardModal({ showModal, setShowModal }) {
    const [state, setState] = useState({
        searchQuery: '',
        gifs: [],
        selectedGif: '',
        cardData: null
    });

    const { cards, updateCardList, boardId } = useContext(CardListContext);

    if (!showModal) {
        return null;
    }

    const handleOverlayClick = (event) => {
        if (event.target.className === 'modal-overlay') {
            setShowModal(false);
            resetForm();
        }
    };


    const resetForm = () => {
        setState({
            searchQuery: '',
            gifs: [],
            selectedGif: '',
            cardData: null
        });
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const cardData = {
            message: formData.get('message'),
            author: formData.get('author'),
            gifUrl: state.selectedGif,
            boardId: boardId
        };


        setState(prevState => ({
            ...prevState,
            cardData: cardData
        }));
    };


    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get('query');


        setState(prevState => ({
            ...prevState,
            searchQuery: query
        }));
    };


    const handleGifSelect = (gifUrl) => {
        setState(prevState => ({
            ...prevState,
            selectedGif: gifUrl
        }));
    };


    useEffect(() => {
        if (state.searchQuery) {
            /**
             * Searches for GIFs based on the current search query
             * @async
             * @returns {Promise<void>}
             */
            const searchGifs = async () => {
                try {
                    const gifsData = await fetchGifs(state.searchQuery);
                    setState(prevState => ({
                        ...prevState,
                        gifs: gifsData
                    }));
                } catch (error) {
                    console.error("Error fetching GIFs:", error);
                }
            };

            searchGifs();
        }
    }, [state.searchQuery]);


    useEffect(() => {
        if (state.cardData) {
            /**
             * Creates a new card with the current card data
             * @async
             * @returns {Promise<void>}
             */
            const createCard = async () => {
                try {
                    const newCard = await Cards.create(state.cardData);
                    updateCardList([...cards, newCard]);
                    setShowModal(false);
                    resetForm();
                } catch (error) {
                    console.error("Error creating card:", error);
                }
            };
            createCard();
        }
    }, [state.cardData]);

    return (
        <div className="modal" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add New Card</h2>
                </div>
                <div className="gif-search-section">
                    <h3>Search for a GIF</h3>
                    <form className="search-form" onSubmit={handleSearchSubmit}>
                        <input
                            id="gif-search"
                            className="search-input"
                            type="text"
                            name="query"
                            placeholder="Search for GIFs"
                            aria-label="Search for GIFs"
                        />
                        <button className="search-button" type="submit">Search</button>
                    </form>

                    <div className="gif-results">
                        {state.gifs.length > 0 && (
                            <div className="gif-grid">
                                {state.gifs.map((gif, index) => (
                                    <div
                                        key={index}
                                        className={`gif-item ${state.selectedGif === gif.images.fixed_height.url ? 'selected' : ''}`}
                                        onClick={() => handleGifSelect(gif.images.fixed_height.url)}
                                    >
                                        <img
                                            src={gif.images.fixed_height_small.url}
                                            alt={gif.title}
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="add-form">
                    <form id="add-card" onSubmit={handleFormSubmit}>
                        <label htmlFor="message">Enter card message</label>
                        <input type="text" id="message" name="message" required />

                        <label htmlFor="author">Enter card author</label>
                        <input type="text" id="author" name="author" />

                        <label htmlFor="gifUrl">GIF URL</label>
                        <input
                            type="text"
                            id="gifUrl"
                            name="gifUrl"
                            value={state.selectedGif}
                            readOnly
                            placeholder="Select a GIF from the search results above"
                        />

                        <div className="form-actions">
                            <button type="button" onClick={() => {
                                setShowModal(false);
                                resetForm();
                            }}>Cancel</button>
                            <button type="submit" className="add-button">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
