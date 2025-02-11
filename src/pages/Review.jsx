import React from 'react';
import { coffe_milk } from '../assets/images';
import { StarRating } from '../components';

const Review = () => {
    const handleSubmit = () => {
        alert('Thank you for your review!');
    };

    return (
        <div>
            <div className='text-center font-raleway font-bold mt-32'>
                <div className="font-motter-corpus-std text-3xl">COMPLETED ORDER!<br/>Order ID: xxxxxxxx</div>
                <div><span className='text-[rgb(61,61,61)]'>Order date: </span>xxth Dec, 2025</div>
                <div><span className='text-[rgb(61,61,61)]'>Order time: </span>xx:xx</div>
            </div>
            
            <div className="text-center text-xl border border-[#1F81B9] bg-[#EFFCFF] m-[4vw] rounded-lg p-4">
                <h1 className='font-raleway text-xl'>How Was It?</h1>
                <p className='font-raleway text-xl'>Rate your experience & share your thoughts!</p>
                <StarRating />
                <form className="mt-4 font-raleway">
                    <textarea
                        className="w-full p-2 border border-[#bbbbbb] rounded-md bg-[#dddddd] bg-opacity-80"
                        rows="4"
                        placeholder="Write your review..."
                    ></textarea>
                </form>
            </div> 
            
            <div className="text-center border border-black m-[5vw] rounded-lg p-4 flex flex-col gap-3 font-raleway">
                <div className="flex justify-between font-raleway font-bold text-xl mt-5 mx-6">
                    <h1 className="text-left">Your Comment</h1>
                    <h1 className="text-right">Your Rating</h1>
                </div>

                <div className="border-b-2 border-[#AAAAAA] w-full mx-auto"></div>

                <div className='flex justify-start'>
                    <img className="w-[8vw]" src={coffe_milk}/>
                    <div className="flex flex-col gap-4">
                        <h2 className='mt-[1.5vw] text-left text-[1.5vw]'>Coffe Milk</h2>
                        <div className='flex justify-between items-center'>
                            <textarea className='text-[#606060] w-[55vw] border-[#bbbbbb] bg-[#dddddd] bg-opacity-80 rounded-md mr-[7.5vw] resize-none' placeholder='Write your comment...'></textarea>
                            <div className="ml-auto"><StarRating /></div>
                        </div>
                    </div>

                    <div className="text-right justify-center items-center">
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-lg font-raleway font-bold hover:bg-teal-600"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>

            <div className='flex flex-col font-raleway mx-[7.2vw] mb-20'>
                <h1 className='text-xl font-bold'>Payment Summary</h1>
                <div className="border-b-2 border-[#AAAAAA] w-full mx-auto mb-4"></div>
                <div className='flex justify-between'>
                    <h2>Subtotal</h2>
                    <h2>Rp. xx.xxxx</h2>
                </div>
                
                <div className='flex justify-between'>
                    <h2>Discounts</h2>
                    <h2>Rp. xx.xxxx</h2>
                </div>
                
                <div className='flex justify-between'>
                    <h2>Total Price</h2>
                    <h2>Rp. xx.xxxx</h2>
                </div>
            </div>
        </div>
    );
};

export default Review;