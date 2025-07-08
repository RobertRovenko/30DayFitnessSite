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
    <section className="w-full px-6 mt-20 flex flex-col items-center select-none">
      <div className="relative flex items-center">
        {/* Left arrow outside container */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="mr-4 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-shadow shadow-lg"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Image container with fixed size */}
        <div
          className="overflow-hidden rounded-xl shadow-lg bg-gray-900"
          style={{ width: 240, height: 426 }}
        >
          {/* Slide wrapper with horizontal translate */}
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 240}px)` }}
          >
            {slides.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Slide ${idx + 1}`}
                draggable={false}
                className="object-contain"
                style={{ width: 240, height: 426, flexShrink: 0 }}
              />
            ))}
          </div>
        </div>

        {/* Right arrow outside container */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="ml-4 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-shadow shadow-lg"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2 mt-6">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              idx === currentIndex ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
