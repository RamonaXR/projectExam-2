import { Link } from "react-router-dom";
import { FaWifi, FaPaw, FaUtensils, FaUserFriends } from "react-icons/fa";

export default function VenueCard({ venue }) {
  return (
    <Link to={`/venue/${venue.id}`}>
      <div className="border border-secondary rounded-lg shadow-md overflow-hidden bg-white flex flex-col hover:shadow-lg transition-shadow duration-300">
        {/* Venue Image */}
        <img
          src={venue.media[0]?.url || "/placeholder.jpg"}
          alt={venue.media[0]?.alt || "Venue image"}
          className="w-full h-56 object-cover"
          loading="lazy"
        />
        <div className="p-5 flex flex-col flex-grow">
          {/* Venue Title */}
          <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate">
            {venue.name}
          </h3>
          {/* Owner Info */}
          <div className="flex items-center space-x-2 mb-3">
            <img
              src={venue.owner?.avatar?.url || "/placeholder-avatar.jpg"}
              alt={venue.owner?.avatar?.alt || "Owner avatar"}
              className="w-9 h-9 rounded-full border border-gray-300"
            />
            <span className="text-sm text-gray-500">
              {venue.owner?.name || "Unknown"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm mb-3">
            {/* Max Guests (Always Shown) */}
            <div className="flex items-center gap-1">
              <FaUserFriends className="text-base" />
              <span>{venue.maxGuests} guests</span>
            </div>
            {/* Breakfast (Only if true) */}
            {venue.meta?.breakfast && (
              <div className="flex items-center gap-1">
                <FaUtensils className="text-base" />
                <span>Breakfast</span>
              </div>
            )}
            {/* WiFi (Only if true) */}
            {venue.meta?.wifi && (
              <div className="flex items-center gap-1">
                <FaWifi className="text-base" />
                <span>WiFi</span>
              </div>
            )}
            {/* Pets Allowed (Only if true) */}
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
