import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaChevronDown } from 'react-icons/fa';
import { cup_profile, xp, voucher } from '../assets/images';

const Profile = () => {
  const [badges, setBadges] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [point, setPoint] = useState(0);
  const [level, setLevel] = useState(0);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  // Statis Badge List
  const Badge = [
    {
      color: 'blue',
      name: 'First Starter',
      orderCount: 1,
      image: "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1741571701/Badge/ydialxvv82jumvkh2xoh.png"
    },
    {
      color: 'green',
      name: 'Active Member',
      orderCount: 5,
      image: "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1741571715/Badge/k7wmeytzqlxfu67d7wcu.png"
    },
    {
      color: 'purple',
      name: 'Advanced Step',
      orderCount: 10,
      image: "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1741571719/Badge/tloh6qbaew2ljph2mrcz.png"
    },
    {
      color: 'bronze',
      name: 'Bronze Achiever',
      orderCount: 15,
      image: "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1741571706/Badge/lbwy0j3tpwieyo9zpp47.png"
    },
    {
      color: 'silver',
      name: 'Silver Star',
      orderCount: 20,
      image: "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1741571723/Badge/ngdpnzm0ubrirc7qnc0d.png"
    },
    {
      color: 'gold',
      name: 'Gold Champion',
      orderCount: 30,
      image: "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1741571710/Badge/fxpwhput7yam86p7kkuu.png"
    },
    {
      color: 'black',
      name: 'Legendary Black',
      orderCount: 50,
      image: "https://res.cloudinary.com/dhwvjtkyw/image/upload/v1741571697/Badge/sywqmyibr99xt5qhaema.png"
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get("http://localhost:3000/api/users/profile", config);
        console.log("Profile Data:", data);  // Log data profil yang diterima
        setUsername(data.name || '');
        setEmail(data.email || '');
        setPoint(data.points || 0);
        setLevel(data.level || 0);
        
        // Set profile picture from the API
        setProfilePictureUrl(data.profilePicture || ''); // Use profilePicture from the backend data

        // Map user order count to badges based on orderCount
        const userBadgeList = Badge.filter(badge => data.orderCount >= badge.orderCount); // Filter badges based on orderCount
        setUserBadges(userBadgeList);  // Set the user's badges based on orderCount
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    // Fetch available vouchers
    const fetchVouchers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get("http://localhost:3000/api/vouchers", config);
        setVouchers(data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchProfile();
    fetchVouchers();
  }, []);

  const toggleVouchers = () => {
    setIsOpen(!isOpen);
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProfilePictureFile(file);
    setProfilePictureUrl(URL.createObjectURL(file));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', username);
    formData.append('email', email);
    if (password) formData.append('password', password);
    if (profilePictureFile) formData.append('profilePicture', profilePictureFile);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.put("http://localhost:3000/api/users/profile", formData, config);

      // Update state with the data received from backend
      setUsername(data.name);
      setEmail(data.email);
      setProfilePictureUrl(data.profilePicture || ''); // Use the updated profile picture
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Profile update failed.");
    }
  };

  // Placeholder for voucher claiming function
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row items-center">
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-0 sm:mr-4 mb-4 sm:mb-0"
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
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center rounded-lg border border-blue-400 bg-[#CFF2F5] px-4 py-2">
              <img src={xp} alt="Xp" className="w-6 h-6 mr-2" />
              <p className="text-gray-700 text-sm sm:text-base">XP Points: {point}</p>
            </div>
            <div
              className="flex items-center rounded-lg border border-blue-400 bg-[#CFF2F5] px-4 py-2 cursor-pointer transition-transform"
              onClick={toggleVouchers}
            >
              <img src={voucher} alt="Voucher" className="w-6 h-6 mr-2" />
              <p className="text-gray-700 text-sm sm:text-base">Vouchers</p>
              {isOpen ? (
                <FaTimes className="ml-auto text-black hover:text-gray-700" />
              ) : (
                <FaChevronDown className="ml-auto text-black hover:text-gray-700" />
              )}
            </div>
          </div>

          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
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
                        Exp Date: {new Date(voucher.expirationDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Minimum Point: {voucher.pointsRequired}
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
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Badges!</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {userBadges.map((badge, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform"
              >
                <img src={badge.image} alt={badge.name} className="w-24 h-24 sm:w-32 sm:h-32 object-contain" />
                <p className="text-center mt-2 text-sm sm:text-base">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
        {isEditing && (
          <div className="my-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 gap-4">
                {/* Profile Picture Upload */}
                <div>
                  <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="mt-1 block w-full"
                  />
                  {/* Preview (Optional) */}
                  {profilePictureFile && (
                    <img
                      src={URL.createObjectURL(profilePictureFile)}
                      alt="Preview"
                      className="mt-2 w-20 h-20 rounded-full"
                    />
                  )}
                </div>
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
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
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
