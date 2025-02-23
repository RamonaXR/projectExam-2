import { loginSchema } from "../../validation/validationSchemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import ErrorMessage from "../../components/ErrorMessage";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    mutate: loginUser,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useLogin();
  const { setLogin } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    loginUser(data, {
      onSuccess: (response) => {
        setLogin(response.data);
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/img/foggybeach.jpg")' }}
    >
      <div className="bg-white bg-opacity-80 p-4 sm:p-6 md:p-8 rounded-md shadow-lg w-full max-w-md md:max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
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
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
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
        <div className="mt-4 text-center text-gray-700">
          Not already a member?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-600 hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
