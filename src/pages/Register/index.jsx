import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import RegisterForm from "../../components/RegisterForm";
import { Helmet } from "react-helmet-async";

/**
 * Register component renders the registration page for Holidaze.
 *
 * This component provides a form for users to register on Holidaze as either a Traveller or a Venue Manager.
 * It uses the `useRegister` hook to handle the registration process. When the form is submitted, it constructs a payload
 * that includes the user's details, a flag indicating if they are registering as a Venue Manager, and an avatar object.
 * Upon successful registration, the user is redirected to the login page after a 3-second delay.
 *
 * Helmet is used to set the page title and meta description for SEO purposes.
 *
 * @component
 * @returns {JSX.Element} The rendered registration page.
 *
 * @example
 * <Register />
 */
export default function Register() {
  const [isVenueManager, setIsVenueManager] = useState(false);
  const {
    mutate: registerUser,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useRegister();
  const navigate = useNavigate();

  /**
   * Handles form submission by constructing the registration payload and invoking the register mutation.
   *
   * @param {Object} data - The form data from the registration form.
   * @param {string} data.name - The user's name.
   * @param {string} data.email - The user's email address.
   * @param {string} data.password - The user's password.
   * @param {string} data.bio - The user's biography.
   * @param {string} data.avatarUrl - The URL of the user's avatar image.
   */
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

    registerUser(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <Helmet>
        <title>Register | Holidaze</title>
        <meta
          name="description"
          content="Register on Holidaze as a Traveller to book venues or as a Venue Manager to add and manage venues."
        />
      </Helmet>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
        style={{ backgroundImage: 'url("/img/chairview.jpg")' }}
      >
        <div className="bg-white bg-opacity-90 p-4 sm:p-6 md:p-8 rounded-md shadow-lg w-full max-w-md md:max-w-lg">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Register
          </h1>
          <RegisterForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isSuccess={isSuccess}
            isVenueManager={isVenueManager}
            setIsVenueManager={setIsVenueManager}
          />
        </div>
      </div>
    </>
  );
}
