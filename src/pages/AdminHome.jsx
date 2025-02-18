import { useState, useEffect } from 'react';

// Reusable component untuk kotak
const Card = ({ title, description, buttonText }) => {
  return (
    <div className="bg-[#EFFCFF] border-light-blue rounded-md p-6 w-[30%] shadow-md">
      <h3 className="font-raleway font-bold text-[1.3vw] text-[#07779D]">{title}</h3>
      <p className="font-raleway text-[1vw]">{description}</p>
      <div className="flex justify-end mt-[1vw]"> 
        <button className="font-bold font-raleway rounded-md bg-[#AAE8ED] px-[1vw] py-[0.3vw]
                  transition-transform duration-300 ease-in-out 
                  hover:scale-105 hover:bg-[#07779D] hover:text-white">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const AdminHome = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [error, setError] = useState(null);

  return (
    <div className="mt-[10vw] mx-[5vw] mb-[3vw]">
      <div className="mb-[3.5vw]"> 
        <h1 className="font-raleway font-bold text-[2vw]">In the last 7 days</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <p>Total Income:${totalIncome}</p>
        )}
      </div>
      
      <div className="justify-center">
        <h2 className="font-raleway font-bold text-[2vw]">Content & Orders Management</h2>
        <div className="flex justify-around mt-[0.5vw]">

          {/* Menggunakan reusable component Card */}
          <Card 
            title="MANAGE MENU" 
            description="Add, Edit, or Remove Menu Items" 
            buttonText="GO!" 
          />

          <Card 
            title="MANAGE BOOK" 
            description="Add, Edit, or Remove Books" 
            buttonText="GO!" 
          />

          <Card 
            title="MANAGE ORDERS" 
            description="Order tracking, review & rating management" 
            buttonText="GO!" 
          />

        </div>
      </div>
    </div>
  );
};

export default AdminHome;