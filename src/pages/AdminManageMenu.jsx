import { useState, useEffect } from 'react';

const AdminManageMenu = () => {
    const menuItems = [
        //... your menu item data
        {
            id: 1,
            name: "Peach Tea",
            image:
                "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1734870610/glgfid2qpwcerevrpedw.png",
            description:
                "A refreshing and sweet iced tea infused with the juicy flavor of ripe peaches. Perfect for a light and fruity pick-me-up.",
            price: 10000,
            countInStock: 14,
            rating: 4.8, // Ganti dengan nilai rating yang valid
            numReview: 6, // Ganti dengan nilai review count yang valid
            category: "Drink"
        },
        //... more menu items
    ];

    return (
        <div className="container mx-auto mt-[8vw] p-7">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold font-raleway">MENUS</h1>
                    <button className="bg-[#334147] hover:bg-[#07779D] text-white font-raleway font-medium py-2 px-4 rounded-md ml-4">
                        + Add New
                    </button>
                </div>

                <div className="relative ml-4 items-center">
                    <input
                        type="text"
                        placeholder="Search Menu"
                        className="border border-[#07779D] px-[1vw] py-[1vw] rounded-[0.5vw] focus:outline-none w-[30vw]"
                    />
                    <button className="absolute right-[0.5vw] top-[0.5vw] bg-[#07779D] text-white font-medium font-raleway
                                            py-2 px-2 rounded-full ">
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
            </div>

            <table className="table-fixed w-full border-collapse mt-[2vw]">
                <thead>
                    <tr className="bg-[#AAE8ED]">
                        <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black w-[3vw]">ID</th>
                        <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black w-[10vw]">NAME</th>
                        <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black w-[20vw]">DESCRIPTION</th>
                        <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black w-[7vw]">PRICE</th>
                        <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black w-[5vw]">STOCK</th>
                        <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black w-[5vw]">RATING</th>
                        <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black w-[10vw]">REVIEW COUNT</th>
                        <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black w-[7vw]">CATEGORY</th>
                        <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black w-[7vw]">MODIFY</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item, index) => (
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