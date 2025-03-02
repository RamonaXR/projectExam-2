import { Navigate, useNavigate } from "react-router-dom";
import VenueForm from "../../components/VenueForm";
import { useAddVenue } from "../../hooks/useAddVenue";
import ErrorMessage from "../../components/ErrorMessage";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

/**
 * AddVenue component renders a form for creating a new venue.
 *
 * This component checks if the user is logged in and redirects to the home page if not.
 * It initializes the form with default values and uses the VenueForm component to collect venue data.
 * Upon submission, the useAddVenue hook is used to send the data to the API. On successful creation,
 * a success toast is displayed and the user is redirected to the profile page. The page's metadata is set
 * using Helmet.
 *
 * @component
 * @returns {JSX.Element} The rendered AddVenue component.
 *
 * @example
 * // In your router configuration, render <AddVenue /> for the add venue route.
 * <Route path="/venue/add" element={<AddVenue />} />
 */
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
    rating: 0,
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
    <>
      <Helmet>
        <title>Add Venue | Holidaze</title>
        <meta
          name="description"
          content="Add a new venue to Holidaze and start hosting guests."
        />
      </Helmet>
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
    </>
  );
}
