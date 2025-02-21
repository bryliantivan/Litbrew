import { useState, useEffect } from 'react';
import axios from 'axios';
import TableItem from '../components/TableItem';

const AdminManageMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch product details and reviews
        axios.get('http://localhost:3000/api/products')
        .then((response) => {
            console.log("Data API:", response.data);
            
            // Filter hanya kategori "Drink" dan "Food"
            const filteredItems = response.data.filter(
                item => item.category === "Drink" || item.category === "Food"
            );

            console.log("Filtered items:", filteredItems);
            setMenuItems(filteredItems);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching product details:", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

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
                    <button className="absolute right-[0.5vw] top-[0.5vw] bg-[#07779D] text-white font-medium font-raleway py-2 px-2 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Tampilkan tabel menggunakan TableItem */}
            <TableItem 
                items={menuItems} 
                titles={["ID", "NAME", "DESCRIPTION", "PRICE", "STOCK", "RATING", "REVIEW COUNT", "CATEGORY", "MODIFY"]}
            />
        </div>
    );
};

export default AdminManageMenu;