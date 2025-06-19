import React from 'react';
import './BoardPreview.css';

export default function BoardPreview({ board }) {
    return (
        <div className="board-preview-container">
            <div className="board-preview-card">
                <div className="board-preview-image-container">
                    <img
                        src={board.imageUrl || 'https://placehold.co/600x300?text=Board+Preview'}
                        alt={`${board.title} preview`}
                        className="board-preview-image"
                    />
                </div>
                <div className="board-preview-content">
                    <h2 className="board-preview-title">{board.title}</h2>
                    <p className="board-preview-category">Category: {board.category}</p>
                    {board.author && <p className="board-preview-author">Created by: {board.author}</p>}
                </div>
            </div>
        </div>
    );
}
