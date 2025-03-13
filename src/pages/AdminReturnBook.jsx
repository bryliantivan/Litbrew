import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReturnBook = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);

  // Fetch all orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/orders'); // Fetch orders from the backend API
        setOrders(data);  // Store the fetched orders in the state
        console.log(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to load orders');
      }
    };

    fetchOrders();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleReturnBook = async (orderId) => {
    try {
      // Send a PUT request to update the order status to 'returned'
      const { data } = await axios.put(`http://localhost:3000/api/orders/${orderId}/return`);

      // If successful, update the order status and bookStatus in the frontend
      setOrders(
        orders.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: 'returned', bookStatus: 'returned' }  // Update both orderStatus and bookStatus
            : order
        )
      );

      alert('Book returned successfully!');
    } catch (error) {
      console.error('Error returning book:', error);
      alert('Failed to return the book. Please try again.');
    }
  };

  // Filter orders where the status is 'delivered' and category is 'Book'
  const filteredOrders = orders.filter(
    (order) =>
      order.orderItems.some((item) => item.category === 'Book') && // Only include items of category 'Book'
      order.orderStatus === 'delivered' && // Only include orders where status is 'delivered'
      (order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderItems.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="container mx-auto mt-[8vw] p-7">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 mt-7">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold font-raleway">RETURN BOOKS</h1>
        </div>

        <div className="relative ml-0 md:ml-4 w-full md:w-[300px]">
          <input
            type="text"
            placeholder="Search Book"
            className="border border-[#07779D] px-4 py-2 rounded-md focus:outline-none w-full pr-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="absolute mt-[0.8%] right-2 bg-[#07779D] text-white font-medium font-raleway p-2 rounded-full">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse mt-[2vw]">
          <thead>
            <tr className="bg-[#AAE8ED]">
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[20%]">
                ORDER ID
              </th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[20%]">
                USER
              </th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[40%]">
                BOOK'S TITLE
              </th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[20%]">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
              >
                <td className="px-[0.5vw] py-[1vw] border text-center">
                  {order._id}
                </td>
                <td className="px-[0.5vw] py-[1vw] border text-center">
                  {order.customerName}
                </td>
                <td className="px-[0.5vw] py-[1vw] border text-center">
                  {order.orderItems.map(item => (
                    item.category === 'Book' && ( // Only display books
                      <div key={item._id}>
                        <strong>{item.name}</strong><br />
                        <img src={item.image} alt={item.name} style={{ width: '50px', height: 'auto' }} /><br />
                      </div>
                    )
                  ))}
                </td>
                <td className="px-[0.5vw] py-[1vw] border text-center">
                  <button
                    className="bg-[#07779D] text-white font-medium py-2 px-4 rounded-md"
                    onClick={() => handleReturnBook(order._id)}
                  >
                    Return Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReturnBook;
