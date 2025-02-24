import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaChevronDown } from 'react-icons/fa';
import { cup_profile, Badge_01, Badge_02, Badge_03, Badge_04, Badge_05, Badge_06, Badge_07, xp, voucher } from '../assets/images';
import cecep_ganteng from '../assets/images/cecep_ganteng.png';

const Profile = () => {
  // Data badges (usually fetched from an API or state)
  const badges = [
    { name: 'Litbrew Einstein', image: Badge_01 },
    { name: 'Tough Sipper', image: Badge_02 },
    { name: 'Cookie Runner', image: Badge_03 },
    { name: 'Adventurer', image: Badge_04 },
    { name: 'Innovator King', image: Badge_05 },
    { name: 'Level Grinder', image: Badge_06 },
    { name: 'Mighty Genius', image: Badge_07 }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  // State to control editable profile fields (username, email, password)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [point, setPoint] = useState(0);
  const [level, setLevel] = useState(0); // Added level state
  const [levelProgress, setLevelProgress] = useState(0); // Added level progress state (percentage)


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get("http://localhost:3000/api/users/profile", config);
        setUsername(data.name || '');
        setEmail(data.email || '');
        setPoint(data.points || 0);
        setLevel(data.level || 0); // Set level from API response

        // Calculate level progress (example logic, adjust as needed)
        const nextLevelThreshold = 1000; // Example: 1000 points needed for next level
        setLevelProgress((data.points % nextLevelThreshold) / nextLevelThreshold * 100);


      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // Fetch vouchers from the API
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/vouchers");
        setVouchers(data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };
    fetchVouchers();
  }, []);

  const toggleVouchers = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      const profileData = { name: username, email, password };
      await axios.put("http://localhost:3000/api/users/profile", profileData, config);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Profile update failed.");
    }
  };

  const handleClaimVoucher = async (voucherId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Ambil userId dari token (misalnya dari payload token)
      const userId = JSON.parse(atob(token.split('.')[1])).id;

      // Kirim request untuk menebus voucher
      const { data } = await axios.post(
        `http://localhost:3000/api/vouchers/redeem`,
        { userId, voucherId },
        config
      );

      // Update UI setelah klaim berhasil
      alert(`${data.message} - ${data.voucher.name}`);

      // Jika klaim berhasil, hapus voucher yang diklaim dari daftar vouchers yang tersedia
      setVouchers(vouchers.filter(voucher => voucher._id !== voucherId)); // Menghapus voucher yang sudah diklaim dari UI

    } catch (error) {
      console.error("Error claiming voucher:", error);
      if (error.response) {
        alert(error.response.data.message || "Failed to claim voucher.");
      } else {
        alert("Failed to claim voucher.");
      }
    }
  };

  return (
    <div className="font-raleway antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24"> {/* Added py-8 for top/bottom padding */}
        {/* Top Section: User Information mt-[10vw] max-sm:mt-[25vw] */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row items-center"> {/* Responsive flex layout */}
            <img
              src={cecep_ganteng}
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-0 sm:mr-4 mb-4 sm:mb-0" // Responsive image size
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">{username}</h2>
              <p className="text-gray-500">{email}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 sm:mt-0 sm:ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
          </div>

            {/* Level and XP */}
            <div className='mt-6 bg-[#334147] rounded-lg p-4 text-white relative overflow-hidden'> {/* Added overflow-hidden */}
                <img src={cup_profile} alt="Trophy" className="absolute -left-16 -top-8 w-24 h-auto sm:w-32 sm:-top-10 sm:-left-20"  style={{transform: 'scale(1.2)'}}/> {/*Repositioned and resized trophy*/}
                <div className="sm:ml-32"> {/* Added margin-left to make space for the trophy */}
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-base sm:text-lg">Your Level is {level}! Surpassing</p> {/*Dynamic Level, responsive text*/}
                        <p className="text-sm sm:text-base">90.1% People Around the World!</p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <p>Level {level}</p> {/* Dynamic Level */}
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${levelProgress}%` }}></div> {/* Dynamic Progress */}
                        </div>
                        <p className="text-sm mt-1">XP Points: {point}</p>
                    </div>
                </div>
            </div>


          {/* Vouchers & XP Points */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Responsive grid layout */}
            {/* XP Points */}
            <div className="flex items-center rounded-lg border border-blue-400 bg-[#CFF2F5] px-4 py-2">
              <img src={xp} alt="Xp" className="w-6 h-6 mr-2" />
              <p className="text-gray-700 text-sm sm:text-base">XP Points: {point}</p>
            </div>

            {/* Vouchers */}
            <div className="flex items-center rounded-lg border border-blue-400 bg-[#CFF2F5] px-4 py-2 cursor-pointer hover:scale-105 transition-transform" onClick={toggleVouchers}>
                <img src={voucher} alt="Voucher" className="w-6 h-6 mr-2" />
                <p className="text-gray-700 text-sm sm:text-base">Vouchers</p>
                {isOpen ? (
                    <FaTimes className="ml-auto text-black hover:text-gray-700" />
                ) : (
                    <FaChevronDown className="ml-auto text-black hover:text-gray-700" />
                )}
            </div>
          </div>



          {/* Voucher List (Modal-like) */}
            {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">  {/* Max-height and overflow-y-auto */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Available Vouchers</h3>
                        <button onClick={toggleVouchers} className="text-gray-600 hover:text-gray-800">
                            <FaTimes />
                        </button>
                    </div>
                    {vouchers.length === 0 ? (
                        <p className="text-gray-500">No vouchers available.</p>
                    ) : (
                    vouchers.map((voucher, index) => (
                        <div
                            key={index}
                            className="bg-blue-100 p-4 rounded-lg mb-4 last:mb-0"
                        >
                            <p className="text-gray-800 font-semibold">{voucher.name}</p>
                            <p className="text-gray-600 text-sm">
                                Minimum Spend: {voucher.minSpend}
                            </p>
                            <p className="text-gray-600 text-sm">
                                Exp Date: {new Date(voucher.expDate).toLocaleDateString()} {/* Format date */}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-gray-600 text-sm">{voucher.claim}</p>
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm"
                                    onClick={() => handleClaimVoucher(voucher._id)}
                                >
                                    GET
                                </button>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        )}

        </div>


        {/* Badges */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Badges!</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"> {/* Responsive grid */}
            {badges.map((badge, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform"
              >
                <img src={badge.image} alt={badge.name} className="w-24 h-24 sm:w-32 sm:h-32 object-contain" />  {/*object-contain for proper scaling*/}
                <p className="text-center mt-2 text-sm sm:text-base">{badge.name}</p> {/*Badge Name*/}
              </div>
            ))}
          </div>
        </div>


        {/* Edit Profile Form (only username, email, and password) */}
        {isEditing && (
          <div className="my-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Your Username"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Your New Password"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Save Changes
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;