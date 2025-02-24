// pages/AdminManageBook.js
import React, { useState, useEffect } from 'react';
import TableItem from '../components/TableItem';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminManageBook = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        const allItems = response.data;
        setMenuItems(allItems);
        const initiallyFiltered = allItems.filter(
          item => item.category === "Book"
        );
        setFilteredMenuItems(initiallyFiltered);
      } catch (error) {
        setError(error);
        console.error("Error fetching menus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const filterItems = () => {
      const filtered = menuItems.filter(item =>
        (item.category === "Book") &&
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredMenuItems(filtered);
    }

    const debouncedFilter = debounce(filterItems, 300);

    if (searchTerm) {
      debouncedFilter();
    } else {
      const initiallyFiltered = menuItems.filter(
        item => item.category === "Book"
      );
      setFilteredMenuItems(initiallyFiltered);
    }
  }, [searchTerm, menuItems]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        // Retrieve token from localStorage or wherever it's stored
        const token = localStorage.getItem('token'); // Adjust if you're using a different method

        // Check if the token exists
        if (!token) {
          alert("You must be logged in to delete a product.");
          return;
        }

        // Send the delete request with Authorization header
        await axios.delete(`http://localhost:3000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Add the token in the Authorization header
          }
        });

        // Update the menuItems state to remove the deleted item
        setMenuItems(menuItems.filter(item => item._id !== id));
        setFilteredMenuItems(filteredMenuItems.filter(item => item._id !== id));

        alert('Menu item deleted successfully!');
      } catch (error) {
        setError(error);
        console.error("Error deleting menu:", error);
        alert(`Error deleting menu: ${error.message}`);
      }
    }
  };



  const handleEdit = (item) => {
    // Use _id here:
    navigate(`/AdminEditMenu/${item._id}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableTitles = ['No', 'Name', 'Description', 'Price', 'Stock', 'Rating', 'Review', 'Category', 'Actions'];

  return (
    <div className="container mx-auto mt-[8vw] p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold font-raleway">MENUS</h1>
          <Link to="/AdminAddMenuAndBook" className="bg-[#334147] hover:bg-[#07779D] text-white font-raleway font-medium py-2 px-4 rounded-md ml-4">
            + Add New
          </Link>
        </div>

        <div className="relative ml-4 items-center">
          <input
            type="text"
            placeholder="Search Menu"
            className="border border-[#07779D] px-[1vw] py-[1vw] rounded-[0.5vw] focus:outline-none w-[30vw]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="absolute right-[0.5vw] top-[0.5vw] bg-[#07779D] text-white font-medium font-raleway py-2 px-2 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <TableItem items={filteredMenuItems} titles={tableTitles} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminManageBook;