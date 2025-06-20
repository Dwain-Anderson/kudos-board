import React from "react";
import "../../../shared/components/Card.css";

export default function BoardPreview({ board }) {
  return (
    <div className="card card-horizontal">
      <div className="card-image-container">
        <img
          src={board.imageUrl}
          alt={`${board.title} preview`}
          className="card-image"
        />
      </div>
      <div className="card-content">
        <h2 className="card-title">{board.title}</h2>
        <p className="card-subtitle">Category: {board.category}</p>
        {board.author && (
          <p className="card-author">Created by: {board.author}</p>
        )}
      </div>
    </div>
  );
}
