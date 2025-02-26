import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import RegisterForm from "../../components/RegisterForm";

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
  );
}
