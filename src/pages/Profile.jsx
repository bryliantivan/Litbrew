import React from 'react';
import { useState } from 'react'; // Import hook useState
import { FaTimes, FaChevronDown } from 'react-icons/fa'; // Import icon dari react-icons
import { cup_profile, Badge_01, Badge_02, Badge_03, Badge_04, Badge_05, Badge_06, Badge_07, xp, voucher } from '../assets/images';
import cecep_ganteng from '../assets/images/cecep_ganteng.png';

const Profile = () => {
  // Data badges (biasanya dari API atau state)
  const badges = [
    { name: 'Litbrew Einstein', image: Badge_01 }, 
    { name: 'Tough Sipper', image: Badge_02 },
    { name: 'Cookie Runner', image: Badge_03 },
    { name: 'Adventurer', image: Badge_04 },
    { name: 'Innovator King', image: Badge_05 },
    { name: 'Level Grinder', image: Badge_06 },
    { name: 'Mighty Genius', image: Badge_07 }
  ];

  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol dropdown

  // Data voucher (contoh, ganti dengan data asli)
  const vouchers = [
    {
      discount: '50% off sips&dips up to 15k',
      minSpend: 'Min. spend 120k',
      claim: 'Claim with 500 XP!',
    },
    {
      discount: '60% off read&relax up to 20k',
      minSpend: 'Min. spend 150k',
      claim: 'Claim with 500 XP!',
    },
    {
      discount: '60% off read&relax up to 20k',
      minSpend: 'Min. spend 150k',
      claim: 'Claim with 500 XP!',
    },
    {
      discount: '60% off read&relax up to 20k',
      minSpend: 'Min. spend 150k',
      claim: 'Claim with 500 XP!',
    },
    {
        discount: '60% off test up to 20k',
        minSpend: 'Min. spend 150k',
        claim: 'Claim with 500 XP!',
      },
  ];

  const toggleVouchers = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="font-raleway antialiased mt-[10vw]">

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Bagian Atas: Informasi Pengguna */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <img
              src={cecep_ganteng} // Ganti dengan URL gambar profil
              alt="Profile"
              className="w-[5vw] h-[5vw] rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold">Defin Shelby</h2>
              <p className="text-gray-500">wituwibu@gmail.com</p>
            </div>
            <button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
          </div>

          {/* Level dan XP */}
          <div className='mx-auto flex gap-8 items-center justify-center w-[60%]  mt-6 bg-[#334147] rounded-lg p-4 text-white relative'>
          <img src={cup_profile} alt="Trophy" className="w-[10vw] h-[12vw] absolute transform translate-x-[-20vw] scale-125" />
            <div>
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-[2vw]">Your Level is XX! Surpassing</p>
                    <p className="text-[1vw]">XX.x% People Around the World!</p>
                </div>
                </div>

                <div className="mt-2">
                <p>Level XX</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>

                <p className="text-sm mt-1">XP Points: X.XXX</p>
                </div>
            </div>
            </div>

          {/* Vouchers */}
        <div className="mt-4 font-bold"></div>
          <div className="my-auto font-bold flex pl-[1vw] items-center rounded-xl h-[2.5vw] border border-blue-400 bg-[#CFF2F5] w-[13vw]">
            <img src={xp} alt="Xp" className="w-6 h-6 inline-block mr-2" />
            <p className="text-gray-700 text-[1vw]">XP Points : XXXX</p>
          </div>

          <div className="mt-4">
            <div
                className="font-bold hover:scale-105 transition-transform cursor-pointer my-auto flex pl-[1vw] items-center rounded-xl h-[2.5vw] border border-blue-400 bg-[#CFF2F5] w-[13vw]"
                onClick={toggleVouchers}
            >
                <img
                src={voucher} // Ganti dengan URL ikon voucher
                alt="Voucher"
                className="w-6 h-6 inline-block mr-2"
                />
                <p className="text-gray-700 text-[1vw]">Vouchers</p>
                {/* Tombol Close (X) */}
                {isOpen ? (
                <button onClick={toggleVouchers} className="mx-auto">
                    <FaTimes className="text-black hover:text-gray-700" />
                </button>
                ) : (
                <FaChevronDown className="ml-[1.5vw] opacity-50 text-black hover:text-gray-700" />
                )}

            </div>

            {/* Daftar Voucher (Dropdown) */}
            {isOpen && (
                <div className="relative">
                {/* Overlay Gelap (Opsional) */}
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
                        <p className="text-gray-800 font-semibold">{voucher.discount}</p>
                        <p className="text-gray-600 text-sm">{voucher.minSpend}</p>
                        <div className="flex justify-between items-center mt-1">

                            <p className="text-gray-600 text-sm">{voucher.claim}</p>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm">
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
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Badges!</h2>
          <div className="flex flex-wrap justify-center items-center gap-16 w-[80vw] mx-auto">
            {badges.map((badge, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-2 h-[18vw] w-[15vw] flex flex-col items-center justify-center hover:scale-105 transition-transform">
                <img src={badge.image} alt={badge.name} className="w-full mb-2" />
              </div>
            ))}
          </div>
        </div>


        {/* Formulir Edit Profil */}
        <div className="my-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="firstName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Your First Name" />
              </div>
              <div>
                <label htmlFor="nickName" className="block text-sm font-medium text-gray-700">Nick Name</label>
                <input type="text" id="nickName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Your Nick Name" />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select id="gender" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <option value="" disabled selected>Your Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <select id="country" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <option value="" disabled selected>Your Country</option>
                  {/* Tambahkan opsi negara */}
                </select>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                <select id="language" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <option value="" disabled selected>Your Language</option>
                  {/* Tambahkan opsi bahasa */}
                </select>
              </div>
              <div>
                <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700">Time Zone</label>
                <select id="timeZone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <option value="" disabled selected>Your Time Zone</option>
                  {/* Tambahkan opsi zona waktu */}
                </select>
              </div>
            </div>
             {/* Tombol Save, diletakkan di luar grid */}
             <div className="mt-6">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Save Changes
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;