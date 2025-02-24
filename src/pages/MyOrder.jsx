import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get("http://localhost:3000/api/orders/myorders", config);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    // Filter orders to display only those with isPaid === true
    const paidOrders = orders.filter(order => order.isPaid);

    return (
        <div className="container px-4 sm:px-5 py-12 sm:py-24 mx-auto font-raleway"> {/* Responsive padding and margin */}
            <h1 className="mt-8 text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Order History</h1> {/* Responsive text and margin, centered */}
            {paidOrders.length > 0 ? (
                paidOrders.map((order) => (
                    <div key={order._id} className="mb-6 p-4 border rounded-lg shadow-sm bg-white"> {/* Added bg-white */}
                        <h2 className="text-lg sm:text-xl font-semibold mb-2">Order ID: {order._id}</h2>
                        <p className="text-gray-600 mb-4">
                            Total Price: IDR {order.totalPrice.toLocaleString('id-ID')}
                        </p>
                        <div className="flex flex-wrap gap-4"> {/* Simplified flex-wrap */}
                            {order.orderItems.map((item) => (
                                <div key={item.product} className="flex-grow sm:flex-grow-0  w-full sm:w-auto"> {/* Responsive item width */}
                                    <div className="flex items-center sm:space-x-4 border border-blue-300 rounded-xl p-2 sm:p-4">  {/* Added padding */}
                                         <img src={item.image} className="w-16 sm:w-20 h-16 sm:h-20 object-contain rounded" alt={item.name} /> {/* Responsive image, object-contain, and rounded */}
                                        <div>
                                            <h3 className="text-base sm:text-lg font-medium">{item.name}</h3>
                                            <p className="text-gray-600 text-sm sm:text-base">Quantity: {item.qty}</p>
                                            <p className="text-gray-600 text-sm sm:text-base">
                                                Price: IDR {item.price.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Render Track button if orderStatus is 'processing', otherwise show review button */}
                        {order.orderStatus === "processing" ? (
                            <Link
                                to={`/orderTracking/${order._id}`}
                                className="block bg-[#4BC1D2] rounded-full w-full sm:w-auto text-center mt-4 px-4 py-2 text-sm text-white hover:bg-blue-300"
                            >
                                Track
                            </Link>
                        ) : (
                            !order.isReviewed ? (
                                <Link
                                    to={`/review/${order._id}`}
                                    className="block bg-[#4BC1D2] rounded-full w-full sm:w-auto  text-center mt-4 px-4 py-2 text-sm text-white hover:bg-blue-300"
                                >
                                    Rate!
                                </Link>
                            ) : (
                                <span className="block bg-gray-400 rounded-full w-full sm:w-auto text-center mt-4 px-4 py-2 text-sm text-white">
                                    Reviewed
                                </span>
                            )
                        )}
                    </div>
                ))
            ) : (
                <p className="text-gray-600 text-center">You have no orders yet.</p> /* Centered text */
            )}
        </div>
    );
};

export default MyOrder;