import { homepage_cover1, homepage_cover2, homepage_cover3 } from "../assets/images";
import { useEffect, useState } from 'react';
import { Carousel } from 'flowbite';
import { statistics } from "../constants";

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);

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
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      carousel.destroy();
      clearInterval(interval);
    };
  }, []);

  const slides = [
    { image: homepage_cover1, alt: "carousel-1", loading: "eager" },
    { image: homepage_cover2, alt: "carousel-2", loading: "lazy" },
    { image: homepage_cover3, alt: "carousel-3", loading: "lazy" }
  ];

  return (
    <>
      <div className="relative overflow-hidden">
        <div id="default-carousel" className="relative w-full h-screen" data-carousel="slide">
          {/* Carousel wrapper */}
          <div className="relative h-full overflow-hidden w-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`mt-8  absolute w-full h-full duration-700 ease-in-out transition-opacity ${
                  activeSlide === index ? 'opacity-100 z-20' : 'opacity-0 z-10'
                }`}
                data-carousel-item={activeSlide === index ? "active" : ""}
              >
                <img 
                  src={slide.image} 
                  className="absolute block w-full h-full object-cover" 
                  alt={slide.alt}
                  loading={slide.loading}
                />
              </div>
            ))}
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/30 backdrop-blur-[3px]">
            <div className="text-center max-w-4xl px-4">
              <p className="text-white text-xl tracking-wider mb-4 animate-fade-in">
                Our Summer Hot-takes!
              </p>
              <h2 className="text-[#D1E9FF] font-raleway text-6xl font-bold mb-2 animate-fade-in">
                WELCOME TO
              </h2>
              <h1 className="text-[#D1E9FF] font-motter-corpus-std text-8xl mb-6 animate-fade-in">
                LITBREW
              </h1>
              <p className="text-white font-raleway font-semibold text-xl max-w-2xl mx-auto mb-8 animate-fade-in">
                Discover boundless imagination in a library cafe designed for dreamers, thinkers, and creators.
              </p>
              <button className="bg-[#4BC1D2] font-raleway text-white font-bold px-10 py-4 rounded-full 
                hover:bg-[#3AA1B2] hover:scale-105 transition-all duration-300 shadow-lg animate-fade-in">
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
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>

          {/* Carousel controls */}
          <button 
            type="button" 
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
            data-carousel-prev
            onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-black/50 transition-all duration-300">
              <svg className="w-5 h-5 text-white/80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
            </span>
          </button>
          <button 
            type="button" 
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
            data-carousel-next
            onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-black/50 transition-all duration-300">
              <svg className="w-5 h-5 text-white/80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
            </span>
          </button>
        </div>
      </div>

            {/* Statistic */}
      <div className=" p-36 w-full flex flex-col justify-center items-center flex-wrap gap-6 mx-auto h-[640px] bg-gradient-to-b from-[#4BC1D2] to-white">
        <h2>About</h2>
        <h1>Litbrew</h1>
        <p className="text-center">Born out of a passion for both literature and exceptional coffee, Litbrew opened its doors in 2024 with a simple yet bold vision: to create a space that invites people to read, relax, and recharge.</p>
        <div className="flex justify-center items-center flex-wrap w-full mt-10 gap-16">
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="leading-7 font-montserrat text-slate-gray">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
    
    
  );
};

export default Home;