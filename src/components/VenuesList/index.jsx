import { Link } from "react-router-dom";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useDeleteVenue } from "../../hooks/useDeleteVenue";
import SafeImage from "../SafeImage";
import { useState } from "react";
import Modal from "../Modal";

export default function VenuesList({ venues }) {
  const { mutate: deleteVenue, isLoading, error } = useDeleteVenue();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [selectedVenueName, setSelectedVenueName] = useState("");

  const handleDeleteClick = (venueId, venueName) => {
    setSelectedVenueId(venueId);
    setSelectedVenueName(venueName);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteVenue(selectedVenueId);
    setConfirmOpen(false);
    setSelectedVenueId(null);
    setSelectedVenueName("");
  };

  if (!venues || venues.length === 0) {
    return <p className="text-gray-600">You have no venues.</p>;
  }

  return (
    <>
      <div className="space-y-4">
        {error && <ErrorMessage message={error.message} />}
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="border p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <Link to={`/venue/${venue.id}`}>
                <SafeImage
                  src={venue.media && venue.media[0]?.url}
                  fallback="/img/placeholdervenue-3.jpg"
                  alt={venue.name}
                  className="w-24 h-24 object-cover rounded"
                />
              </Link>
              <div>
                <Link to={`/venue/${venue.id}`} className="font-bold text-lg">
                  {venue.name}
                </Link>
                <p className="text-gray-600">Price: ${venue.price} / night</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link to={`/venue/${venue.id}/edit`}>
                <Button>Edit</Button>
              </Link>
              <Button
                onClick={() => handleDeleteClick(venue.id, venue.name)}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {confirmOpen && (
        <Modal
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Confirm Delete"
        >
          <p>
            Are you sure you want to delete <strong>{selectedVenueName}</strong>
            ?
          </p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={handleConfirmDelete}>Confirm</Button>
            <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
