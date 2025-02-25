// pages/AdminManageBook.js
import React, { useState, useEffect } from 'react';

const AdminManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]); // State untuk menyimpan data pesanan

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Dummy data
    const dummyOrders = [
      {
        orderId: 'ORD123',
        user: 'John Doe',
        items: 'Latte, Croissant',
        discount: '$5',
        totalPrice: '$25',
        orderType: 'Delivery',
        paidStatus: 'Paid',
        status: 'Order Confirmed',
      },
      {
        orderId: 'ORD456',
        user: 'Jane Smith',
        items: 'Cappuccino, Muffin',
        discount: '$2',
        totalPrice: '$18',
        orderType: 'Pickup',
        paidStatus: 'Paid',
        status: 'In Processing',
      },
      {
        orderId: 'ORD789',
        user: 'Alice Johnson',
        items: 'Espresso, Donut',
        discount: '$0',
        totalPrice: '$10',
        orderType: 'Dine-in',
        paidStatus: 'Unpaid',
        status: 'Completed',
      },
      {
        orderId: 'ORD101',
        user: 'Bob Williams',
        items: 'Americano, Bagel',
        discount: '$3',
        totalPrice: '$20',
        orderType: 'Delivery',
        paidStatus: 'Paid',
        status: 'Order Confirmed',
      },
      {
        orderId: 'ORD112',
        user: 'Eva Brown',
        items: 'Mocha, Scone',
        discount: '$1',
        totalPrice: '$15',
        orderType: 'Pickup',
        paidStatus: 'Paid',
        status: 'In Processing',
      },
    ];

    setOrders(dummyOrders);
  }, []);

  const handlePaidStatusChange = (orderId, value) => {
    setOrders(orders.map(order => 
      order.orderId === orderId ? { ...order, paidStatus: value } : order
    ));
  };

  const handleStatusChange = (orderId, value) => {
    setOrders(orders.map(order => 
      order.orderId === orderId ? { ...order, status: value } : order
    ));
  };

  return (
    <div className="container mx-auto mt-[8vw] p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold font-raleway">ORDERS</h1>
            <button className="bg-[#334147] hover:bg-[#07779D] text-white font-raleway font-medium py-2 px-4 rounded-md ml-4">
                SAVE CHANGES
            </button>
        </div>

        <div className="relative ml-4 items-center">
          <input
            type="text"
            placeholder="Search Order"
            className="border border-[#07779D] px-[1vw] py-[1vw] rounded-[0.5vw] focus:outline-none w-[30vw]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="absolute right-[0.5vw] top-[0.5vw] bg-[#07779D] text-white font-medium font-raleway py-2 px-2 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto"> {/* Add this for horizontal scrolling on small screens */}
            <table className="min-w-full border-collapse mt-[2vw] "> {/* Use min-w-full */}
            <thead>
                <tr className="bg-[#AAE8ED]">
                    {/* ORDER ID */}
                    <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[10%]">
                        ORDER ID
                    </th>
                    {/* USER */}
                    <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[10%]">
                        USER
                    </th>
                    {/* ITEMS */}
                    <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[25%]">
                        ITEMS
                    </th>
                    {/* DISCOUNT */}
                    <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[12%]">
                        DISCOUNT
                    </th>
                    {/* TOTAL PRICE */}
                    <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[13%]">
                        TOTAL PRICE
                    </th>
                    {/* ORDER TYPE */}
                    <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[10%]">
                        ORDER TYPE
                    </th>
                    {/* PAID STATUS */}
                    <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[10%]">
                        PAID STATUS
                    </th>
                    {/* STATUS */}
                    <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[12%]">
                        STATUS
                    </th>
                </tr>
            </thead>
                <tbody>
                    {orders.map((order, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="px-[0.5vw] py-[1vw] border text-center">{order.orderId}</td>
                        <td className="px-[0.5vw] py-[1vw] border text-center">{order.user}</td>
                        <td className="px-[0.5vw] py-[1vw] border text-center">{order.items}</td>
                        <td className="px-[0.5vw] py-[1vw] border text-center">{order.discount}</td>
                        <td className="px-[0.5vw] py-[1vw] border text-center">{order.totalPrice}</td>
                        <td className="px-[0.05vw] py-[1vw] border text-center">{order.orderType}</td>
                        <td className="px-[0.5vw] py-[1vw] border text-center">
                        <select 
                            value={order.paidStatus} 
                            onChange={(e) => handlePaidStatusChange(order.orderId, e.target.value)}
                            className="border rounded p-1"
                        >
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                        </td>
                        <td className="px-[0.5vw] py-[1vw] border text-center">
                        <select 
                            value={order.status} 
                            onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                            className="border rounded p-1"
                        >
                            <option value="Order Confirmed">Order Confirmed</option>
                            <option value="In Processing">In Processing</option>
                            <option value="Completed">Completed</option>
                        </select>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
          </div>
    </div>
  );
};

export default AdminManageOrders;