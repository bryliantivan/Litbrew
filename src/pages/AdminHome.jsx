import { useState, useEffect } from 'react';

const AdminHome = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [error, setError] = useState(null);

    return (
        <div className="mt-[10vw] mx-[5vw] mb-[3vw]">
            <div className="mb-[3.5vw]"> 
              <h1 className="font-raleway font-bold text-[2vw]">In the last 7 days</h1>
              {error ? (
                  <p>Error: {error}</p>
              ) : (
                  <p>Total Income:${totalIncome}</p>
              )}
            </div>
            
            <div className="justify-center">
              <h2 className="font-raleway font-bold text-[2vw]">Content & Orders Management</h2> {/* Added a heading for the section */}
              <div className="flex justify-center mt-[0.5vw]">
                  <div style={{ border: '1px solid lightblue', padding: '20px', borderRadius: '5px', width: '30%' }}>  {/* Added some styling */}
                    <h3 className="font-raleway font-bold text-[1.3vw] text-[#07779D]">MANAGE MENU</h3>
                    <p className="font-raleway">Add, Edit, or Remove Menu Items</p>
                    <button>GO!</button> {/* Made the button functional, though it doesn't do anything yet */}
                  </div>
      
                  <div style={{ border: '1px solid lightblue', padding: '20px', borderRadius: '5px', width: '30%' }}> {/* Added some styling */}
                    <h3 className="font-raleway font-bold text-[1.3vw] text-[#07779D]">MANAGE BOOK</h3>
                    <p className="font-raleway">Add, Edit, or Remove Books</p>
                    <button>GO!</button> {/* Made the button functional, though it doesn't do anything yet */}
                  </div>
      
                  <div style={{ border: '1px solid lightblue', padding: '20px', borderRadius: '5px', width: '30%' }}> {/* Added some styling */}
                    <h3 className="font-raleway font-bold text-[1.3vw] text-[#07779D]">MANAGE ORDERS</h3>
                    <p className="font-raleway">Order tracking, review & rating management</p>
                    <button>GO!</button> {/* Made the button functional, though it doesn't do anything yet */}
                  </div>
              </div>
          </div>
        </div>
    );
};

export default AdminHome;