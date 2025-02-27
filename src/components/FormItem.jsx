import React, { useState, useEffect } from 'react';

const FormItem = ({ onSubmit, onCancel, initialValues, title, onChange }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [category, setCategory] = useState(initialValues?.category || '');  
  const [stock, setStock] = useState(initialValues?.countInStock || 0); 
  const [price, setPrice] = useState(initialValues?.price || 0);
  const [rating, setRating] = useState(initialValues?.rating || 0);
  const [reviewCount, setReviewCount] = useState(initialValues?.numReview || 0); 
  const [images, setImages] = useState(initialValues?.images || []); // Store selected images
  const [imagePreview, setImagePreview] = useState(initialValues?.image || ''); // Preview URL for images

  useEffect(() => {
    // If initialValues contains an existing image URL, we can set it as preview
    if (initialValues?.image) {
      setImagePreview(initialValues.image);  // Set initial image URL if available
    }
  }, [initialValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, description, category, countInStock: stock, price, rating, numReview: reviewCount, images });
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImages([file]); // Store the selected file in state

      // Create a URL for the image file to show preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Update preview URL
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);  
  };

  // Handle cancel image preview
  const handleCancelImage = () => {
    setImagePreview('');  // Clear the image preview
    setImages([]);  // Clear the selected image (this will prevent submitting a new image)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-lg font-raleway font-medium">{title}</h1>
      <h2 className="text-3xl font-raleway font-bold mb-[1vw]">Menu Details</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            onChange(); // Trigger onChange for dirty checking
          }}
          className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            onChange();
          }}
          className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
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
          <label htmlFor="stock" className="block text-gray-700 font-medium mb-2">Stock</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value, 10))}
            className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value, 10))}
            className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 font-medium mb-2">Add Image</label>
        <input
          type="file"
          id="images"
          onChange={handleImageChange}
          className="hidden"
        />
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
          <p className="text-gray-600 mt-2 font-3xl font-bold">CHOOSE IMAGE</p>
        </label>

        {/* Display selected image preview */}
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Selected Preview"
              className="w-48 h-48 object-cover border rounded-md"
            />
            {/* Cancel Button for image */}
            <button
              type="button"
              onClick={handleCancelImage}
              className="mt-2 bg-red-500 text-white font-medium py-1 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Display existing image if available */}
        {images.length > 0 && !imagePreview && (
          <div className="mt-2 flex justify-center relative">
            <img
              src={images[0]}  // Display the existing image from the server
              alt="Existing Image"
              className="w-48 h-48 object-cover border rounded-md"
            />
            <button
              type="button"
              onClick={handleCancelImage}
              className="mt-2 bg-red-500 text-white font-medium py-1 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
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
