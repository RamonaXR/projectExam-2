import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import ErrorMessage from "../../components/ErrorMessage";

export default function Register() {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl: "",
  };

  // Toggle: false = Traveller, true = Venue Manager
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const {
    mutate: registerUser,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useRegister();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitRegistration = () => {
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      bio: formData.bio,
      venueManager: isVenueManager, // Set based on toggle
      avatar: {
        url: formData.avatarUrl,
        alt: `${formData.name} avatar`,
      },
    };
    console.log("Submitting registration with payload:", payload);
    registerUser(payload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitRegistration();
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Register
      </h1>

      <div className="flex mb-6 border rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsVenueManager(false)}
          className={`w-1/2 py-2 text-center text-xl font-bold transition-colors duration-300 ${
            !isVenueManager
              ? "bg-primary text-black hover:bg-primary/90"
              : "bg-white text-gray-700 hover:bg-gray-300"
          }`}
        >
          Traveller
        </button>
        <button
          type="button"
          onClick={() => setIsVenueManager(true)}
          className={`w-1/2 py-2 text-center text-xl font-bold transition-colors duration-300 ${
            isVenueManager
              ? "bg-primary text-black hover:bg-primary/90"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Venue Manager
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email (@stud.noroff.no)"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 8 characters)"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <textarea
          name="bio"
          placeholder="Bio (optional)"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <input
          type="text"
          name="avatarUrl"
          placeholder="Avatar URL (required)"
          value={formData.avatarUrl}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-md"
        />

        {isError && <ErrorMessage message={error.message} />}

        {isSuccess ? (
          <div className="text-green-500 text-center">
            Registration successful! Redirecting to login...
          </div>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-button text-white py-3 rounded-md transition-colors duration-300"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        )}
      </form>
    </div>
  );
}
