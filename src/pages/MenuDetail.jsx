import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MenuDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/products/${id}`)
            .then((response) => {
                console.log("Data API:", response.data);
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [id]);

    const addToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemExists = cartItems.find(item => item._id === product._id);

        if (itemExists) {
            itemExists.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Product added to cart!');
    };

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
                                IDR {product.price.toLocaleString('id-ID')}
                            </p>
                        </div>

                        <div className="flex items-center mt-4">
                            <svg className="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{product?.rating}</p>
                            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                            <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{product?.numReview} reviews</a>
                        </div>

                        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                            <a
                                href="#"
                                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                            >
                                Add to favorites
                            </a>
                            
                            <button
                                onClick={addToCart}
                                title=""
                                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center bg-[#4BC1D2]"
                                role="button"
                            >
                                <svg
                                    className="w-5 h-5 -ms-2 me-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                    />
                                </svg>
                                Add to cart
                            </button>
                        </div>

                        <hr className="my-6 md:my-8 border-gray-200" />

                        <p className="mb-6 text-gray-500">
                            {product?.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MenuDetail;