import React from 'react';
import { Link } from 'react-router-dom';

const MyOrder = () => {
    return (
        <div>
            <h1 className="mt-[100px]">My Order</h1>
            <Link to="/review" className="block bg-gray-400 w-[8vw] text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-300">Rate!</Link>
        </div>
    );
};

export default MyOrder;