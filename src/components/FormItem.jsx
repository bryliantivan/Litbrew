import React, { useState } from 'react';

const FormItem = ({ onSubmit, onCancel, initialValues, title }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [category, setCategory] = useState(initialValues?.category || '');  // Use dropdown value
  const [stock, setStock] = useState(initialValues?.countInStock || 0); // Use countInStock
  const [price, setPrice] = useState(initialValues?.price || 0);
  const [rating, setRating] = useState(initialValues?.rating || 0);
  const [reviewCount, setReviewCount] = useState(initialValues?.numReview || 0); // Use numReview
  const [images, setImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, description, category, countInStock: stock, price, rating, numReview: reviewCount, images }); // Use countInStock and numReview
  };

  const handleImageChange = (event) => {
    setImages([...event.target.files]);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);  // Set the selected category
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-lg font-raleway font-medium">{title}</h1> {/* Use the title prop */}
      <h2 className="text-3xl font-raleway font-bold mb-[1vw]">Menu Details</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Drink">Drink</option>
          <option value="Book">Book</option>
        </select>
      </div>

      <div className="flex">
        <div className="mb-4 mr-4">
          <label htmlFor="stock" className="block text-gray-700 font-medium mb-2">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value, 10))}
            className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value, 10))}
            className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex">
        <div className="mb-4 mr-4">
          <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="reviewCount" className="block text-gray-700 font-medium mb-2">
            Review Count
          </label>
          <input
            type="number"
            id="reviewCount"
            value={reviewCount}
            onChange={(e) => setReviewCount(parseInt(e.target.value, 10))}
            className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 font-medium mb-2">
          Add Images
        </label>
        {/* Use a file input */}
        <input
          type="file"
          id="images"
          multiple // Allow multiple file selection
          onChange={handleImageChange}
          className="hidden" // Hide the default file input
        />
        {/* Custom file input styling */}
        <label htmlFor="images" className="bg-gray-200 p-6 rounded-md flex flex-col items-center justify-center cursor-pointer">
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
          <p className="text-gray-600 mt-2 font-3xl font-bold">CHOOSE SCAN</p>
          {/* Display selected file names */}
          {images.length > 0 && (
            <div className="mt-2">
              {images.map((file, index) => (
                <p key={index} className="text-gray-600 text-sm">{file.name}</p>
              ))}
            </div>
          )}
        </label>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md mr-3"
        >
          CANCEL
        </button>
        <button
          type="submit"
          className="bg-[#334147] hover:bg-[#07779D] text-white font-medium py-2 px-4 rounded-md"
        >
          SAVE
        </button>
      </div>
    </form>
  );
};

export default FormItem;