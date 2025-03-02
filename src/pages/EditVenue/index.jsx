import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useVenue } from "../../hooks/useVenue";
import VenueForm from "../../components/VenueForm";
import { useEditVenue } from "../../hooks/useEditVenue";
import ErrorMessage from "../../components/ErrorMessage";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/Loader";

/**
 * EditVenue component allows a logged-in user to update an existing venue.
 *
 * It retrieves the venue ID from the URL parameters and fetches the current venue data using the `useVenue` hook.
 * If the user is not logged in, they are redirected to the home page.
 * When the venue data is loaded, it initializes a form using the VenueForm component.
 * Upon submission, the updated data is sent via the `useEditVenue` hook.
 * Successful updates trigger a success toast notification and redirect the user to the profile page.
 * The component also uses Helmet to set the page metadata for SEO purposes.
 *
 * @component
 * @returns {JSX.Element} The rendered EditVenue component.
 *
 * @example
 * // Rendered as part of a route:
 * <Route path="/venue/:id/edit" element={<EditVenue />} />
 */
export default function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const { data: venue, isLoading, isError, error } = useVenue(id);
  const {
    mutate: editVenue,
    isLoading: isUpdating,
    error: updateError,
  } = useEditVenue();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  const initialValues = {
    name: venue.name || "",
    description: venue.description || "",
    mediaUrls: venue.media ? venue.media.map((img) => ({ url: img.url })) : [],
    price: venue.price || "",
    maxGuests: venue.maxGuests || "",
    rating: venue.rating || 0,
    meta: {
      wifi: venue.meta?.wifi || false,
      parking: venue.meta?.parking || false,
      breakfast: venue.meta?.breakfast || false,
      pets: venue.meta?.pets || false,
    },
  };

  const onSubmit = (data) => {
    editVenue(
      { venueId: id, ...data },
      {
        onSuccess: () => {
          toast.success("Venue updated successfully!", {
            position: "top-center",
            autoClose: 3500,
          });
          navigate("/profile");
        },
      },
    );
  };

  return (
    <>
      <Helmet>
        <title>Edit Venue | Holidaze</title>
        <meta
          name="description"
          content="Update your venue details on Holidaze."
        />
      </Helmet>
      <div className="max-w-2xl mx-auto p-6 my-8 border border-primary rounded shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Venue</h1>
        <VenueForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          isLoading={isUpdating}
          buttonText="Update Venue"
        />
        {updateError && <ErrorMessage message={updateError.message} />}
      </div>
    </>
  );
}
