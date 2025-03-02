import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation/validationSchemas";
import ErrorMessage from "../ErrorMessage";
import Button from "../Button";

export default function RegisterForm({
  onSubmit,
  isLoading,
  isError,
  error,
  isSuccess,
  isVenueManager,
  setIsVenueManager,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-gray-700 mb-2">
        Sign up as a <strong>Traveller</strong> to book a Holidaze, or as a{" "}
        <strong>Venue Manager</strong> to add and manage venues.
      </p>

      <div className="flex mb-6 border rounded-full overflow-hidden">
        <button
          type="button"
          onClick={() => setIsVenueManager(false)}
          className={`w-1/2 py-2 text-center text-xl font-bold transition-colors duration-300 ${
            !isVenueManager ? "bg-primary text-black" : "bg-white text-gray-700"
          }`}
        >
          Traveller
        </button>
        <button
          type="button"
          onClick={() => setIsVenueManager(true)}
          className={`w-1/2 py-2 text-center text-xl font-bold transition-colors duration-300 ${
            isVenueManager ? "bg-primary text-black" : "bg-white text-gray-700"
          }`}
        >
          Venue Manager
        </button>
      </div>

      <div>
        <label htmlFor="register-name" className="block font-bold mb-1">
          Name
        </label>
        <input
          id="register-name"
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        {errors.name && <ErrorMessage message={errors.name.message} />}
      </div>

      <div>
        <label htmlFor="register-email" className="block font-bold mb-1">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          placeholder="Email (@stud.noroff.no)"
          {...register("email")}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>

      <div>
        <label htmlFor="register-password" className="block font-bold mb-1">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          placeholder="Password (min 8 characters)"
          {...register("password")}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>

      <div>
        <label htmlFor="register-bio" className="block font-bold mb-1">
          Bio (optional)
        </label>
        <textarea
          id="register-bio"
          placeholder="Tell us about yourself"
          {...register("bio")}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        {errors.bio && <ErrorMessage message={errors.bio.message} />}
      </div>

      <div>
        <label htmlFor="register-avatarUrl" className="block font-bold mb-1">
          Avatar URL
        </label>
        <input
          id="register-avatarUrl"
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
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-button text-white py-3 rounded-md transition-colors duration-300"
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      )}
    </form>
  );
}
