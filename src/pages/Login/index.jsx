import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import LoginForm from "../../components/LoginForm";
import { useAuthStore } from "../../store/authStore";
import { Helmet } from "react-helmet-async";

/**
 * Login component renders the login page for Holidaze.
 *
 * This component displays a login form allowing users to log in as either a Traveller or a Venue Manager.
 * It uses the `useLogin` hook to perform the login API call and updates the authentication state via `useAuthStore`.
 * After a successful login, the user is redirected to the URL specified in the "redirect" query parameter,
 * or to the home page if no redirect is provided.
 * The component also uses Helmet to set the page title and meta description for SEO purposes.
 *
 * @component
 * @returns {JSX.Element} The rendered login page.
 *
 * @example
 * // In your routing configuration:
 * <Route path="/login" element={<Login />} />
 */
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
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const onSubmit = (data) => {
    loginUser(data, {
      onSuccess: (response) => {
        setLogin(response.data);
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(redirect, { replace: true });
    }
  }, [isSuccess, navigate, redirect]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/img/foggybeach.jpg")' }}
    >
      <Helmet>
        <title>Login | Holidaze</title>
        <meta
          name="description"
          content="Log in to Holidaze as a Traveller to book venues or as a Venue Manager to add and manage venues."
        />
      </Helmet>
      <div className="bg-white bg-opacity-80 p-4 sm:p-6 md:p-8 rounded-md shadow-lg w-full max-w-[320px] sm:max-w-sm md:max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <p className="text-center text-gray-700 mb-4">
          Please log in as <span className="font-bold">Traveller</span> to book
          venues, or as a <span className="font-bold">Venue Manager</span> to
          add and manage venues.
        </p>
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
            className="font-bold text-button hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
