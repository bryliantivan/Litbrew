import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

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
                    rating: productRatings[i],
                    comment: reviewText,
                };
                await axios.post(`http://localhost:3000/api/products/${orderItems[i]._id}/reviews`, reviewData, config);
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
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
          <StarRating rating={rating} setRating={setRating} />
        </div>
    );
};

export default Review;