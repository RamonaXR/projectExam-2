import { Link } from "react-router-dom";
import { FaWifi, FaPaw, FaUtensils, FaUserFriends } from "react-icons/fa";
import SafeImage from "../SafeImage";

export default function VenueCard({ venue }) {
  const imageUrl =
    venue.media && venue.media[0]?.url
      ? venue.media[0].url
      : "/img/placeholdervenue-3.jpg";

  return (
    <Link to={`/venue/${venue.id}`}>
      <div className="border border-primary rounded-lg shadow-md overflow-hidden bg-white flex flex-col hover:shadow-lg transition-shadow duration-300 min-h-[450px]">
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
          <h3 className="font-semibold text-2xl text-gray-800 mb-2 truncate">
            {venue.name}
          </h3>
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
