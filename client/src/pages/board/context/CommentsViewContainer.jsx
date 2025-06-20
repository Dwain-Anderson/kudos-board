import { useContext } from 'react';
import { CardListContext } from './CardListContext';
import CommentsView from '../components/CommentsView';

export default function CommentsViewContext() {
    const { selectedCard, showCommentsModal, closeCommentsModal } = useContext(CardListContext);

    if (!showCommentsModal || !selectedCard) {
        return null;
    }

    return (
        <CommentsView
            card={selectedCard}
            showModal={showCommentsModal}
            setShowModal={closeCommentsModal}
        />
    );
}
