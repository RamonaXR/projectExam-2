import { useState, useEffect } from "react";
import { registerSchema } from "../../validation/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import ErrorMessage from "../../components/ErrorMessage";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [isVenueManager, setIsVenueManager] = useState(false);
  const {
    mutate: registerUser,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useRegister();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      bio: data.bio,
      venueManager: isVenueManager,
      avatar: {
        url: data.avatarUrl,
        alt: `${data.name} avatar`,
      },
    };
    console.log("Submitting registration with payload:", payload);
    registerUser(payload);
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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: 'url("/img/chairview.jpg")' }}
    >
      <div className="bg-white bg-opacity-90 p-4 sm:p-6 md:p-8 rounded-md shadow-lg w-full max-w-md md:max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Register
        </h1>

        <div className="flex mb-6 border rounded-full overflow-hidden">
          <button
            type="button"
            onClick={() => setIsVenueManager(false)}
            className={`w-1/2 py-2 text-center text-xl font-bold transition-colors duration-300 ${
              !isVenueManager
                ? "bg-primary text-black"
                : "bg-white text-gray-700"
            }`}
          >
            Traveller
          </button>
          <button
            type="button"
            onClick={() => setIsVenueManager(true)}
            className={`w-1/2 py-2 text-center text-xl font-bold transition-colors duration-300 ${
              isVenueManager
                ? "bg-primary text-black"
                : "bg-white text-gray-700"
            }`}
          >
            Venue Manager
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full border border-gray-300 p-3 rounded-md"
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email (@stud.noroff.no)"
              {...register("email")}
              className="w-full border border-gray-300 p-3 rounded-md"
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password (min 8 characters)"
              {...register("password")}
              className="w-full border border-gray-300 p-3 rounded-md"
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>
          <div>
            <textarea
              placeholder="Bio (optional)"
              {...register("bio")}
              className="w-full border border-gray-300 p-3 rounded-md"
            />
            {errors.bio && <ErrorMessage message={errors.bio.message} />}
          </div>
          <div>
            <input
              type="text"
              placeholder="Avatar URL (required)"
              {...register("avatarUrl")}
              className="w-full border border-gray-300 p-3 rounded-md"
            />
            {errors.avatarUrl && (
              <ErrorMessage message={errors.avatarUrl.message} />
            )}
          </div>

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
    </div>
  );
}
