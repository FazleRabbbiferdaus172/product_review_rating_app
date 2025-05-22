import { useState } from "react";


export function RatingBox() {
    let [rating, setRating] = useState(0)
    let [hoverRating, setHoverRating] = useState(0)

    function handleClick(selectedRating) {
        setRating(selectedRating)
    }

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= (hoverRating || rating);
            return (
                <span 
                key={star}
                className="icon"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleClick(star)}
                >
                    <i className={`fas ${isFilled ? 'fa-star' : 'fa-star-o'}`} />
                </span>
            );
            })}
        </div>
    )
}