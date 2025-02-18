import { useState, useEffect } from 'react';

const AdminManageMenu = () => {
    const menuItems = [
        //... your menu item data
    ];

    return (
        <div className="container mx-auto p-7">
            <h1 className="text-2xl font-bold mb-4">MENUS</h1>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search Menu"
                    className="border border-gray-400 px-3 py-2 rounded-md w-full mr-2"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>

            <button className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md mb-4">
                + Add New
            </button>

            <table className="table-fixed w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-4 border font-medium text-gray-500">ID</th>
                        <th className="p-4 border font-medium text-gray-500">NAME</th>
                        <th className="p-4 border font-medium text-gray-500">DESCRIPTION</th>
                        <th className="p-4 border font-medium text-gray-500">PRICE</th>
                        <th className="p-4 border font-medium text-gray-500">STOCK</th>
                        <th className="p-4 border font-medium text-gray-500">RATING</th>
                        <th className="p-4 border font-medium text-gray-500">REVIEW COUNT</th>
                        <th className="p-4 border font-medium text-gray-500">CATEGORY</th>
                        <th className="p-4 border font-medium text-gray-500">MODIFY</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-200">
                            <td className="p-4 border text-center">{item.id}</td>
                            <td className="p-4 border">{item.name}</td>
                            <td className="p-4 border">{item.description}</td>
                            <td className="p-4 border text-center">{item.price}</td>
                            <td className="p-4 border text-center">{item.stock}</td>
                            <td className="p-4 border text-center">{item.rating}</td>
                            <td className="p-4 border text-center">{item.reviewCount}</td>
                            <td className="p-4 border text-center">{item.category}</td>
                            <td className="p-4 border text-center">
                                <button className="text-blue-500 hover:text-blue-700 mr-2">
                                    Edit
                                </button>
                                <button className="text-red-500 hover:text-red-700">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminManageMenu;