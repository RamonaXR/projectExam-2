import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import LoginForm from "../../components/LoginForm";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
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

        <LoginForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />

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
