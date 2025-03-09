import React, { useState, useEffect } from 'react';
import FormItem from '../components/FormItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAddItem = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navigate = useNavigate();
  const [isDirty, setIsDirty] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      alert('Item Added Successfully!');
      navigateToPreviousPage();
    } catch (error) {
      console.error('Error:', error);
      alert(`Error adding item: ${error.message}`);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowConfirmation(true);
    } else {
      navigateToPreviousPage();
    }
  };

  const confirmCancel = () => {
    navigateToPreviousPage();
    setShowConfirmation(false);
  };

  const cancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const navigateToPreviousPage = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/AdminHome');
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const createFormData = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('countInStock', data.countInStock);
    formData.append('price', data.price);

    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append('images', image);
        }
      });
    }

    return formData;
  };

  const handleFormChange = () => {
    setIsDirty(true);
  };

  return (
    <div className="container mx-auto p-6 mt-[7vw]">
      <FormItem
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        title="ADD NEW ITEM"
        onChange={handleFormChange}
      />

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="mb-4">Anda memiliki perubahan yang belum disimpan. Apakah Anda yakin ingin membatalkan?</p>
            <div className="flex justify-end">
              <button onClick={confirmCancel} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Ya</button>
              <button onClick={cancelConfirmation} className="bg-gray-300 px-4 py-2 rounded-md">Tidak</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAddItem;