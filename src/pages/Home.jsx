import { homepage_cover1, homepage_cover2, homepage_cover3 } from "../assets/images";
import { useEffect, useState } from 'react';
import { Carousel } from 'flowbite';

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(null);

  useEffect(() => {
    const carousel = new Carousel(document.getElementById('default-carousel'), {
      interval: 5000,
      indicators: {
        items: Array.from({ length: 3 }).map((_, i) => ({
          position: i,
          el: document.querySelector(`[data-carousel-slide-to="${i}"]`)
        })),
        activeClasses: ['bg-white', 'border-white'],
        inactiveClasses: ['bg-black/20', 'border-black/20', '!important']
      },
      onSlide: () => {
        const activeItem = document.querySelector('[data-carousel-item="active"]');
        const index = Array.from(activeItem.parentElement.children).indexOf(activeItem);
        requestAnimationFrame(() => {
          setActiveSlide(index);
        });
      }
    });

    // Initialize with null to ensure no default active state
    setTimeout(() => {
      const activeItem = document.querySelector('[data-carousel-item="active"]');
      const index = Array.from(activeItem.parentElement.children).indexOf(activeItem);
      setActiveSlide(index);
    }, 100);
    
    return () => carousel.destroy();
  }, []);
  
  return (
    <div className="relative overflow-hidden">
      <div id="default-carousel" className="relative w-full h-screen" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-full overflow-hidden w-full">
          {/* Item 1 */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img 
              src={homepage_cover1} 
              className="absolute block w-full h-full object-cover transition-opacity duration-700" 
              alt="carousel-1"
              loading="eager"
            />
          </div>
          {/* Item 2 */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img 
              src={homepage_cover2} 
              className="absolute block w-full h-full object-cover transition-opacity duration-700" 
              alt="carousel-2"
              loading="lazy"
            />
          </div>
          {/* Item 3 */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img 
              src={homepage_cover3} 
              className="absolute mt-8 block w-full h-full object-cover transition-opacity duration-700" 
              alt="carousel-3"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/30 backdrop-blur-[3px]">
          <div className="text-center max-w-4xl px-4">
            <p className="text-white text-xl tracking-wider mb-4 animate-fade-in">Our Summer Hot-takes!</p>
            <h2 className="text-[#D1E9FF] font-raleway text-6xl font-bold mb-2">WELCOME TO</h2>
            <h1 className="text-[#D1E9FF] font-motter-corpus-std text-8xl mb-6">LITBREW</h1>
            <p className="text-white font-raleway font-semibold text-xl max-w-2xl mx-auto mb-8">
              Discover boundless imagination in a library cafe designed for dreamers, thinkers, and creators.
            </p>
            <button className="bg-[#4BC1D2] font-raleway text-white font-bold px-10 py-4 rounded-full hover:bg-[#3AA1B2] hover:scale-105 transition-all duration-300 shadow-lg">
              Explore Now
            </button>
          </div>
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex space-x-4 -translate-x-1/2 bottom-10 left-1/2">
          {[0, 1, 2].map((index) => (
            <button 
              key={index}
              type="button" 
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300
                ${activeSlide === index ? 'bg-white border-white' : 'bg-black/20 border-black/20'}`}
              aria-current={activeSlide === index}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
            />
          ))}
        </div>

        {/* Carousel controls */}
        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-black/50 transition-all duration-300">
            <svg className="w-5 h-5 text-white/80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
          </span>
        </button>
        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-black/50 transition-all duration-300">
            <svg className="w-5 h-5 text-white/80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Home;