import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Reusable component untuk kotak
const Card = ({ title, description, buttonText, navigateTo }) => {
  return (
    <div className="bg-[#EFFCFF] border-light-blue rounded-md p-6 w-[30%] shadow-md">
      <h3 className="font-raleway font-bold text-[1.3vw] text-[#07779D]">{title}</h3>
      <p className="font-raleway text-[1vw]">{description}</p>
      <div className="flex justify-end mt-[1vw]">
        <Link
          to={navigateTo}
          className="font-bold font-raleway rounded-md bg-[#AAE8ED] px-[1vw] py-[0.3vw]
                     transition-transform duration-300 ease-in-out 
                     hover:scale-105 hover:bg-[#07779D] hover:text-white"
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
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await fetch('http://localhost:3000/api/orders/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add Authorization header
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }

        const total = data.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
        setTotalIncome(total);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTotalIncome();
  }, []);

  return (
    <div className="mt-[10vw] mx-[5vw] mb-[3vw]">
      <div className="mb-[3.5vw]">
        <h1 className="font-raleway font-bold text-[2vw]">In the last 7 days</h1>
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <p className="font-motter-corpus-std text-red-500">Total Income: ${totalIncome.toLocaleString('id-ID')}</p>
        )}
      </div>

      <div className="justify-center">
        <h2 className="font-raleway font-bold text-[2vw]">Content & Orders Management</h2>
        <div className="flex justify-around mt-[0.5vw]">
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