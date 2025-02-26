import { FaStar } from "react-icons/fa";

export default function StarRating({ rating = 0 }) {
  const filledStars = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={`text-xl ${
            i < filledStars ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      {rating > 0 ? (
        <span className="ml-2 text-gray-600">({rating.toFixed(1)} stars)</span>
      ) : (
        <span className="ml-2 text-gray-600">(No rating yet)</span>
      )}
    </div>
  );
}
