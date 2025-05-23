import { useState } from "react";


export function RatingBox({intialRating}) {
    let [rating, setRating] = useState(intialRating)
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
                >
                    <i className='fas fa-star'  style={{ color: isFilled ? '#ffd700' : '#cccccc' }} />
                </span>
            );
            })}
        </div>
    )
}

export function RatingBoxInput({intialRating=0, setRatingFromChild}) {
    let [rating, setRating] = useState(intialRating)
    let [hoverRating, setHoverRating] = useState(0)

    function handleClick(selectedRating) {
        setRating(selectedRating)
        setRatingFromChild(selectedRating)
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
                    <i className='fas fa-star'  style={{ color: isFilled ? '#ffd700' : '#cccccc' }}/>
                </span>
            );
            })}
        </div>
    )
}