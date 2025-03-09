import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderTracking = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const { orderId } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchOrderDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Ambil token dari local storage
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get(`http://localhost:3000/api/orders/${orderId}`, config); // Ganti dengan endpoint API yang sesuai
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
                    <h4 className="text-gray-600 text-xl font-medium leading-loose my-3">
                        Time: {new Date(orderDetails.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </h4>

                    <div className="w-full flex flex-col justify-center sm:items-center items-start gap-8">
                        <ol className="flex sm:items-center items-start w-full sm:gap-0 gap-3">
                            <li className="flex w-full relative justify-center text-base font-semibold after:content-[''] after:w-full after:h-0.5 after:border after:border-dashed after:bg-[#4BC1D2] after:inline-block after:absolute lg:after:top-5 after:top-3 xl:after:left-52 lg:after:left-48 md:after:left-36 sm:after:left-28 after:left-20">
                                <div className="sm:whitespace-nowrap z-10 flex flex-col items-center">
                                    <span className="w-6 h-6 bg-[#4BC1D2] text-center border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-1 text-base font-bold text-white lg:w-10 lg:h-10"></span>
                                    Order Confirmed <br />
                                    <span className="text-base font-normal text-center">{new Date(orderDetails.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}, {formatDate(orderDetails.createdAt)}</span>
                                </div>
                            </li>
                            <li className="flex w-full relative justify-center text-black text-base font-semibold after:content-[''] after:w-full after:h-0.5 after:border after:border-dashed after:bg-indigo-200 after:inline-block after:absolute lg:after:top-5 after:top-3 xl:after:left-52 lg:after:left-48 md:after:left-36 sm:after:left-28 after:left-20">
                                <div className="sm:whitespace-nowrap z-10 flex flex-col items-center">
                                    <span className="w-6 h-6 bg-[#4BC1D2] rounded-full flex justify-center items-center mx-auto mb-1 text-white text-base font-bold lg:w-10 lg:h-10"></span>
                                    In Processing
                                    <span className="text-gray-500 text-base font-normal text-center">Pesanan sedang disiapkan oleh koki</span>
                                </div>
                            </li>
                            <li className="flex w-full relative justify-center text-gray-500 text-base font-semibold">
                                <div className="sm:whitespace-nowrap z-10 flex flex-col items-center">
                                    <span className="w-6 h-6 bg-gray-400 rounded-full flex justify-center items-center mx-auto mb-1 text-white text-base font-bold lg:w-10 lg:h-10"></span>
                                    Completed
                                    <span className="text-white text-base font-normal text-center "> .</span>
                                </div>
                            </li>
                        </ol>
                    </div>
                    <h2 className="text-[#03151E] font-raleway font-bold text-3xl my-9">We are preparing your order with care</h2>
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="border overflow-hidden dark:border-neutral-700">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="flex justify-center px-3 py-3 text-start text-xl font-raleway font-bold text-black uppercase dark:text-neutral-500">Qty</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xl font-raleway font-bold text-black uppercase dark:text-neutral-500">Item Name</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xl font-raleway font-bold text-black uppercase dark:text-neutral-500">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                            {orderItems.map((item) => (
                                                <tr key={item._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-3xl font-raleway text-gray-800 dark:text-neutral-200">{item.qty}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 flex items-center">
                                                        <img src={item.image} alt={`${item.name} image`} className="w-16 object-cover mr-4" />
                                                        <div className='flex gap-3 flex-col'>
                                                            <h4 className="w-full text-black text-lg font-medium leading-relaxed max-[550px]:text-center text-left px-6">{item.name}</h4>
                                                            <div
                                                                className="w-96 px-6 py-1  text-gray-900 bg-white border mx-5 border-gray-300 rounded-md shadow-sm flex justify-start max-[550px]:justify-center"
                                                            >
                                                                {item.note || "-"}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 text-xl font-raleway dark:text-neutral-200">{item.price.toLocaleString('id-ID')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
                                <h4 className="text-right text-gray-900 text-xl font-semibold leading-8">IDR {tax.toLocaleString('id-ID')}</h4>
                            </div>
                        </div>
                        <div className="w-full pb-6 border-b border-gray-200 flex justify-between items-start gap-6">
                            <h3 className="text-gray-900 text-2xl font-semibold font-manrope leading-9">Total</h3>
                            <h3 className="text-right text-2xl font-bold font-manrope leading-9">IDR {totalPrice.toLocaleString('id-ID')}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderTracking;