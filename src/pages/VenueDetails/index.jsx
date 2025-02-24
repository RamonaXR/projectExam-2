import { useParams } from "react-router-dom";
import { useVenue } from "../../hooks/useVenue";
import ImageCarousel from "../../components/ImageCarousel";
import SafeImage from "../../components/SafeImage";
import { FaWifi, FaPaw, FaUtensils, FaUserFriends } from "react-icons/fa";
import BookingForm from "../../components/BookingForm";
import ErrorMessage from "../../components/ErrorMessage";

export default function VenueDetails() {
  const { venueId } = useParams();
  const { data: venue, isLoading, isError, error } = useVenue(venueId);

  if (isLoading) return <div className="text-center">Loading venue...</div>;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ImageCarousel
        images={venue.media || []}
        fallback="/img/placeholdervenue-3.jpg"
      />

      <div className="flex items-center mt-4">
        <SafeImage
          src={venue.owner?.avatar?.url || "/img/placeholderavatar.jpg"}
          alt={venue.owner?.avatar?.alt || "Owner avatar"}
          fallback="/img/placeholderavatar.jpg"
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <span className="ml-3 font-bold text-lg text-gray-700">
          {venue.owner?.name || "Unknown"}
        </span>
      </div>

      <hr className="my-4" />
      <p className="text-gray-800 mb-4">{venue.description}</p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <FaUserFriends className="text-xl" />
          <span>{venue.maxGuests} guests</span>
        </div>
        {venue.meta?.breakfast && (
          <div className="flex items-center gap-1">
            <FaUtensils className="text-xl" />
            <span>Breakfast</span>
          </div>
        )}
        {venue.meta?.wifi && (
          <div className="flex items-center gap-1">
            <FaWifi className="text-xl" />
            <span>WiFi</span>
          </div>
        )}
        {venue.meta?.pets && (
          <div className="flex items-center gap-1">
            <FaPaw className="text-xl" />
            <span>Pets</span>
          </div>
        )}
        <div className="ml-auto flex items-center gap-1">
          <span className="font-bold text-2xl">${venue.price}</span>
          <span className="text-lg text-gray-600">/night</span>
        </div>
      </div>

      {/* Booking Form */}
      <BookingForm venue={venue} />
    </div>
  );
}
