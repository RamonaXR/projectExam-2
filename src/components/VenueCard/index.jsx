import { Link } from "react-router-dom";
import { FaWifi, FaPaw, FaUtensils, FaUserFriends } from "react-icons/fa";
import SafeImage from "../SafeImage";

/**
 * VenueCard component displays a card with venue details.
 *
 * It shows a venue image using the SafeImage component, the venue's name, owner's avatar and name,
 * various meta information (like maximum guests, breakfast, WiFi, and pets), and pricing details.
 * The entire card is wrapped in a NavLink that navigates to the venue's detail page.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.venue - The venue object containing all details to display.
 * @param {string|number} props.venue.id - Unique identifier for the venue.
 * @param {string} props.venue.name - The name of the venue.
 * @param {Array} props.venue.media - Array of media objects; the first object is used for the venue image.
 * @param {string} props.venue.media[].url - The URL of the media image.
 * @param {string} [props.venue.media[].alt] - Alternative text for the media image.
 * @param {Object} props.venue.owner - Owner information for the venue.
 * @param {Object} props.venue.owner.avatar - Avatar details of the owner.
 * @param {string} props.venue.owner.avatar.url - URL of the owner's avatar.
 * @param {string} [props.venue.owner.avatar.alt] - Alternative text for the owner's avatar.
 * @param {string} props.venue.owner.name - Name of the venue owner.
 * @param {number} props.venue.maxGuests - Maximum number of guests allowed.
 * @param {Object} props.venue.meta - Object containing meta information about venue amenities.
 * @param {boolean} props.venue.meta.breakfast - Indicates if breakfast is provided.
 * @param {boolean} props.venue.meta.wifi - Indicates if WiFi is available.
 * @param {boolean} props.venue.meta.pets - Indicates if pets are allowed.
 * @param {number} props.venue.price - Price per night for the venue.
 * @returns {JSX.Element} The rendered venue card component.
 */
export default function VenueCard({ venue }) {
  const imageUrl =
    venue.media && venue.media[0]?.url
      ? venue.media[0].url
      : "/img/placeholdervenue-3.jpg";

  return (
    <Link to={`/venue/${venue.id}`}>
      <div className="border border-primary rounded-lg shadow-md overflow-hidden bg-white flex flex-col hover:shadow-lg transition-shadow duration-300 h-full ">
        <SafeImage
          src={imageUrl}
          alt={
            venue.media && venue.media[0]?.alt
              ? venue.media[0].alt
              : "Venue image"
          }
          fallback="/img/placeholdervenue-3.jpg"
          className="w-full h-56 object-cover"
          loading="lazy"
        />
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="font-semibold text-2xl text-gray-800 mb-2 truncate">
            {venue.name}
          </h2>
          <div className="flex items-center space-x-2 mb-3">
            <SafeImage
              src={venue.owner?.avatar?.url || "/img/placeholderavatar.jpg"}
              alt={venue.owner?.avatar?.alt || "Owner avatar"}
              fallback="/img/placeholderavatar.jpg"
              className="w-9 h-9 rounded-full border border-gray-300 object-cover"
            />
            <span className="ml-3 text-base text-gray-700">
              {venue.owner?.name || "Unknown Owner"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm mb-3">
            <div className="flex items-center gap-1">
              <FaUserFriends className="text-base" />
              <span>{venue.maxGuests} guests</span>
            </div>
            {venue.meta?.breakfast && (
              <div className="flex items-center gap-1">
                <FaUtensils className="text-base" />
                <span>Breakfast</span>
              </div>
            )}
            {venue.meta?.wifi && (
              <div className="flex items-center gap-1">
                <FaWifi className="text-base" />
                <span>WiFi</span>
              </div>
            )}
            {venue.meta?.pets && (
              <div className="flex items-center gap-1">
                <FaPaw className="text-base" />
                <span>Pets</span>
              </div>
            )}
          </div>
          <div className="mt-auto pt-4">
            <div className="flex justify-end items-end">
              <span className="font-bold text-black text-xl">
                ${venue.price}
              </span>
              <span className="text-sm text-gray-600 ml-1">/night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
