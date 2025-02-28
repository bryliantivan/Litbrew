import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaChevronDown } from 'react-icons/fa';
import { cup_profile, Badge_01, Badge_02, Badge_03, Badge_04, Badge_05, Badge_06, Badge_07, xp, voucher } from '../assets/images';
import cecep_ganteng from '../assets/images/cecep_ganteng.png'; // Placeholder image


const Profile = () => {
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

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [point, setPoint] = useState(0);
  const [level, setLevel] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);
  const [profilePictureUrl, setProfilePictureUrl] = useState(''); // URL to profile picture
  const [profilePictureFile, setProfilePictureFile] = useState(null); // File object for upload


    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get("http://localhost:3000/api/users/profile", config);
        setUsername(data.name || '');
        setEmail(data.email || '');
        setPoint(data.points || 0);
        setLevel(data.level || 0);
        // Set profile picture URL.  Handle cases where it might be null/undefined.
        setProfilePictureUrl(data.profilePicture || cecep_ganteng); // Use placeholder if no picture
        const nextLevelThreshold = 1000;
        setLevelProgress((data.points % nextLevelThreshold) / nextLevelThreshold * 100);

      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

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



    const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return; // No file selected

    setProfilePictureFile(file); // Store the file object

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // VERY IMPORTANT for file uploads
        }
      };

      const { data } = await axios.post("http://localhost:3000/api/users/upload-profile-picture", formData, config);
      setProfilePictureUrl(data.profilePictureUrl); // Update the URL
      alert("Profile picture uploaded successfully!");

    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Profile picture upload failed.");
    }
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
      const profileData = { name: username, email, password }; // Removed profilePicture

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
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      const { data } = await axios.post(
        `http://localhost:3000/api/vouchers/redeem`,
        { userId, voucherId },
        config
      );
      alert(`${data.message} - ${data.voucher.name}`);
      setVouchers(vouchers.filter(voucher => voucher._id !== voucherId));
    } catch (error) {
      console.error("Error claiming voucher:", error);
      alert(error.response?.data?.message || "Failed to claim voucher.");
    }
  };

  return (
    <div className="font-raleway antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row items-center">
            <img
                src={`http://localhost:3000${profilePictureUrl}`}
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

          <div className='mt-6 bg-[#334147] rounded-lg p-4 text-white relative overflow-hidden'>
            <img src={cup_profile} alt="Trophy" className="absolute -left-16 -top-8 w-24 h-auto sm:w-32 sm:-top-10 sm:-left-20"  style={{transform: 'scale(1.2)'}}/>
            <div className="sm:ml-32">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base sm:text-lg">Your Level is {level}! Surpassing</p>
                  <p className="text-sm sm:text-base">90.1% People Around the World!</p>
                </div>
              </div>
              <div className="mt-2">
                <p>Level {level}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${levelProgress}%` }}></div>
                </div>
                <p className="text-sm mt-1">XP Points: {point}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center rounded-lg border border-blue-400 bg-[#CFF2F5] px-4 py-2">
              <img src={xp} alt="Xp" className="w-6 h-6 mr-2" />
              <p className="text-gray-700 text-sm sm:text-base">XP Points: {point}</p>
            </div>
            <div className="flex items-center rounded-lg border border-blue-400 bg-[#CFF2F5] px-4 py-2 cursor-pointer transition-transform" onClick={toggleVouchers}>
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
                        Exp Date: {new Date(voucher.expDate).toLocaleDateString()}
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

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Badges!</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {badges.map((badge, index) => (
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
                  accept="image/*" // Accepts only image files
                  onChange={handleProfilePictureUpload}
                  className="mt-1 block w-full"
                />
                {/* Preview (Optional) */}
                {profilePictureFile && (
                  <img
                    src={URL.createObjectURL(profilePictureFile)}  //Temporary preview URL
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