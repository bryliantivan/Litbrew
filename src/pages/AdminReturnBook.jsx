import React, { useState, useEffect } from 'react';

const AdminReturnBook = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([
    {
      _id: 'ORDER123',
      customerName: 'John Doe',
      bookTitle: 'The Hitchhiker\'s Guide to the Galaxy',
      bookStatus: 'borrowed',
    },
    {
      _id: 'ORDER456',
      customerName: 'Jane Smith',
      bookTitle: 'Pride and Prejudice',
      bookStatus: 'returned',
    },
    {
      _id: 'ORDER789',
      customerName: 'Alice Johnson',
      bookTitle: '1984',
      bookStatus: 'borrowed',
    },
    {
        _id: 'ORDER101',
        customerName: 'Bob Williams',
        bookTitle: 'To Kill a Mockingbird',
        bookStatus: 'returned',
      },
      {
        _id: 'ORDER112',
        customerName: 'Eva Brown',
        bookTitle: 'The Great Gatsby',
        bookStatus: 'borrowed',
      },
  ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBookStatusChange = (orderId, value) => {
    setBooks(
      books.map((book) =>
        book._id === orderId ? { ...book, bookStatus: value } : book
      )
    );
  };

  const handleSaveChanges = () => {
    alert('Changes saved successfully! (Dummy Function)');
    console.log(books); // Log the updated books to console (for demonstration)
  };

  const filteredBooks = books.filter(
    (book) =>
      (book._id && book._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.customerName &&
        book.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.bookTitle &&
        book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto mt-[8vw] p-7">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 mt-7">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold font-raleway">RETURN BOOKS</h1>
          <button
            className="bg-[#334147] hover:bg-[#07779D] text-white font-raleway font-medium py-2 px-4 rounded-md ml-4"
            onClick={handleSaveChanges}
          >
            SAVE CHANGES
          </button>
        </div>

        <div className="relative ml-0 md:ml-4 w-full md:w-[300px]">
          <input
            type="text"
            placeholder="Search Book"
            className="border border-[#07779D] px-4 py-2 rounded-md focus:outline-none w-full pr-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="absolute mt-[0.8%] right-2 bg-[#07779D] text-white font-medium font-raleway p-2 rounded-full">
            <svg
              className="w-5 h-5"
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

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse mt-[2vw]">
          <thead>
            <tr className="bg-[#AAE8ED]">
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[20%]">
                ORDER ID
              </th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[20%]">
                USER
              </th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[40%]">
                BOOK'S TITLE
              </th>
              <th className="px-[0.5vw] py-[1vw] border font-bold font-raleway text-black text-center w-[20%]">
                BOOK STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
              >
                <td className="px-[0.5vw] py-[1vw] border text-center">
                  {book._id}
                </td>
                <td className="px-[0.5vw] py-[1vw] border text-center">
                  {book.customerName}
                </td>
                <td className="px-[0.5vw] py-[1vw] border text-center">
                  {book.bookTitle}
                </td>
                <td className="px-[0.5vw] py-[1vw] border text-center">
                  <select
                    value={book.bookStatus}
                    onChange={(e) =>
                      handleBookStatusChange(book._id, e.target.value)
                    }
                    className={`border rounded p-1 ${
                      book.bookStatus === 'borrowed'
                        ? 'bg-yellow-200'
                        : 'bg-green-200'
                    }`}
                  >
                    <option value="borrowed">Borrowed</option>
                    <option value="returned">Returned</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReturnBook;