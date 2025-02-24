import React, { useRef, useState, useEffect } from 'react';
import { homepage_galery1, homepage_galery2, homepage_galery3, homepage_galery4, homepage_galery5,homepage_book, homepage_cover1, homepage_cover2, homepage_cover3, homepage_dessert1, homepage_dessert2, homepage_dessert3 } from "../assets/images";
import { homepage_books, homepage_drinks } from "../constants";
import { Carousel } from 'flowbite';
import { statistics, statistics2 } from "../constants";
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(1);
  const galleryImages = [
    homepage_galery1,
    homepage_galery2,
    homepage_galery3,
    homepage_galery4,
    homepage_galery5,
  ];
  useEffect(() => {
    const carouselElement = document.getElementById('default-carousel');
    const carousel = new Carousel(carouselElement, {
      interval: 5000,
      indicators: {
        items: Array.from({ length: 3 }).map((_, i) => ({
          position: i,
          el: document.querySelector(`[data-carousel-slide-to="${i}"]`)
        })),
        activeClasses: ['bg-white', 'border-white'],
        inactiveClasses: ['bg-black/20', 'border-black/20']
      },
      loop: true,
      onSlide: () => {
        const activeItem = carouselElement.querySelector('[data-carousel-item="active"]');
        if (activeItem) {
          const index = Array.from(activeItem.parentElement.children).indexOf(activeItem);
          setActiveSlide(index);
        }
      }
    });

    // Auto slide interval
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % welcome_slides.length);
    }, 3000);

    return () => {
      carousel.destroy();
      clearInterval(interval);
    };
  }, []);

  const welcome_slides = [
    { image: homepage_cover1, alt: "carousel-1", loading: "eager" },
    { image: homepage_cover2, alt: "carousel-2", loading: "lazy" },
    { image: homepage_cover3, alt: "carousel-3", loading: "lazy" }
  ];

  const dessert_slides = [
    {
      content: (
        <div className="flex flex-col items-end justify-center h-full text-center text-white bg-cover bg-center bg-no-repeat font" style={{ backgroundImage: `url(${homepage_dessert1})` }}>
          <div className='mr-20'>
            <h2 className="text-5xl text-center font-motter-corpus-std">FIND YOUR DESSERT</h2>
            <p className="mt-6 text-xl text-center font-raleway">Indulge in our freshly brewed coffee and now,<br/>a delightful selection of desserts. </p>
            <button onClick={() => navigate('/menu')} className="bg-[#4BC1D2] font-raleway text-white font-bold mt-8 px-10 py-4 rounded-full 
              hover:bg-blue-800 hover:scale-105 transition-all duration-300 shadow-lg animate-fade-in">
              ORDER NOW!
            </button>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-col items-center h-full text-center text-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${homepage_dessert2})` }}>
          <h2 className="text-7xl mt-48 text-center font-motter-corpus-std text-[#4BC1D2]">NEW MENU</h2>
          <p className="text-5xl self-end text-center font-raleway font-extrabold mr-44 mt-[8.5rem]">Chocolate Cake<br/>ONLY 20k!<br/>GRAB IT FAST</p>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-col items-end justify-center h-full text-center bg-cover bg-center bg-no-repeat font" style={{ backgroundImage: `url(${homepage_dessert3})` }}>
          <div className='mr-32'>
            <h2 className="text-8xl text-right font-raleway font-extrabold text-[#583123]">ICE<br/>CREAM</h2>
            <p className="mt-6 text-3xl font-extrabold text-right font-raleway text-[#583123]">Only on site</p>
            <button onClick={() => navigate('/menu')} className="bg-[#583123] font-raleway text-white font-bold mt-8 px-10 py-4 rounded-full 
              hover:bg-blue-800 hover:scale-105 transition-all duration-300 shadow-2xl animate-fade-in">
              LITBREW NEW PICK
            </button>
          </div>
        </div>
      ),
    },
  ];
  // Untuk Carrousel kedua Buddy Choice
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % homepage_drinks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + homepage_drinks.length) % homepage_drinks.length);
  };

  const handleNext2 = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const handlePrev2 = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const sectionRefs = useRef([]);
  const scrollToSection = (index) => {
    const targetPosition = sectionRefs.current[index].offsetTop; // Posisi tujuan
    const startPosition = window.scrollY; // Posisi awal
    const distance = targetPosition - startPosition; // Jarak scroll
    const duration = 1000; // Durasi animasi (ms)
    let start = null;

    const scrollAnimation = (timestamp) => {
      if (!start) start = timestamp; // Waktu mulai
      const progress = timestamp - start;
      const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // Fungsi easing
      const scrollValue = easeInOutCubic(progress / duration) * distance + startPosition;

      window.scrollTo(0, scrollValue); // Scroll ke posisi baru
      if (progress < duration) requestAnimationFrame(scrollAnimation); // Lanjutkan animasi
    };

    requestAnimationFrame(scrollAnimation); // Mulai animasi
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <div id="default-carousel" className="relative w-full h-screen" data-carousel="slide">
          {/* Carousel wrapper */}
          <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
            {welcome_slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 duration-700 ease-in-out transition-opacity ${
                  activeSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
                data-carousel-item={activeSlide === index ? "active" : ""}
              >
                <img 
                  src={slide.image} 
                  className="w-full h-full object-cover" 
                  alt={slide.alt}
                  loading={slide.loading}
                />
              </div>
            ))}
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-[#4BC1D2]/30 backdrop-blur-[50px]">
            <div className="text-center max-w-4xl px-4">
              <p className="text-white text-xl tracking-wider mb-4 animate-fade-in">
                Our Summer Hot-takes!
              </p>
              <h2 className="text-[#D1E9FF] font-raleway text-4xl sm:text-5xl md:text-6xl font-bold mb-2 animate-fade-in">
                WELCOME TO
              </h2>
              <h1 className="text-[#D1E9FF] font-motter-corpus-std text-6xl sm:text-7xl md:text-8xl mb-6 animate-fade-in">
                LITBREW
              </h1>
              <p className="text-white font-raleway font-semibold text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in">
                Discover boundless imagination in a library cafe designed for dreamers, thinkers, and creators.
              </p>
              <button onClick={() => scrollToSection(0)} className="bg-[#4BC1D2] font-raleway text-white font-bold px-10 py-4 rounded-full 
                hover:bg-[#3AA1B2] hover:scale-105 transition-all duration-300 shadow-lg animate-fade-in">
                Explore Now
              </button>
            </div>
          </div>

          {/* Slider indicators */}
          <div className="absolute z-30 flex space-x-2 -translate-x-1/2 bottom-5 sm:bottom-8 md:bottom-10 left-1/2">
            {[0, 1, 2].map((index) => (
              <button 
                key={index}
                type="button" 
                className={`transition-all duration-300 ${
                  activeSlide === index 
                    ? 'bg-[#3D5AF1] w-8 sm:w-10 h-2 rounded-full' 
                    : 'bg-white w-2 h-2 rounded-full'
                }`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Statistic */}
      <div ref={(el) => (sectionRefs.current[0] = el)} className="py-16 sm:py-24 lg:py-32 w-full flex flex-col justify-center items-center flex-wrap gap-5 mx-auto bg-gradient-to-b from-[#4BC1D2] to-[#fef9f6]">
        <h2 className="font-raleway font-black text-3xl sm:text-4xl md:text-5xl">About</h2>
        <h1 className="text-[#000000] font-motter-corpus-std text-4xl sm:text-5xl md:text-6xl font-bold mb-2 animate-fade-in">Litbrew</h1>
        <p className="text-center font-raleway text-base sm:text-lg md:text-xl w-full sm:w-3/4 px-4 font-semibold">
          Born out of a passion for both literature and exceptional coffee, Litbrew opened its doors in 2024 with a simple yet bold vision: to create a space that invites people to read, relax, and recharge.
        </p>
        <div className="flex justify-center items-center flex-wrap w-full mt-6 sm:mt-8 md:mt-10 gap-8 sm:gap-12 md:gap-16">
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="leading-7 font-raleway font-semibold text-slate-gray text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8 md:mt-8 w-full max-w-lg mx-auto px-4 sm:px-6"> {/* Add horizontal padding here */}
          <div className="flex items-center space-x-4 bg-gradient-to-r from-[#4BC1D2] to-[#4e555d] rounded-full shadow-lg w-full">
            <button
              onClick={() => scrollToSection(1)}
              className="h-full w-1/2 font-raleway text-white font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-l-full bg-transparent hover:bg-[#3AA1B2] hover:scale-105 transition-all duration-300"
            >
              More
            </button>
            <div className="w-px h-6 sm:h-8 bg-white"></div> {/* Vertical line */}
            <button
              onClick={() => navigate('/about')}
              className="h-full w-1/2 font-raleway text-white font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-r-full bg-transparent hover:bg-[#3AA1B2] hover:scale-105 transition-all duration-300"
            >
              About Us
            </button>
          </div>
        </div>
      </div>

      {/* Buddy Choice */}
      <div ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="bg-[#fef9f6] w-full flex flex-col items-center py-12">
          {/* Header */}
          <h1 className="mt-16 text-4xl font-raleway md:text-5xl font-bold text-[#4a403a]">Litbrew's Buddy Choice</h1>

          {/* Update the transform calculation for the Buddy Choice carousel */}
          <div className="relative w-full overflow-hidden">
            <div className="h-full mt-20 mb-24 flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex === 0 ? 0 : (currentIndex - 1) * 33.33}%)` }}>
              {homepage_drinks.map((drink, index) => (
                <div key={index} className={`relative w-1/3 flex-shrink-0 flex flex-col items-center transition-transform duration-500 ease-in-out ${currentIndex === index ? 'scale-105' : 'scale-75'}`}>
                  {currentIndex === index && (
                    <div className="absolute bottom-24 transform translate-y-1/3 w-48 h-16 bg-[#CFF2F5] rounded-[50%] z-0"></div>
                  )}
                  <img
                    src={drink.imgUrl}
                    alt={drink.name}
                    className="relative z-10 w-48 h-64 md:w-64 md:h-80 object-fill mx-2"
                  />
                  <p className="text-xl font-semibold text-[#4a403a] mt-4">{drink.name}</p>
                  <p className="text-lg text-[#6b6b6b]">{drink.price}</p>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#EDEDED] text-black px-2 md:px-3 py-4 md:py-6 rounded-full hover:bg-[#2C4ACB] hover:text-white focus:outline-none"
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#EDEDED] text-black px-2 md:px-3 py-4 md:py-6 rounded-full hover:bg-[#2C4ACB] hover:text-white focus:outline-none"
            >
              ❯
            </button>
          </div>

          {/* Update the Dots Indicator for the Buddy Choice carousel */}
          <div className="flex justify-center space-x-2">
            {homepage_drinks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-[#3D5AF1] w-10" : "bg-gray-300 w-3"}`}
              ></button>
            ))}
          </div>

          <div className="flex justify-center mt-10 w-full max-w-lg mx-auto px-4 sm:px-6"> {/* Added padding here */}
            <div className="flex items-center space-x-4 bg-gradient-to-r from-[#4BC1D2] to-[#7997b9] rounded-full shadow-lg w-full">
              <button
                onClick={() => scrollToSection(2)}
                className="h-full w-1/2 font-raleway text-white font-bold px-6 py-3 rounded-l-full bg-transparent hover:bg-[#3AA1B2] hover:scale-105 transition-all duration-300"
              >
                More
              </button>
              <div className="w-px h-8 bg-white"></div> {/* Vertical line */}
              <button
                onClick={() => navigate('/menu')}
                className="h-full w-1/2 font-raleway text-white font-bold px-6 py-3 rounded-r-full bg-transparent hover:bg-[#3AA1B2] hover:scale-105 transition-all duration-300"
              >
                Menu
              </button>
            </div>
          </div>
        </div>

        {/* Find Your Dessert Carousel */}
        <div ref={(el) => (sectionRefs.current[2] = el)} id="default-carousel" className="relative w-full h-screen" data-carousel="slide">
          <div className="relative h-full overflow-hidden w-full">
            {dessert_slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute w-full h-full duration-700 ease-in-out transition-opacity ${
                  activeSlide === index ? 'opacity-100 z-20' : 'opacity-0 z-10'
                }`}
                data-carousel-item={activeSlide === index ? "active" : ""}
              >
                {slide.content}
              </div>
            ))}
          </div>

          {/* Slider indicators */}
          <div className="absolute z-30 flex space-x-2 -translate-x-1/2 bottom-5 sm:bottom-8 md:bottom-10 left-1/2">
            {[0, 1, 2].map((index) => (
              <button 
                key={index}
                type="button" 
                className={`transition-all duration-300 ${
                  activeSlide === index 
                    ? 'bg-[#3D5AF1] w-8 sm:w-10 h-2 rounded-full' 
                    : 'bg-white w-2 h-2 rounded-full'
                }`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>

          {/* Carousel controls */}
          <button 
            type="button" 
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
            data-carousel-prev
            onClick={() => setActiveSlide((prev) => (prev - 1 + dessert_slides.length) % dessert_slides.length)}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-black/50 transition-all duration-300">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
            </span>
          </button>
          <button 
            type="button" 
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
            data-carousel-next
            onClick={() => setActiveSlide((prev) => (prev + 1) % dessert_slides.length)}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-black/50 transition-all duration-300">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
            </span>
          </button>
        </div>
      </div>


      <div className="py-16 sm:py-24 lg:py-32 w-full flex flex-col justify-center items-center gap-5 sm:gap-6 md:gap-8 mx-auto bg-gradient-to-b from-[#4BC1D2] to-[#fef9f6]">
        <h1 className='text-2xl sm:text-3xl md:text-4xl text-center font-motter-corpus-std text-[#07779D]'>The Book Lover's Dreamland Awaits!</h1>
        <h4 className='text-base sm:text-lg md:text-xl mt-4 sm:mt-6 md:mt-8 font-medium font-raleway text-[#06779D] text-center px-4 sm:px-8 md:px-16'>Welcome to the ultimate book lover's paradise! Join our community and contribute to the ever-evolving library of stories, where every book has a chance to inspire someone new.</h4>
      </div>

      {/* Favourite Reads */}
      <div className="bg-[#fef9f6] flex w-full flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 flex justify-center">
          <img
            src={homepage_book}
            alt="homepage_book"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="relative flex bg-[#06779D] 
        flex-col justify-center items-start w-full sm:w-1/2 p-8 sm:p-12 md:p-16 lg:pl-28 lg:pr-12">
          <h1 className="font-motter-corpus-std text-white 
            text-2xl sm:text-3xl lg:text-4xl font-bold">
            Your Favourite <span className='text-[#D1E9FF]'>Reads<br/>Are Here!</span>
          </h1>
          <p className="font-raleway text-white text-base sm:text-lg md:text-xl leading-relaxed mt-4 sm:mt-8 md:mt-10 mb-4 sm:mb-6 md:mb-8">
          Buy your favorite books online with ease! Enjoy exclusive offers and discounts on selected titles. Dive into our collection and find special deals that make reading more affordable. Shop now and unlock more savings with every purchase!
          </p>

          <div className="flex text-white text-sm sm:text-base justify-start items-start flex-wrap w-full gap-4 sm:gap-8 md:gap-12 lg:gap-16">
            {statistics2.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl md:text-4xl font-raleway font-bold">{stat.value}</p>
                <p className="leading-7 font-raleway text-slate-gray text-xs sm:text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>

          <button onClick={() => navigate('/book')} className="bg-[#4BC1D2] font-raleway text-white font-bold mt-4 sm:mt-8 md:mt-12 lg:mt-16 py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-full 
            hover:bg-blue-800 hover:scale-105 transition-all duration-300 shadow-lg animate-fade-in w-auto text-center text-sm sm:text-base">
            ORDER NOW!
          </button>
        </div>
      </div>

      {/* Best Pick */}
      <div className='py-12 sm:py-16 md:py-20 lg:py-24 bg-[#fef9f6]'>
        <h1 className='font-motter-corpus-std text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#06779D] mb-4 sm:mb-6 md:mb-8 lg:mb-10'>BEST PICKS THIS WEEKEND!</h1>
        <div className='flex items-center justify-center w-full flex-wrap gap-4 sm:gap-6 md:gap-8'>
          {homepage_books.map((book, index) => (
            <div key={index} className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4">
              <img
                src={book.imgUrl}
                alt={book.title}
                className="w-full sm:w-48 md:w-56 lg:w-64 h-auto object-cover mb-2 sm:mb-4"
              />
              <h1 className="text-lg sm:text-xl md:text-2xl font-raleway font-bold text-[#4BC1D2] text-center">{book.title}</h1>
              <p className="text-base sm:text-lg font-raleway font-semibold text-center">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Gallery */}
      <div className="bg-[#fef9f6] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Container for responsiveness */}
        <h1 className="text-4xl sm:text-5xl font-raleway font-bold text-[#4a403a] text-center mb-8 sm:mb-12">
          Litbrew's Gallery
        </h1>

        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden"> {/* Responsive height */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(currentIndex) * 33.33}%)`, width: `${galleryImages.length * 100}%`}} //Corrected width
            >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative w-1/3 flex-shrink-0 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${
                  currentIndex === index ? 'scale-110 sm:scale-125 z-20' : 'scale-90 sm:scale-95 z-10'
                }`}
              >
                 {/* Gradient Overlay (removed absolute positioning) */}
                {currentIndex === index && (
                    <div className="w-full h-full bg-gradient-to-t from-black/50 to-transparent rounded-[1rem] absolute"></div>
                )}

                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-[1rem]" // Use object-cover and responsive height
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev2}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200/50 text-gray-700 hover:bg-blue-500 hover:text-white p-2 rounded-full transition-colors duration-200 focus:outline-none"
          >
            <FaChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" /> {/* Use icon */}
          </button>
          <button
            onClick={handleNext2}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200/50 text-gray-700 hover:bg-blue-500 hover:text-white p-2 rounded-full transition-colors duration-200 focus:outline-none"
          >
            <FaChevronRight className="w-4 h-4 sm:w-6 sm:h-6" /> {/* Use icon */}
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-[#3D5AF1] sm:w-8 sm:h-3' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
      
    </>
  );
};
export default Home;