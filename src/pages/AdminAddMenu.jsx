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
          'Content-Type': 'multipart/form-data'  // Important for sending files
        }
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      console.log('Success:', response.data);
      alert('Menu Added Successfully!');
      navigate('/AdminManageMenu');  // Redirect to menu management page
    } catch (error) {
      console.error('Error:', error);
      alert(`Error adding menu: ${error.message}`);
    }
  };

  const handleCancel = () => {
    navigate('/AdminManageMenu');  // Cancel and navigate back to menu management
  };

  // Prepare FormData for the POST request
  // Prepare FormData for the POST request
  const createFormData = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);  // Ensure 'description' is appended
    formData.append('category', data.category);
    formData.append('countInStock', data.countInStock);
    formData.append('price', data.price);
    formData.append('rating', data.rating);
    formData.append('numReview', data.numReview);
  
    // Append images to FormData
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append('images', image);  // Use 'images' field name
        }
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
