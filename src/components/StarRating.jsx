import React, { useState } from 'react';

const StarRating = ({ initialRating = 0, onRatingChange }) => {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (index) => {
        const newRating = index + 1;
        setRating(newRating);
        if (onRatingChange) {
            onRatingChange(newRating);
        }
    };

    return (
        <div className="flex justify-center">
            {[...Array(5)].map((star, index) => (
                <svg
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`w-[2.5vw] h-[2.5vw] cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
            ))}
            <span className="ml-2 text-xl font-raleway"><span className='text-yellow-400'>{rating}</span>/5</span>
        </div>
    );
};

export default StarRating;