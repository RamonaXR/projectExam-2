import { useParams, useNavigate } from "react-router-dom";
import { useVenue } from "../../hooks/useVenue";
import VenueForm from "../../components/VenueForm";
import { useEditVenue } from "../../hooks/useEditVenue";
import ErrorMessage from "../../components/ErrorMessage";

export default function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: venue, isLoading, isError, error } = useVenue(id);
  const {
    mutate: editVenue,
    isLoading: isUpdating,
    error: updateError,
  } = useEditVenue();

  if (isLoading)
    return <div className="text-center">Loading venue details...</div>;
  if (isError) return <ErrorMessage message={error.message} />;

  const initialValues = {
    name: venue.name || "",
    description: venue.description || "",
    mediaUrls: venue.media
      ? venue.media.map((img) => ({ url: img.url }))
      : [""],
    price: venue.price || "",
    maxGuests: venue.maxGuests || "",
    rating: venue.rating || "",
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
          navigate("/profile");
        },
      },
    );
  };

  return (
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
  );
}
