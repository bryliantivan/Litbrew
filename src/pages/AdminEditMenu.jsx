// pages/AdminEditMenu.js
import React, { useState, useEffect } from 'react';
import FormItem from '../components/FormItem';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminEditMenu = () => {
  const { id } = useParams();  // Keep this as 'id', it's a URL parameter
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // No change needed here; 'id' from useParams is correct for the URL
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = response.data;
        // Make sure the initial values use _id, but setMenu uses the data as is.
        setMenu({ ...data, images: data.images || [] });

      } catch (error) {
        setError(error);
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      // No change needed here, 'id' from useParams is correct
      const response = await axios.put(`http://localhost:3000/api/products/${id}`, createFormData(formData), {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

       if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Menu Updated Successfully!");
      navigate('/AdminManageMenu');
    } catch (error) {
      setError(error);
      console.error("Error updating menu:", error);
      alert(`Error updating menu: ${error.message}`);
    }
  };

  // createFormData doesn't need _id, it creates the data to *send* to the API
  const createFormData = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('countInStock', data.countInStock);
    formData.append('price', data.price);
    formData.append('rating', data.rating);
    formData.append('numReview', data.numReview);

    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append(`image${index}`, image);
        }
      });
    }

    return formData;
  };

  const handleCancel = () => {
    navigate('/AdminManageMenu');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!menu) {
    return <div>Menu not found.</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-[7vw]">
      <FormItem onSubmit={handleSubmit} onCancel={handleCancel} initialValues={menu} title="EDIT MENU" />
    </div>
  );
};

export default AdminEditMenu;