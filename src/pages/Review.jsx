import React from 'react';
import { useState } from 'react';

const Review = () => {
    const [rating, setRating] = useState(0);

    const handleClick = (index) => {
        setRating(index + 1);
    };


    return (
        <div>
            <h1 className='mt-24'>Review Page</h1>
            <p>This is the review page.</p>

            <div className='text-center'>
                <div className="font-motter-corpus-std text-xl">COMPLETED ORDER!<br/>Order ID: xxxxxxxx</div>
                <div><span className='text-[#464646]'>Order date: </span>00th Dec, 2025</div>
                <div><span className='text-[#464646]'>Order time: </span>00:00</div>
            </div>
            
            <div className="text-center bg-[#EFFCFF] border-[#1F81B9] m-[5vw] rounded-lg p-4">
                <h1 className='font-raleway text-xl'>How Was It?</h1>
                <p className='font-raleway text-xl'>Rate your experience & share your thoughts!</p>
                <div className="flex justify-center mt-4">
                {[...Array(5)].map((star, index) => (
                    <svg
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`w-8 h-8 cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                ))}
                <span className="ml-2 text-xl font-raleway">{rating}/5</span>

                </div>
                <form className="mt-4 font-raleway">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="4"
                        placeholder="Write your review..."
                    ></textarea>
                </form>
            </div> 
            
            <div className="text-center border border-black m-[5vw] rounded-lg p-4">
                <div className="flex gap-5">
                    {/* Comment Section */}
                    <div className="flex-1">
                    <h1>Your Comment</h1>
                    <textarea
                        
                    ></textarea>
                    </div>

                    
                  
                </div>

                {/* Submit Button */}
                <button className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-lg">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Review;