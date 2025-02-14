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
    <div className="container px-5 py-36 mx-auto font-raleway">
      <h1 className="text-3xl font-semibold mb-6">Order History</h1>
      {paidOrders.length > 0 ? (
        paidOrders.map((order) => (
          <div key={order._id} className="mb-6 p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
            <p className="text-gray-600 mb-4">
              Total Price: IDR {order.totalPrice.toLocaleString('id-ID')}
            </p>
            <div className="space-y-4 flex flex-wrap w-full gap-[5vw]">
              {order.orderItems.map((item) => (
                <div key={item.product} className="flex items-center">
                  <div className="flex items-center space-x-4 border border-blue-300 w-[20vw] justify-center h-[10vw] rounded-xl">
                    <img src={item.image} className="w-[5vw]" alt={item.name} />
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.qty}</p>
                      <p className="text-gray-600">
                        Price: IDR {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Only allow one rate per order */}
            {!order.isReviewed ? (
              <Link
                to={`/review/${order._id}`}
                className="block bg-[#4BC1D2] rounded-full w-[8vw] text-center mt-4 px-4 py-2 text-sm text-white hover:bg-blue-300"
              >
                Rate!
              </Link>
            ) : (
              <span className="block bg-gray-400 rounded-full w-[8vw] text-center mt-4 px-4 py-2 text-sm text-white">
                Reviewed
              </span>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">You have no orders yet.</p>
      )}
    </div>
  );
};

export default MyOrder;