import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Reusable component for the card
const Card = ({ title, description, buttonText, navigateTo }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
   
        <div className="bg-[#EFFCFF] border-light-blue rounded-md p-4 w-full sm:w-1/2 md:w-1/3 shadow-md mb-4 md:mb-0">
            <h3 className="font-raleway font-bold text-lg text-[#07779D]">{title}</h3>
            <p className="font-raleway text-sm">{description}</p>
            <div className="flex justify-end mt-4">
                <Link
                    to={navigateTo}
                    className="font-bold font-raleway rounded-md bg-[#AAE8ED] px-4 py-2 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-[#07779D] hover:text-white"
                >
                    {buttonText}
                </Link>
            </div>
        </div>
    );
};

const AdminHome = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalIncome = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/api/orders/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format received from API');
                }

                const total = data
                    .filter((order) => order.isPaid)
                    .reduce((acc, order) => acc + (order.totalPrice || 0), 0);

                setTotalIncome(total);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchTotalIncome();
    }, []);

    return (
        <div className="mt-32 mx-4 mb-8 md:mx-8 lg:mx-16">
            <div className="mb-8">
                <h1 className="font-raleway font-bold text-2xl">In the last 7 days</h1>
                {error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <p className="font-motter-corpus-std text-red-500">Total Income: Rp{totalIncome.toLocaleString('id-ID')}</p>
                )}
            </div>

            <div>
                <h2 className="font-raleway font-bold text-2xl">Content & Orders Management</h2>
                <div className="flex flex-wrap md:flex-nowrap justify-around gap-[1vw] mt-4"> {/* Menggunakan md:flex-nowrap */}
                    <Card
                        title="MANAGE MENU"
                        description="Add, Edit, or Remove Menu Items"
                        buttonText="GO!"
                        navigateTo="/AdminManageMenu"
                    />

                    <Card
                        title="MANAGE BOOK"
                        description="Add, Edit, or Remove Books"
                        buttonText="GO!"
                        navigateTo="/AdminManageBook"
                    />

                    <Card
                        title="MANAGE ORDERS"
                        description="Order tracking, review & rating management"
                        buttonText="GO!"
                        navigateTo="/AdminManageOrders"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;