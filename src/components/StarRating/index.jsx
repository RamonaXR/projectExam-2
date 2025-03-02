import { FaStar } from "react-icons/fa";

/**
 * StarRating component renders a set of star icons to display and capture a rating.
 *
 * Users can click on any star to set a new rating, provided the `setRating` callback is supplied.
 * The number of filled stars is determined by rounding the given rating between 0 and 5.
 * It also displays the numerical rating alongside the stars.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {number} [props.rating=0] - The current rating value (from 0 to 5).
 * @param {Function} [props.setRating] - Optional callback function to update the rating.
 * @returns {JSX.Element} The rendered star rating component.
 */
export default function StarRating({ rating = 0, setRating }) {
  const handleClick = (newRating) => {
    if (setRating) {
      setRating(newRating);
    }
  };

  const filledStars = Math.max(0, Math.min(5, Math.round(Number(rating))));

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={`cursor-pointer text-xl ${
            i < filledStars ? "text-yellow-600" : "text-gray-300"
          }`}
          onClick={() => handleClick(i + 1)}
        />
      ))}
      {rating > 0 ? (
        <span className="ml-2 text-gray-600">
          ({Number(rating).toFixed(1)} stars)
        </span>
      ) : (
        <span className="ml-2 text-gray-600">(No rating yet)</span>
      )}
    </div>
  );
}
