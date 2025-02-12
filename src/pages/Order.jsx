import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dineInBlue from '../assets/images/dine-in blue.png';
import dineInWhite from '../assets/images/dine-in white.png';
import takeawayBlue from '../assets/images/takeaway blue.png';
import takeawayWhite from '../assets/images/takeaway white.png';
import arrivedblue from '../assets/images/arrived blue.png';
import arrivedWhite from '../assets/images/arrived white.png';
import notarrivedblue from '../assets/images/not arrived blue.png';
import notarrivedWhite from '../assets/images/not arrived white.png';

const Order = () => {
  const [order, setOrder] = useState([]);
  const [notes, setNotes] = useState({});
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState("");
  const [orderType, setOrderType] = useState("dine-in");
  const [orderStatus, setOrderStatus] = useState("not-arrived");
  const [numPeople, setNumPeople] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("cart"));
    console.log("Saved Order:", savedOrder);

    if (savedOrder) {
      setOrder(savedOrder);
    }

    // Fetch available vouchers
    const fetchUserAndVouchers = async () => {
      try {
        // Fetch data pengguna termasuk redeemedVouchers
        const userResponse = await axios.get("http://localhost:3000/api/users/profile");
        setRedeemedVouchers(userResponse.data.redeemedVouchers); // Ambil redeemedVouchers dari profil pengguna

        // Fetch available vouchers
        const voucherResponse = await axios.get("http://localhost:3000/api/vouchers");
        setVouchers(voucherResponse.data);
      } catch (error) {
        console.error("Error fetching vouchers or user data:", error);
      }
    };

    fetchVouchers();
  }, []);

  const handleVoucherSelection = (e) => {
    const selectedCode = e.target.value;
    setSelectedVoucher(selectedCode);

    // Hanya izinkan memilih voucher yang telah diredeem
    if (!redeemedVouchers.includes(selectedCode)) {
      alert("This voucher has not been redeemed by you.");
      setSelectedVoucher(""); // Reset voucher selection
    }
  };

  const handleDecrement = (index) => {
    const newOrder = [...order];
    if (newOrder[index].quantity > 1) {
      newOrder[index].quantity -= 1;
      setOrder(newOrder);
      localStorage.setItem("cart", JSON.stringify(newOrder));
    }
  };

  const handleIncrement = (index) => {
    const newOrder = [...order];
    newOrder[index].quantity += 1;
    setOrder(newOrder);
    localStorage.setItem("cart", JSON.stringify(newOrder));
  };

  const handleRemove = (index) => {
    const newOrder = order.filter((_, i) => i !== index);
    setOrder(newOrder);
    localStorage.setItem("cart", JSON.stringify(newOrder));
  };

  const handleNoteChange = (index, value) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [index]: value,
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    order.forEach(product => {
      const price = Number(product.price);
      const quantity = Number(product.quantity);
      if (!isNaN(price) && !isNaN(quantity)) {
        total += price * quantity;
      }
    });
    return total;
  };

  const calculateTax = (total) => {
    return total * 0.11;
  };

  const calculateDiscount = () => {
    if (selectedVoucher) {
      const voucher = vouchers.find(v => v.code === selectedVoucher);
      return voucher ? (calculateTotal() * (voucher.discount / 100)) : 0;
    }
    return 0;
  };

  const total = calculateTotal();
  const tax = calculateTax(total);
  const discount = calculateDiscount();
  const totalWithTax = total + tax - discount;

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const orderData = {
        orderItems: order.map((item, index) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          qty: item.quantity,
          image: item.image,
          category: item.category,
          totalPrice: item.price * item.quantity,
          note: notes[index] || "",
        })),
        paymentMethod: "cash",
        taxPrice: tax,
        totalPrice: totalWithTax,
        voucher: selectedVoucher,
        orderStatus,
        numPeople: orderStatus === "not-arrived" && orderType === "dine-in" ? numPeople : undefined,
      };

      console.log("Order Data:", orderData);

      const response = await axios.post("http://localhost:3000/api/orders", orderData, config);
      console.log("Order saved:", response.data);

      localStorage.removeItem("cart");
      setOrder([]);

      alert("Your order has been processed successfully!");

      navigate("/order-success");
    } catch (error) {
      console.error("Error saving order:", error);
      alert("There was an error processing your order. Please try again.");
    }
  };


  return (
    <div className="container px-5 py-36 mx-auto">
      <div className="inset-0 flex items-center justify-center z-30">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-[#03151E] font-motter-corpus-std text-6xl mb-6 animate-fade-in">
            Confirm Order
          </h1>
        </div>
      </div>

      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        {/* Order Status */}
        <section className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-lg font-semibold font-raleway mb-2 text-[#21325E] content-center">Order Location</h2>
          <p className="text-sm text-gray-600 mb-3">Select your current location</p>
          <div className="flex space-x-4">
            <button 
              className={`flex items-center justify-center flex-1 py-2 px-4 rounded-full font-raleway font-semibold ${orderStatus === "arrived" ? "bg-[#3AA1B2] text-white" : "bg-white text-[#21325E] border border-[#21325E]"} hover:bg-[#3AA1B2] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#3AA1B2] transition`}
              onClick={() => setOrderStatus("arrived")}
            >
              <img src={orderStatus === "arrived" ? arrivedWhite : arrivedblue} alt="Arrived" className="w-12 h-12 mr-2" />
              Arrived
            </button>
            <button 
              className={`flex items-center justify-center flex-1 py-2 px-4 rounded-full font-raleway font-semibold ${orderStatus === "not-arrived" ? "bg-[#3AA1B2] text-white" : "bg-white text-[#21325E] border border-[#21325E]"} hover:bg-[#3AA1B2] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#3AA1B2] transition`}
              onClick={() => setOrderStatus("not-arrived")}
            >
              <img src={orderStatus === "not-arrived" ? notarrivedWhite : notarrivedblue} alt="Not Arrived" className="w-12 h-12 mr-2" />
              Not Arrived
            </button>
          </div>
        </section>

        {/* Order Type */}
        <section className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-lg font-semibold font-raleway mb-2 text-[#21325E] content-center">Order Type</h2>
          <p className="text-sm text-gray-600 mb-3">Select your order type</p>
          <div className="flex space-x-4">
            <button
              className={`flex items-center justify-center flex-1 py-2 px-4 rounded-full font-raleway font-semibold ${orderType === "dine-in" ? "bg-[#3AA1B2] text-white" : "bg-white text-[#21325E] border border-[#21325E]"} hover:bg-[#3AA1B2] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#3AA1B2] transition`}
              onClick={() => setOrderType("dine-in")}
            >
              <img src={orderType === "dine-in" ? dineInWhite : dineInBlue} alt="Dine-in" className="w-12 h-12 mr-2" />
              Dine-in
            </button>
            <button
              className={`flex items-center justify-center flex-1 py-2 px-4 rounded-full font-raleway font-semibold ${orderType === "takeaway" ? "bg-[#3AA1B2] text-white" : "bg-white text-[#21325E] border border-[#21325E]"} hover:bg-[#3AA1B2] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#3AA1B2] transition`}
              onClick={() => setOrderType("takeaway")}
            >
              <img src={orderType === "takeaway" ? takeawayWhite : takeawayBlue} alt="Takeaway" className="w-12 h-12 mr-2" />
              Takeaway
            </button>
          </div>
        </section>

        {/* Number of People */}
        {orderStatus === "not-arrived" && orderType === "dine-in" && (
          <section className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-lg font-semibold font-raleway mb-2">Reservation Details</h2>
            <p className="text-sm text-gray-600 mb-3">Enter the number of people for the reservation</p>
            <div>
              <label htmlFor="numPeople" className="block text-sm font-medium font-raleway text-gray-700">Number of People</label>
              <input 
                type="number" 
                id="numPeople" 
                name="numPeople" 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                value={numPeople} 
                onChange={(e) => setNumPeople(e.target.value)} 
                min="1" 
              />
            </div>
          </section>
        )}

        {/* Customer Details */}
        <section className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-semibold font-raleway mb-2">Customer Details</h2>
          <p className="text-sm text-gray-600 mb-3">Enter your details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium font-raleway text-gray-700">Customer Name</label>
              <input type="text" id="customerName" name="customerName" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter customer name" />
            </div>
            {orderType === "dine-in" ? (
              <div>
                <label htmlFor="tableNumber" className="block text-sm font-medium font-raleway text-gray-700">Table Number</label>
                <input type="text" id="tableNumber" name="tableNumber" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your table number" />
              </div>
            ) : (
              <div>
                <label htmlFor="estimatedArrival" className="block text-sm font-medium font-raleway text-gray-700">Estimated Arrival</label>
                <input type="time" id="estimatedArrival" name="estimatedArrival" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter estimated arrival time" onChange={(e) => setEstimatedPickupTime(e.target.value)} />
              </div>
            )}
          </div>
        </section>
        <h2 className="text-xl font-semibold font-raleway text-gray-900 dark:text-white sm:text-2xl text-center">Selected Items</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {order.length > 0 ? (
                order.map((product, index) => (
                  <div key={product._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <img className="h-20 w-20 dark:hidden" src={product.image} alt={product.name} />
                        <img className="hidden h-20 w-20 dark:block" src={product.image} alt={product.name} />
                      </a>

                      <label htmlFor={`counter-input-${index}`} className="sr-only">Choose quantity:</label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleDecrement(index)}
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <input
                            type="text"
                            id={`counter-input-${index}`}
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium font-raleway text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                            value={product.quantity}
                            readOnly
                            required
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement(index)}
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold font-raleway text-gray-900 dark:text-white">IDR {(product.price * product.quantity).toLocaleString('id-ID')}</p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a href="#" className="text-base font-medium font-raleway text-gray-900 hover:underline dark:text-white">
                          {product.name}
                        </a>
                        <div className="flex items-center gap-4">
                          <button type="button" onClick={() => handleRemove(index)} className="inline-flex items-center text-sm font-medium font-raleway text-red-600 hover:underline dark:text-red-500">
                            <svg className="mr-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
                            </svg>
                            Remove
                          </button>
                        </div>
                        <div>
                          <input
                            type="text"
                            id={`note-${index}`}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Add a note for this item"
                            value={notes[index] || ""}
                            onChange={(e) => handleNoteChange(index, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-3">
                  No products in your cart.
                </p>
              )}
            </div>

            {/* Add Voucher */}
            <section className="bg-white rounded-lg shadow p-4 mb-6 mt-6">
        <h2 className="text-lg font-semibold font-raleway mb-2">Apply Your Voucher</h2>
        <p className="text-sm text-gray-600 mb-3">Select your voucher</p>
        <div className="flex space-x-4">
          {redeemedVouchers.length > 0 ? (
            <>
              <select
                className="flex-1 py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                value={selectedVoucher}
                onChange={handleVoucherSelection}
              >
                <option value="">Select a voucher</option>
                {vouchers
                  .filter(voucher => redeemedVouchers.includes(voucher.code)) // Hanya tampilkan voucher yang telah diredeem
                  .map((voucher) => (
                    <option key={voucher._id} value={voucher.code}>
                      {voucher.code} - {voucher.discount}% off
                    </option>
                  ))}
              </select>
              <button className="py-2 px-4 rounded-full text-white bg-[#21325E] hover:bg-[#4BC1D2] focus:outline-none focus:ring-2 focus:ring-[#4BC1D2] transition">
                Apply
              </button>
            </>
          ) : (
            <p className="text-gray-500">No vouchers available to apply.</p>
          )}
        </div>
      </section>

            {/* Order Summary */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="mt-6 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold font-raleway text-gray-900 dark:text-white">Order summary</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal font-raleway text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base font-medium font-raleway text-gray-900 dark:text-white">IDR {total.toLocaleString('id-ID')}</dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal font-raleway text-gray-500 dark:text-gray-400">Tax (11%)</dt>
                      <dd className="text-base font-medium font-raleway text-gray-900 dark:text-white">IDR {tax.toFixed(2).toLocaleString('id-ID')}</dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold font-raleway text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base font-bold font-raleway text-gray-900 dark:text-white">IDR {totalWithTax.toFixed(2).toLocaleString('id-ID')}</dd>
                  </dl>
                </div>
                <button onClick={handleCheckout} className="flex w-full items-center justify-center rounded-lg bg-[#AAE8ED] hover:bg-[#3AA1B2] hover:text-white px-5 py-2.5 text-sm font-medium font-raleway text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;