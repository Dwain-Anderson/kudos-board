import '../../../shared/Card.css'

export default function CardCard({card}) {

    return (
        <span className="card-container">
            <article className="card">
                <div className="card-image-container">
                    <img
                        src={card.gif === "" ? null : card.gif}
                        alt={`${card.message} `}
                        className="card-image"
                    />
                </div>
                <h2 className="card-title">{card.message}</h2>
                <p className="card-category"> {card.upvotes}</p>
                <p>

                </p>
                <button className='delete-button'>Delete</button>
            </article>
        </span>
    )
}
