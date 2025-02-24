// components/TableItem.js
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import ikon

const TableItem = ({ items, titles, onEdit, onDelete }) => {
  return (
    <table className="table-fixed w-full border-collapse mt-[2vw]">
      <thead>
        <tr className="bg-[#AAE8ED]">
          {titles.map((title, index) => (
            <th key={index} className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black">
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id} className="hover:bg-gray-200">
            <td className="p-4 border text-center">{index + 1}</td>
            <td className="p-4 border">{item.name}</td>
            <td className="p-4 border">{item.description}</td>
            <td className="p-4 border text-center">{item.price}</td>
            <td className="p-4 border text-center">{item.countInStock}</td>
            <td className="p-4 border text-center">{item.rating}</td>
            <td className="p-4 border text-center">{item.numReview}</td>
            <td className="p-4 border text-center">{item.category}</td>
            <td className="p-4 border text-center">
              <div className="flex justify-center items-center space-x-2"> {/* Use flexbox for layout */}
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"  // Add title for tooltip
                >
                  <FaEdit /> {/* Edit icon */}
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete" // Add title for tooltip
                >
                  <FaTrash /> {/* Delete icon */}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableItem;