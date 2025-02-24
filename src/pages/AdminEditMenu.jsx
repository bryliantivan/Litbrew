import React, { useState, useEffect } from 'react';
import FormItem from '../components/FormItem';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminEditMenu = () => {
  const { id } = useParams();  // Get the product ID from URL parameter
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setMenu(response.data);  // Set the menu to the data returned from the backend
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
      const response = await axios.put(
        `http://localhost:3000/api/products/${id}`,
        createFormData(formData),
        {
          headers: {
            'Content-Type': 'multipart/form-data',  // Important for handling form data with files
          },
        }
      );

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


  const createFormData = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('countInStock', data.countInStock);
    formData.append('price', data.price);  // Make sure price is included
    formData.append('rating', data.rating);
    formData.append('numReview', data.numReview);
  
    // Handle image files
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append(`image${index}`, image);
        }
      });
    }
  
    // Log FormData to ensure it's populated correctly
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
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
