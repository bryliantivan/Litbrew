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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("http://localhost:3000/api/orders/myorders", config);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container px-5 py-36 mx-auto">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="mb-6 p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
            <p className="text-gray-600 mb-4">Total Price: IDR {order.totalPrice.toLocaleString('id-ID')}</p>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item.product} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.qty}</p>
                    <p className="text-gray-600">Price: IDR {item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <Link to={`/review/${item.product}`} className="block bg-gray-400 w-[8vw] text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-300">Rate!</Link>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">You have no orders yet.</p>
      )}
    </div>
  );
};

export default MyOrder;