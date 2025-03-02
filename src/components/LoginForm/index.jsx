import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation/validationSchemas";
import ErrorMessage from "../ErrorMessage";
import Button from "../Button";

/**
 * LoginForm component renders a login form with email and password inputs.
 *
 * It leverages react-hook-form for form management and Yup for validation.
 * On submission, it calls the provided onSubmit callback with form data.
 * The component also displays a loading state and error messages when necessary.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.onSubmit - Callback function invoked on form submission.
 * @param {boolean} props.isLoading - Indicates if the login process is in progress.
 * @param {boolean} props.isError - Indicates if there was an error during login.
 * @param {Object} props.error - Error object containing a message to be displayed.
 * @returns {JSX.Element} The rendered login form.
 */
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
        <label htmlFor="login-email" className="block font-bold mb-1">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          placeholder="Email (@stud.noroff.no)"
          {...register("email")}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>
      <div>
        <label htmlFor="login-password" className="block font-bold mb-1">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-button text-white py-3 rounded-md transition-colors duration-300"
      >
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
      {isError && <ErrorMessage message={error.message} />}
    </form>
  );
}
