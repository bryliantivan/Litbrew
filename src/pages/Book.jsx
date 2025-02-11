import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const Book = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All"); // State for category filter
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [cart, setCart] = useState([]); // State for managing the cart
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for user login status
  const [addedProducts, setAddedProducts] = useState([]); // State for tracking added products

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    axios.get("http://localhost:3000/api/products")
      .then((response) => {
        console.log("Data API:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    // Load cart from local storage
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
      setAddedProducts(savedCart.map(item => item._id)); // Set added products from saved cart
    }
  }, []);

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) =>
    product.category === "Book" &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Search Filter
  );

  // Function to handle adding products to the cart
  const addToCart = (product) => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      return;
    }
    const existingProduct = cart.find(item => item._id === product._id);
    let newCart;
    if (existingProduct) {
      newCart = cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart)); // Simpan keranjang di local storage
    setAddedProducts([...addedProducts, product._id]); // Add product to added products
    console.log("Cart:", newCart);
  };

  return (
    <div className="container px-5 py-36 mx-auto">
      <div className="inset-0 flex items-center justify-center z-30">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-[#03151E] font-motter-corpus-std text-8xl mb-6 animate-fade-in">
            SIPS & DIPS
          </h1>
          <p className="text-white font-raleway font-semibold text-xl max-w-2xl mx-auto mb-8 animate-fade-in">
            <h3 className="text-black font-raleway text-2xl mb-2 animate-fade-in">
              Made by LitBrew’s Buddies for you
            </h3>
          </p>
        </div>
      </div>
      <form className="max-w-md mx-auto">
        <div className="relative flex items-center">
          {/* Input Field */}
          <input
            type="search"
            id="default-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 ps-5 text-sm text-gray-600 border border-blue-400 rounded-full bg-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Search Menu"
          />

          {/* Search Button with Icon */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-start gap-2 mb-6">
        <Button className={`px-4 py-2 ${category === "All" ? "bg-blue-500 text-white" : "bg-[#4BC1D2] text-white hover:bg-blue-700"}`}
          size="l" onClick={() => setCategory("All")}>
          All
        </Button>
        <Button className={`px-4 py-2 ${category === "Food" ? "bg-blue-500 text-white" : "bg-[#4BC1D2] text-white hover:bg-blue-700"}`}
          size="l" onClick={() => setCategory("Food")}>
          Food
        </Button>
        <Button className={`px-4 py-2 ${category === "Drink" ? "bg-blue-500 text-white" : "bg-[#4BC1D2] text-white hover:bg-blue-700"}`}
          size="l" onClick={() => setCategory("Drink")}>
          Drink
        </Button>
      </div>

      {/* Grid Produk */}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} addToCart={addToCart} added={addedProducts.includes(product._id)} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No {category !== "All" ? category.toLowerCase() : ""} products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Komponen untuk menampilkan tiap produk
const ProductCard = ({ product, addToCart, added }) => {
  return (
    <div className="group flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-[#03151E] transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg">
      <Link to={`/book/${product._id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img className="absolute top-0 right-0 h-full w-full object-cover bg-[#D1E9FF]" src={product.image} alt={product.name} />
      </Link>
      <div className="mt-4 px-5 pb-1">
        <Link to={`/book/${product._id}`}>
          <h4 className="text-xl tracking-tight text-white pb-3">{product.name}</h4>
        </Link>
        <p className="text-xs text-white sm:text-l pb-4">
          {product?.description}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p><span className="text-xl font-bold text-[#4BC1D2] font-raleway">IDR. {product.price}</span></p>
          </div>
          <button type="button" className={`text-white ${added ? "bg-green-500" : "bg-[#4BC1D2]"} hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs px-2 py-1 text-center me-4 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} onClick={() => addToCart(product)}>
            {added ? "Added" : "BUY"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;