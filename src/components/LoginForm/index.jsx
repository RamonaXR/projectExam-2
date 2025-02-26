import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation/validationSchemas";
import ErrorMessage from "../ErrorMessage";

export default function LoginForm({ onSubmit, isLoading, isError, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="Password"
          {...register("password")}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-button text-white py-3 rounded-md transition-colors duration-300"
      >
        {isLoading ? "Logging in..." : "Log in"}
      </button>
      {isError && <ErrorMessage message={error.message} />}
    </form>
  );
}
