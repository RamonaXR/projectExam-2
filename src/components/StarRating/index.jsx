import { FaStar } from "react-icons/fa";

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
            i < filledStars ? "text-yellow-400" : "text-gray-300"
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
