import { FaSpinner } from "react-icons/fa";

/**
 * Loader component displays a spinning loading indicator.
 *
 * It renders a centered spinner icon with an optional custom class name.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.className=""] - Additional CSS classes to apply for custom styling.
 * @returns {JSX.Element} The rendered loading spinner.
 */
export default function Loader({ className = "" }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <FaSpinner size={32} className="animate-spin text-gray-600" />
    </div>
  );
}
