import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("cart"));
    console.log("Saved Order:", savedOrder); // Tambahkan log ini
    if (savedOrder) {
      setOrder(savedOrder);
    }
  }, []);

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

  const total = calculateTotal();
  const tax = calculateTax(total);
  const totalWithTax = total + tax;

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
        orderItems: order.map(item => ({
          product: item._id,
          name: item.name,
          price: item.price,
          qty: item.quantity,
          image: item.image,
          category: item.category,
          totalPrice: item.price * item.quantity,
        })),
        paymentMethod: "cash", // or any other method you want to use
        taxPrice: tax,
        totalPrice: totalWithTax,
      };

      console.log("Order Data:", orderData); // Tambahkan log ini

      const response = await axios.post("http://localhost:3000/api/orders", orderData, config);
      console.log("Order saved:", response.data);

      // Clear cart after successful order
      localStorage.removeItem("cart");
      setOrder([]);

      // Tampilkan alert setelah pesanan berhasil disimpan
      alert("Your order has been processed successfully!");

      // Redirect to a success page or order summary page
      navigate("/order-success");
    } catch (error) {
      console.error("Error saving order:", error);
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
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

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
                              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" 
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
                            <p className="text-base font-bold text-gray-900 dark:text-white">IDR {(product.price * product.quantity).toLocaleString('id-ID')}</p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                            {product.name}
                          </a>
                          <div className="flex items-center gap-4">
                            <button type="button" onClick={() => handleRemove(index)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                              <svg className="mr-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-3">
                    No products in the order.
                  </p>
                )}
              </div>

              {/* Order Summary */}
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">IDR {total.toLocaleString('id-ID')}</dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax (11%)</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">IDR {tax.toFixed(2).toLocaleString('id-ID')}</dd>
                      </dl>
                    </div>
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">IDR {totalWithTax.toFixed(2).toLocaleString('id-ID')}</dd>
                    </dl>
                  </div>
                  <button onClick={handleCheckout} className="flex w-full items-center justify-center rounded-lg bg-[#AAE8ED] px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;