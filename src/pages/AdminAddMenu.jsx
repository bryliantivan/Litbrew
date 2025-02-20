import React from 'react';

const AdminAddMenu = () => {
  return (
    <div className="container mx-auto p-6 mt-[7vw]">
      <h1 className="text-lg font-raleway font-medium">ADD NEW MENU</h1>
      <h2 className="text-3xl font-raleway font-bold mb-[1vw]">Menu Details</h2>
      
      <div>
        <div className="mb-4">
          <label htmlFor="menuName" className="block text-gray-700 font-medium mb-2">
            Menu Name
          </label>
          <input 
            type="text" 
            id="menuName" 
            className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea 
            id="description" 
            className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <input 
            type="text" 
            id="category" 
            className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="flex">
          {/* Stock */}
          <div className="mb-4 mr-4">
            <label htmlFor="stock" className="block text-gray-700 font-medium mb-2">
              Stock
            </label>
            <input 
              type="number" 
              id="stock" 
              className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input 
              type="number" 
              id="price" 
              className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        <div className="flex">
          {/* Rating */}
          <div className="mb-4 mr-4">
            <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">
              Rating
            </label>
            <input 
              type="number" 
              id="rating" 
              className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          {/* Review Count */}
          <div className="mb-4">
            <label htmlFor="reviewCount" className="block text-gray-700 font-medium mb-2">
              Review Count
            </label>
            <input 
              type="number" 
              id="reviewCount" 
              className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        {/* Add Images */}
        <div className="mb-4">
            <label htmlFor="images" className="block text-gray-700 font-medium mb-2">
                Add Images
            </label>
            <div className="bg-gray-200 p-6 rounded-md flex flex-col items-center justify-center"> {/* Tambahkan flex-col */}
                <svg 
                className="w-12 h-12 text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
                </svg>
                <p className="text-gray-600 mt-2 font-3xl font-bold">CHOOSE SCAN</p> {/* Tambahkan teks */}
            </div>
            </div>

        <div className="flex justify-center">
            <button className="bg-gray-400 hover:bg-[#334147] text-white font-medium py-2 px-4 rounded-md mr-2">
            CANCEL
          </button>
          <button className="bg-[#334147] hover:bg-[#07779D] text-white font-medium py-2 px-4 rounded-md">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddMenu;