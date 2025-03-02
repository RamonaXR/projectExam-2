import { useParams } from "react-router-dom";
import { useVenue } from "../../hooks/useVenue";
import ImageCarousel from "../../components/ImageCarousel";
import StarRating from "../../components/StarRating";
import SafeImage from "../../components/SafeImage";
import { FaWifi, FaPaw, FaUtensils, FaUserFriends } from "react-icons/fa";
import BookingForm from "../../components/BookingForm";
import ErrorMessage from "../../components/ErrorMessage";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/Loader";

export default function VenueDetails() {
  const { venueId } = useParams();
  const { data: venue, isLoading, isError, error } = useVenue(venueId);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Helmet>
        <title>
          {venue.name ? `${venue.name} | Holidaze` : "Venue Details | Holidaze"}
        </title>
        <meta
          name="description"
          content={
            venue.description || "View details for this venue on Holidaze."
          }
        />
        <meta name="venue-id" content={venue.id} />
      </Helmet>
      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <ImageCarousel
            images={venue.media || []}
            fallback="/img/placeholdervenue-3.jpg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {venue.name || "Untitled Venue"}
            </h1>
            <div className="text-xl font-semibold text-gray-700 mb-2">
              ${venue.price}/night
            </div>

            <div className="mb-4">
              <StarRating rating={venue.rating || 0} />
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <FaUserFriends className="text-xl" />
                <span>Max Guests: {venue.maxGuests}</span>
              </div>
              {venue.meta?.breakfast && (
                <div className="flex items-center gap-1">
                  <FaUtensils className="text-xl" />
                  <span>Breakfast: Yes</span>
                </div>
              )}
              {venue.meta?.wifi && (
                <div className="flex items-center gap-1">
                  <FaWifi className="text-xl" />
                  <span>WiFi: Yes</span>
                </div>
              )}
              {venue.meta?.pets && (
                <div className="flex items-center gap-1">
                  <FaPaw className="text-xl" />
                  <span>Pets: Yes</span>
                </div>
              )}
            </div>

            <hr className="my-4" />
            <h2 className="text-lg font-bold mb-2">Description:</h2>
            <p className="text-gray-700 mb-4">
              {venue.description || "No description provided."}
            </p>

            <hr className="my-4" />
            <h2 className="text-lg font-bold mb-2">Venue owner:</h2>
            <div className="flex items-center">
              <SafeImage
                src={venue.owner?.avatar?.url || "/img/placeholderavatar.jpg"}
                alt={venue.owner?.avatar?.alt || "Owner avatar"}
                fallback="/img/placeholderavatar.jpg"
                className="w-12 h-12 rounded-full border border-gray-300 object-cover"
              />
              <span className="ml-3 font-bold text-gray-700">
                {venue.owner?.name || "Unknown Owner"}
              </span>
            </div>
          </div>

          <div>
            <BookingForm venue={venue} />
          </div>
        </div>
      </div>
    </>
  );
}
