import React, { useState, useEffect } from 'react';
import FormItem from '../components/FormItem';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminEditItem = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setMenu(response.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('description', formData.description);
      form.append('price', formData.price);
      form.append('countInStock', formData.countInStock);
      form.append('category', formData.category);
      form.append('rating', formData.rating);
      form.append('numReview', formData.numReview);
      if (formData.images) {
        form.append('image', formData.images[0]); // Assuming only one image
      }
  
      const response = await axios.put(
        `http://localhost:3000/api/products/${id}`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      alert("Item Updated Successfully!");
      navigateToPreviousPage(); // Navigasi ke halaman sebelumnya setelah berhasil
    } catch (error) {
      console.error("Error updating item:", error);
      alert(`Error updating item: ${error.message}`);
    }
  };

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
          formData.append(`image${index}`, image);
        }
      });
    }

    return formData;
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
      navigate('/AdminHome'); // Fallback jika tidak ada riwayat
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

  const handleFormChange = () => {
    setIsDirty(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!menu) {
    return <div>Item not found.</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-[7vw]">
      <FormItem
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialValues={menu}
        title="EDIT ITEM"
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

export default AdminEditItem;