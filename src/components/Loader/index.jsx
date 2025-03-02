import { FaSpinner } from "react-icons/fa";

export default function Loader({ className = "" }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <FaSpinner size={32} className="animate-spin text-gray-600" />
    </div>
  );
}
