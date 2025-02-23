// AdminAddMenu.js
import React from 'react';
import FormItem from '../components/FormItem';

const AdminAddMenu = () => {
  const handleSubmit = (formData) => {
    console.log('Form Data Submitted:', formData);

    // Example using fetch (POST request)
    fetch('/api/menus', {  // Replace with your actual API endpoint
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json', //  Use this for JSON data (without files)
         'Content-Type': 'multipart/form-data' // Use this when sending files!
      },
      body: createFormData(formData), // Convert to FormData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse JSON response
    })
    .then(data => {
      console.log('Success:', data);
      alert('Menu Added Successfully!');
      // Redirect or clear form
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`Error adding menu: ${error.message}`);
    });
  };


  const handleCancel = () => {
    console.log('Form Cancelled');
  };

  // Helper function to create FormData for file uploads
  const createFormData = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('stock', data.stock);
    formData.append('price', data.price);
    formData.append('rating', data.rating);
    formData.append('reviewCount', data.reviewCount);

    // Append each image file
    data.images.forEach((image, index) => {
      formData.append(`image${index}`, image); // Use a consistent name (e.g., image0, image1)
    });

    return formData;
  };

  return (
    <div className="container mx-auto p-6 mt-[7vw]">
      <FormItem onSubmit={handleSubmit} onCancel={handleCancel} title="ADD NEW MENU" />
    </div>
  );
};

export default AdminAddMenu;