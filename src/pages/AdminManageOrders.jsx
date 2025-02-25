import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]); // State untuk menyimpan data pesanan
  const token = localStorage.getItem('token'); // Pastikan token disimpan setelah login

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Ambil data pesanan dari API
  useEffect(() => {
    if (token) {
      axios.get('http://localhost:3000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}` // Mengirim token dalam header Authorization
        }
      })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    } else {
      console.log('Token not found');
    }
  }, [token]);

  // Update status pembayaran
  const handlePaidStatusChange = (orderId, value) => {
    setOrders(orders.map(order =>
      order._id === orderId ? { ...order, isPaid: value } : order
    ));
  };

  // Update status pesanan
  const handleStatusChange = (orderId, value) => {
    setOrders(orders.map(order =>
      order._id === orderId ? { ...order, orderStatus: value } : order
    ));
  };

  // Fungsi untuk menyimpan perubahan status ke server
  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    try {
      // Perbarui status untuk setiap order yang berubah
      for (let order of orders) {
        if (order.isPaid !== undefined) {
          await axios.put(
            `http://localhost:3000/api/orders/${order._id}/pay`,
            { isPaid: order.isPaid },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        if (order.orderStatus) {
          await axios.put(
            `http://localhost:3000/api/orders/${order._id}/status`,
            { orderStatus: order.orderStatus },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      }

      // Feedback setelah berhasil menyimpan perubahan
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('There was an error saving changes. Please try again.');
    }
  };

  const filteredOrders = orders.filter(order =>
    (order._id && order._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.orderItems && order.orderItems.join(', ').toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto mt-[8vw] p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold font-raleway">ORDERS</h1>
          <button
            className="bg-[#334147] hover:bg-[#07779D] text-white font-raleway font-medium py-2 px-4 rounded-md ml-4"
            onClick={handleSaveChanges} // Menambahkan event handler untuk tombol
          >
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

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse mt-[2vw]">
          <thead>
            <tr className="bg-[#AAE8ED]">
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[8%]">ORDER ID</th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[8%]">USER</th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[18%]">ITEMS</th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[10%]">TOTAL PRICE</th>
              <th className="px-[0.05vw] py-[1vw] border font-bold font-raleway text-black text-center w-[8%]">ORDER TYPE</th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[8%]">LOCATION</th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[8%]">NO.TABLE</th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[8%]">NO.PEOPLE</th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[8%]">EST.ARRIVE TIME</th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[8%]">PAID STATUS</th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[8%]">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="px-[0.5vw] py-[1vw] border text-center">{order._id}</td>
                <td className="px-[0.5vw] py-[1vw] border text-center">{order.customerName || 'N/A'}</td>
                <td className="px-[0.5vw] py-[1vw] border text-center">
                  {order.orderItems.map(item => item.name).join(', ')}
                </td>
                <td className="px-[0.5vw] py-[1vw] border text-center">{order.totalPrice}</td>
                <td className="px-[0.05vw] py-[1vw] border text-center">{order.orderType}</td>
                <td className="px-[0.5vw] py-[1vw] border text-center">{order.location}</td>
                <td className="px-[0.5vw] py-[1vw] border text-center">{order.tableNumber || '-'}</td>
                <td className="px-[0.5vw] py-[1vw] border text-center">{order.numPeople || '-'}</td>
                <td className="px-[0.5vw] py-[1vw] border text-center">{order.estimatedPickUpTime || '-'}</td>
                <td className="px-[0.5vw] py-[1vw] border text-center">
                  <select
                    value={order.isPaid ? 'Paid' : 'Unpaid'}
                    onChange={(e) => handlePaidStatusChange(order._id, e.target.value === 'Paid')}
                    className={`border rounded p-1 ${order.isPaid ? 'bg-green-200' : 'bg-red-200'}`}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </td>
                <td className="px-[0.5vw] py-[1vw] border text-center">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`border rounded p-1 ${order.orderStatus === 'confirm'
                        ? 'bg-blue-200'
                        : order.orderStatus === 'processing'
                          ? 'bg-yellow-200'
                          : 'bg-green-200'
                      }`}
                  >
                    <option value="confirm">Order Confirmed</option>
                    <option value="processing">In Processing</option>
                    <option value="delivered">Completed</option>
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
