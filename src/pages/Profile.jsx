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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get("http://localhost:3000/api/users/profile", config);
        setUsername(data.name || '');
        setEmail(data.email || '');
        setPoint(data.points || 0);
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
    <div className="font-raleway antialiased mt-[10vw]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Top Section: User Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <img
              src={cecep_ganteng}
              alt="Profile"
              className="w-[5vw] h-[5vw] rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold">{username}</h2>
              <p className="text-gray-500">{email}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
          </div>

          {/* Level and XP */}
          <div className='mx-auto flex gap-8 items-center justify-center w-[60%] mt-6 bg-[#334147] rounded-lg p-4 text-white relative'>
            <img src={cup_profile} alt="Trophy" className="w-[10vw] h-[12vw] absolute transform translate-x-[-20vw] scale-125" />
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[2vw]">Your Level is 10! Surpassing</p>
                  <p className="text-[1vw]">90.1% People Around the World!</p>
                </div>
              </div>
              <div className="mt-2">
                <p>Level XX</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-sm mt-1">XP Points: {point}</p>
              </div>
            </div>
          </div>

          {/* Vouchers */}
          <div className="mt-4 font-bold"></div>
          <div className="my-auto font-bold flex pl-[1vw] items-center rounded-xl h-[2.5vw] border border-blue-400 bg-[#CFF2F5] w-[13vw]">
            <img src={xp} alt="Xp" className="w-6 h-6 inline-block mr-2" />
            <p className="text-gray-700 text-[1vw]">XP Points : {point}</p>
          </div>

          <div className="mt-4">
            <div
              className="font-bold hover:scale-105 transition-transform cursor-pointer my-auto flex pl-[1vw] items-center rounded-xl h-[2.5vw] border border-blue-400 bg-[#CFF2F5] w-[13vw]"
              onClick={toggleVouchers}
            >
              <img
                src={voucher}
                alt="Voucher"
                className="w-6 h-6 inline-block mr-2"
              />
              <p className="text-gray-700 text-[1vw]">Vouchers</p>
              {isOpen ? (
                <button onClick={toggleVouchers} className="mx-auto">
                  <FaTimes className="text-black hover:text-gray-700" />
                </button>
              ) : (
                <FaChevronDown className="ml-[1.5vw] opacity-50 text-black hover:text-gray-700" />
              )}
            </div>

            {isOpen && (
              <div className="relative">
                <div
                  className="fixed inset-0 bg-black opacity-50 z-40"
                  onClick={toggleVouchers}
                ></div>
                <div className="bg-white rounded-lg shadow-lg p-4 mt-2 max-h-[300px] overflow-y-auto z-50 relative">
                  <h3 className="text-lg font-semibold mb-3">Available Voucher</h3>
                  {vouchers.map((voucher, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 p-4 rounded-lg mb-2 last:mb-0"
                    >
                      <p className="text-gray-800 font-semibold">{voucher.name}</p>
                      <p className="text-gray-600 text-sm">
                        Minimum Spend: {voucher.minSpend}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Exp Date: {voucher.expDate}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-gray-600 text-sm">{voucher.claim}</p>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm"
                          onClick={() => handleClaimVoucher(voucher._id)} // Call the function to claim voucher
                        >
                          GET
                        </button>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="mt-8 pb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Badges!</h2>
          <div className="flex flex-wrap justify-center items-center gap-16 w-[80vw] mx-auto">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-2 h-[18vw] w-[15vw] flex flex-col items-center justify-center hover:scale-105 transition-transform"
              >
                <img src={badge.image} alt={badge.name} className="w-full mb-2" />
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
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;