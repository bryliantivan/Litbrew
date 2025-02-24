// pages/AdminAddMenu.js
import React from 'react';
import FormItem from '../components/FormItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAddMenu = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/products', createFormData(formData), {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      console.log('Success:', response.data);
      alert('Menu Added Successfully!');
      navigate('/AdminManageMenu');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error adding menu: ${error.message}`);
    }
  };

  const handleCancel = () => {
    navigate('/AdminManageMenu');
  };

  const createFormData = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('countInStock', data.countInStock);
    formData.append('price', data.price);
    formData.append('rating', data.rating); // Send rating, but backend should handle user reviews
    formData.append('numReview', data.numReview);  // Send numReview, but backend should handle

    if (data.images && Array.isArray(data.images)) {
        data.images.forEach((image, index) => {
            // No need to check if it is a File object, because in Add Menu
            // all images should be from the input file.
            formData.append(`image${index}`, image);

        });
    }

    return formData;
  };

  return (
    <div className="container mx-auto p-6 mt-[7vw]">
      <FormItem onSubmit={handleSubmit} onCancel={handleCancel} title="ADD NEW MENU" />
    </div>
  );
};

export default AdminAddMenu;