import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderTracking = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Ambil token dari local storage
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get('http://localhost:3000/api/orders/67a9f02ece3f9b43870cc9fd', config); // Ganti dengan endpoint API yang sesuai
                const orderData = response.data;
                setOrderDetails(orderData);
                setOrderItems(orderData.orderItems);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        let formattedDate = new Date(date).toLocaleDateString('en-GB', options); // Format '25 Dec, 2024'

        // Menambahkan suffix ke tanggal (th, st, nd, rd)
        const day = new Date(date).getDate();
        const suffix = (day === 1 || day === 21 || day === 31) ? 'st' :
            (day === 2 || day === 22) ? 'nd' :
                (day === 3 || day === 23) ? 'rd' : 'th';

        formattedDate = formattedDate.replace(/\d+/, day + suffix);

        return formattedDate;
    };

    const originalPrice = orderItems.reduce((total, item) => total + (item.price * item.qty), 0);
    const tax = originalPrice * 0.11;
    const totalPrice = originalPrice + tax;

    return (
        <section className="py-24 relative bg-gray-100">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                <div className="w-full flex flex-col font bg-white p-8 rounded-lg shadow-lg justify-center text-center">
                    <h2 className="text-[#03151E] font-motter-corpus-std text-3xl mb-6 animate-fade-in">Order ID: {orderDetails._id}</h2>
                    <h4 className="text-gray-600 text-xl font-medium leading-loose">
                        Date: {formatDate(orderDetails.createdAt)}
                    </h4>
                    <h4 className="text-gray-600 text-xl font-medium leading-loose">
                        Time: {new Date(orderDetails.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </h4>

                    <div className="w-full flex flex-col justify-center sm:items-center items-start gap-8">
                        <ol className="flex sm:items-center items-start w-full sm:gap-0 gap-3">
                            <li className="flex w-full relative justify-center text-indigo-600 text-base font-semibold after:content-[''] after:w-full after:h-0.5 after:border after:border-dashed after:bg-[#4BC1D2] after:inline-block after:absolute lg:after:top-5 after:top-3 xl:after:left-52 lg:after:left-48 md:after:left-36 sm:after:left-28 after:left-20">
                                <div className="sm:whitespace-nowrap z-10 flex flex-col items-center">
                                    <span className="w-6 h-6 bg-[#4BC1D2] text-center border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-1 text-base font-bold text-white lg:w-7 lg:h-7"></span>
                                    Order Confirmed <br />
                                    <span className="text-indigo-600 text-base font-normal text-center">{new Date(orderDetails.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}, {formatDate(orderDetails.createdAt)}</span>
                                </div>
                            </li>
                            <li className="flex w-full relative justify-center text-black text-base font-semibold after:content-[''] after:w-full after:h-0.5 after:border after:border-dashed after:bg-indigo-200 after:inline-block after:absolute lg:after:top-5 after:top-3 xl:after:left-52 lg:after:left-48 md:after:left-36 sm:after:left-28 after:left-20">
                                <div className="sm:whitespace-nowrap z-10 flex flex-col items-center">
                                    <span className="w-6 h-6 bg-[#4BC1D2] rounded-full flex justify-center items-center mx-auto mb-1 text-white text-base font-bold lg:w-7 lg:h-7"></span>
                                    In Processing
                                    <span className="text-gray-500 text-base font-normal text-center">Pesanan sedang disiapkan oleh kasir</span>
                                </div>
                            </li>
                            <li className="flex w-full relative justify-center text-gray-500 text-base font-semibold">
                                <div className="sm:whitespace-nowrap z-10 flex flex-col items-center">
                                    <span className="w-6 h-6 bg-gray-400 rounded-full flex justify-center items-center mx-auto mb-1 text-white text-base font-bold lg:w-7 lg:h-7"></span>
                                    Completed
                                    <span className="text-gray-500 text-base font-normal text-center">Estimated date: Feb 15,</span>
                                </div>
                            </li>
                        </ol>
                    </div>
                    <div className="w-full flex flex-col justify-start items-start gap-7">
                        <div className="w-full flex flex-col">
                            <div className="w-full hidden lg:grid grid-cols-2 p-4 bg-gray-50 rounded-t-lg">
                                <span className="text-gray-500 text-base font-normal leading-relaxed">Product</span>
                                <p className="text-gray-500 text-base font-normal leading-relaxed flex items-center justify-between">
                                    <span className="w-full max-w-[300px] text-center pl-16">Quantity</span>
                                    <span className="w-full max-w-[300px] text-center pl-10">Price</span>
                                    <span className="w-full max-w-[105px] text-center"></span>
                                </p>
                            </div>
                            {orderItems.map((item) => (
                                <div key={item._id} className="w-full grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 py-3 border-b border-gray-200 max-lg:max-w-xl max-xl:mx-auto bg-white rounded-b-lg shadow-sm">
                                    <div className="flex flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-4 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                                        <img src={item.image} alt={`${item.name} image`} className="w-[120px] rounded-xl object-cover" />
                                        <div className="pro-data w-full max-w-sm flex flex-col justify-start items-start gap-2">
                                            <h4 className="w-full text-black text-lg font-medium leading-relaxed max-[550px]:text-center text-left px-6">{item.name}</h4>
                                            <div
                                                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-3xl shadow-sm flex justify-start max-[550px]:justify-center"
                                            >
                                                {item.note || "-"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                                        <div className="max-w-[300px] flex items-center w-full mx-0 justify-center gap-5">
                                            <span className="w-11 h-11 flex justify-center items-center text-gray-900 text-lg font-medium leading-8">{item.qty}</span>
                                        </div>
                                        <h4 className="max-w-[300px] w-full flex items-center text-black text-lg font-medium leading-relaxed pl-16">
                                            IDR {item.price.toLocaleString('id-ID')}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full rounded-xl flex flex-col justify-start items-start gap-6 bg-white p-6 shadow-md">
                        <div className="w-full pb-6 border-b border-gray-200 flex flex-col justify-start items-start gap-6">
                            <div className="w-full flex justify-between items-start gap-6">
                                <h4 className="text-gray-500 text-xl font-normal leading-8">Original price</h4>
                                <h4 className="text-right text-gray-900 text-xl font-semibold leading-8">IDR {originalPrice.toLocaleString('id-ID')}</h4>
                            </div>
                            <div className="w-full flex justify-between items-start gap-6">
                                <h4 className="text-gray-500 text-xl font-normal leading-8">Tax (11%)</h4>
                                <h4 className="text-right text-gray-900 text-xl font-semibold leading-8">IDR {tax.toFixed(2).toLocaleString('id-ID')}</h4>
                            </div>
                        </div>
                        <div className="w-full pb-6 border-b border-gray-200 flex justify-between items-start gap-6">
                            <h3 className="text-gray-900 text-2xl font-semibold font-manrope leading-9">Total</h3>
                            <h3 className="text-right text-indigo-600 text-2xl font-bold font-manrope leading-9">IDR {totalPrice.toFixed(2).toLocaleString('id-ID')}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderTracking;