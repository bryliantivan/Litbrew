// components/TableItem.js
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TableItem = ({ items, titles, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto"> {/* Add this for horizontal scrolling on small screens */}
      <table className="min-w-full border-collapse mt-[2vw] "> {/* Use min-w-full */}
        <thead>
          <tr className="bg-[#AAE8ED]">
            {/* No */}
            <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[5%]">
              {titles[0]}
            </th>
            {/* Name */}
            <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[15%]">
              {titles[1]}
            </th>
            {/* Description */}
            <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[30%]">
              {titles[2]}
            </th>
            {/* Price */}
            <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[10%]">
              {titles[3]}
            </th>
            {/* Stock */}
            <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[8%]">
              {titles[4]}
            </th>
            {/* Rating */}
            <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[7%]">
              {titles[5]}
            </th>
            {/* Review */}
            <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[10%]">
              {titles[6]}
            </th>
            {/* Category */}
            <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[8%]">
              {titles[7]}
            </th>
            {/* Actions */}
            <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[7%]">
              {titles[8]}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id} className="hover:bg-gray-200">
              <td className="p-4 border-y-4 border-x-2 text-center font-raleway">{index + 1}</td>
              <td className="p-4 border-y-4 border-x-2 font-raleway">{item.name}</td>
              <td className="p-4 border-y-4 border-x-2 font-raleway">{item.description}</td>
              <td className="p-4 border-y-4 border-x-2 text-center font-raleway">{item.price}</td>
              <td className="p-4 border-y-4 border-x-2 text-center font-raleway">{item.countInStock}</td>
              <td className="p-4 border-y-4 border-x-2 text-center font-raleway">{item.rating}</td>
              <td className="p-4 border-y-4 border-x-2 text-center font-raleway">{item.numReview}</td>
              <td className="p-4 border-y-4 border-x-2 text-center font-raleway">{item.category}</td>
              <td className="p-4 border-y-4 border-x-2 text-center font-raleway">
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableItem;