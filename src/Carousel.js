import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = () => {
  const slides = Array.from({ length: 8 }, (_, i) => `/carousel/${i + 1}.png`);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 flex flex-col items-center select-none">
      <div className="relative w-full flex items-center justify-between">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="p-2 sm:p-3 bg-black/60 text-white rounded-full hover:bg-black/80 transition shadow-lg z-10"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image Container */}
        <div className="overflow-hidden rounded-xl shadow-lg bg-gray-900 w-full max-w-full aspect-[240/426]">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${
                (100 / slides.length) * currentIndex
              }%)`,
            }}
          >
            {slides.map((src, idx) => (
              <div
                key={idx}
                className="w-full flex-shrink-0"
                style={{ width: `${100 / slides.length}%` }}
              >
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  draggable={false}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="p-2 sm:p-3 bg-black/60 text-white rounded-full hover:bg-black/80 transition shadow-lg z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex gap-2 mt-4">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full transition-colors ${
              idx === currentIndex ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
