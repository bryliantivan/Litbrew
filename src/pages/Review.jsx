import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Review = () => {
    const [reviewText, setReviewText] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [productRatings, setProductRatings] = useState([]);

    useEffect(() => {
        // Ganti dengan ID pesanan yang sesuai
        const orderId = '67a9f02ece3f9b43870cc9fd';
        const fetchOrderDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Ambil token dari local storage
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get(`http://localhost:3000/api/orders/${orderId}`, config);
                setOrderDetails(response.data);
                setOrderItems(response.data.orderItems); // Set order items

                // Initialize product ratings with 0 for each item
                const initialRatings = response.data.orderItems.map(() => 0);
                setProductRatings(initialRatings);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, []);

    const handleProductRating = (index, newRating) => {
        const updatedRatings = [...productRatings];
        updatedRatings[index] = newRating;
        setProductRatings(updatedRatings);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token'); // Ambil token dari local storage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            // Loop through each order item and submit review
            for (let i = 0; i < orderItems.length; i++) {
                const reviewData = {
                    productId: orderItems[i]._id,
                    rating: productRatings[i],
                    reviewText,
                    orderId: orderDetails._id
                };
                await axios.post(`http://localhost:3000/api/products/${reviewData.productId}/reviews`, reviewData, config);
            }

            alert('Reviews submitted successfully!');
        } catch (error) {
            console.error('Error submitting reviews:', error);
            alert('Failed to submit reviews.');
        }
    };

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className='mt-24'>Review Page</h1>
            <p>This is the review page.</p>

            <div className='text-center'>
                <div className="font-motter-corpus-std text-xl">COMPLETED ORDER!<br/>Order ID: {orderDetails._id}</div>
                <div><span className='text-[#464646]'>Order date: </span>{new Date(orderDetails.createdAt).toLocaleDateString('en-GB')}</div>
                <div><span className='text-[#464646]'>Order time: </span>{new Date(orderDetails.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
            
            <div className="text-center bg-[#EFFCFF] border-[#1F81B9] m-[5vw] rounded-lg p-4">
                <h1 className='font-raleway text-xl'>How Was It?</h1>
                <p className='font-raleway text-xl'>Rate your experience & share your thoughts!</p>
                <form className="mt-4 font-raleway">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="4"
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                </form>
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border overflow-hidden dark:border-neutral-700">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="flex justify-center px-3 py-3 text-start text-xl font-raleway font-bold text-black uppercase dark:text-neutral-500">Qty</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xl font-raleway font-bold text-black uppercase dark:text-neutral-500">Item Name</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xl font-raleway font-bold text-black uppercase dark:text-neutral-500">Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                        {orderItems.map((item, index) => (
                                            <tr key={item._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-3xl font-raleway text-gray-800 dark:text-neutral-200">{item.qty}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 flex items-center">
                                                    <img src={item.image} alt={`${item.name} image`} className="w-16 object-cover mr-4" />
                                                    {item.name}
                                                </td>
                                                <td className="px-2 py-4 text-xl font-raleway dark:text-neutral-200">
                                                    <div className="flex justify-center mt-4">
                                                        {[...Array(5)].map((star, starIndex) => (
                                                            <svg
                                                                key={starIndex}
                                                                onClick={() => handleProductRating(index, starIndex + 1)}
                                                                className={`w-8 h-8 cursor-pointer ${starIndex < productRatings[index] ? 'text-yellow-500' : 'text-gray-400'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                                                            </svg>
                                                        ))}
                                                        <span className="ml-2 text-xl font-raleway">{productRatings[index]}/5</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={handleSubmit} className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-lg">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Review;