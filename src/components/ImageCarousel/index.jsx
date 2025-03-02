import { useState } from "react";
import SafeImage from "../SafeImage";

/**
 * ImageCarousel renders an interactive image carousel.
 *
 * If the provided images array is empty or undefined, the carousel will display
 * a single slide using the fallback image. Users can navigate through the slides
 * using next/prev buttons and navigation dots.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.images - An array of image objects. Each object should have:
 *   - {string} url - The URL of the image.
 *   - {string} [alt] - Optional alternative text for the image.
 * @param {string} props.fallback - The fallback image URL used when no images are provided.
 * @returns {JSX.Element|null} The rendered image carousel, or null if no slides are available.
 */
export default function ImageCarousel({ images, fallback }) {
  const slides =
    images && images.length > 0
      ? images
      : [{ url: fallback, alt: "Venue image" }];
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  if (length === 0) return null;

  /**
   * Advances the carousel to the next slide.
   */
  const nextSlide = () => setCurrent((current + 1) % length);

  /**
   * Moves the carousel to the previous slide.
   */
  const prevSlide = () => setCurrent((current - 1 + length) % length);

  return (
    <div className="relative" data-carousel="slide">
      <div className="overflow-hidden relative h-96 rounded-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out absolute inset-0 transition-all ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            data-carousel-item
          >
            <SafeImage
              src={slide.url}
              alt={slide.alt || "Venue image"}
              fallback={fallback}
              className="block w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-50 group-hover:bg-opacity-75 text-white">
              Prev
            </span>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-50 group-hover:bg-opacity-75 text-white">
              Next
            </span>
          </button>
          <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${
                  index === current ? "bg-white" : "bg-gray-400"
                }`}
                aria-current={index === current ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
