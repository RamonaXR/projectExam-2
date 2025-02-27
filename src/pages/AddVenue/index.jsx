import { Navigate, useNavigate } from "react-router-dom";
import VenueForm from "../../components/VenueForm";
import { useAddVenue } from "../../hooks/useAddVenue";
import ErrorMessage from "../../components/ErrorMessage";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

export default function AddVenue() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const { mutate: addVenue, isLoading, error } = useAddVenue();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const initialValues = {
    name: "",
    description: "",
    mediaUrls: [],
    price: "",
    maxGuests: "",
    rating: "",
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  };

  const onSubmit = (data) => {
    addVenue(data, {
      onSuccess: () => {
        toast.success("Venue created successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/profile");
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 my-8 border border-primary rounded shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Add Venue</h1>
      <VenueForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        isLoading={isLoading}
        buttonText="Create Venue"
      />
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}
