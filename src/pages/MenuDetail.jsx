import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';  // Import warna untuk Avatar

const BookDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch product details and reviews
        axios.get(`http://localhost:3000/api/products/${id}`)
            .then((response) => {
                console.log("Data API:", response.data);
                setProduct(response.data);
                setReviews(response.data.reviews);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (!product) {
        return <p className="text-center text-gray-500">Product not found.</p>;
    }

    return (
        <section className="container px-5 py-40 mx-auto bg-white">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                    <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                        <img
                            className="w-full"
                            src={product?.image}
                            alt={product?.name}
                        />
                    </div>

                    <div className="mt-6 sm:mt-8 lg:mt-0">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            {product?.name}
                        </h1>
                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                Rp. {product?.price}
                            </p>
                        </div>
                        <div className="flex items-center mt-4">
                            <svg className="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                                {product?.rating}
                            </p>
                            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                            <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                            {product.reviews.length} reviews
                            </a>
                        </div>

                        <hr className="my-6 md:my-8 border-gray-200" />

                        <p className="mb-6 text-gray-500">
                            {product?.description}
                        </p>

                        {/* Reviews Section */}
                        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
                            {/* Overall Rating Summary */}
                            <div className="p-4 bg-gray-50">
                                <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
                                <div className="flex items-center mt-2">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, index) => (
                                            <svg
                                                key={index}
                                                className={`w-5 h-5 ${index < Math.round(product.rating) ? 'text-yellow-300' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="ml-2 text-lg font-medium text-gray-900">
                                        {product.rating?.toFixed(1) || '0'} out of 5
                                    </p>
                                    <div className="mx-4 h-5 w-px bg-gray-300"></div>
                                    <p className="text-sm text-gray-600">
                                        Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                                    </p>
                                </div>
                            </div>

                            {/* Reviews List */}
                            {reviews.length === 0 ? (
                                <div className="py-8 text-center bg-gray-50">
                                    <p className="text-gray-500">No reviews yet for this book.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {reviews.map((review, index) => (
                                        <div key={index} className="p-4">
                                            <div className="flex gap-4">
                                                {/* Avatar with First Letter */}
                                                <div className="flex-shrink-0">
                                                <Avatar src="/broken-image.jpg"/>
                                                </div>

                                                {/* Review Content */}
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center">
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {review.name || 'Anonymous'}
                                                        </p>
                                                        <time
                                                            className="text-xs text-gray-500"
                                                            dateTime={review.createdAt}
                                                        >
                                                            {new Date(review.createdAt).toLocaleDateString('en-GB', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </time>
                                                    </div>

                                                    {/* Star Rating */}
                                                    <div className="flex mt-2">
                                                        {[...Array(5)].map((_, starIndex) => (
                                                            <svg
                                                                key={starIndex}
                                                                className={`w-4 h-4 ${starIndex < review.rating ? 'text-yellow-300' : 'text-gray-300'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                                                            </svg>
                                                        ))}
                                                    </div>

                                                    {/* Review Text */}
                                                    <p className="mt-2 text-sm text-gray-600">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookDetail;
