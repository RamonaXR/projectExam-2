export default function VenueCard({ venue }) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden">
      {/* Venue Image */}
      <img
        src={venue.media[0]?.url || "/placeholder.jpg"}
        alt={venue.media[0]?.alt || "Venue image"}
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4 flex flex-col space-y-2">
        {/* Venue Title */}
        <h3 className="font-semibold text-lg text-gray-800">{venue.name}</h3>

        {/* Venue Description */}
        <p className="text-sm text-gray-600">{venue.description}</p>

        {/* Owner Information */}
        <div className="flex items-center space-x-2 mt-4">
          <img
            src={venue.owner?.avatar?.url || "/placeholder-avatar.jpg"}
            alt={venue.owner?.avatar?.alt || "Owner avatar"}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-500">
            {venue.owner?.name || "Unknown"}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-primary">{`$${venue.price}`}</span>
        </div>
      </div>
    </div>
  );
}
