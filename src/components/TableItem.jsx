import React, { useState } from 'react';

const TableItem = ({ items, titles }) => {
    const [editingItem, setEditingItem] = useState(null);
  
    const handleEdit = (item) => setEditingItem(item);
    const handleSave = () => setEditingItem(null);
    const handleCancel = () => setEditingItem(null);
  
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
            <tr key={index} className="hover:bg-gray-200">
              <td className="p-4 border text-center">{index + 1}</td>
              <td className="p-4 border">{item.name}</td>
              <td className="p-4 border">{item.description}</td>
              <td className="p-4 border text-center">{item.price}</td>
              <td className="p-4 border text-center">{item.countInStock}</td>
              <td className="p-4 border text-center">{item.rating}</td>
              <td className="p-4 border text-center">{item.numReview}</td>
              <td className="p-4 border text-center">{item.category}</td>
              <td className="p-4 border text-center">
                {editingItem?.id === item.id ? (
                  <div>
                    <button onClick={handleSave} className="text-green-500 hover:text-green-700 mr-2">Save</button>
                    <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                    <button className="text-red-500 hover:text-red-700">Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default TableItem;
  