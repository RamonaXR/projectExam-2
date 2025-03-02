import { Link } from "react-router-dom";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useDeleteVenue } from "../../hooks/useDeleteVenue";
import SafeImage from "../SafeImage";
import { useState } from "react";
import Modal from "../Modal";

/**
 * VenuesList component renders a list of venue cards with options to edit or delete each venue.
 *
 * Each venue card displays an image, name, and price per night. The component also provides functionality
 * to delete a venue. When the delete button is clicked, a confirmation modal is shown. Upon confirmation,
 * the venue is deleted using the useDeleteVenue hook.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.venues - An array of venue objects.
 * Each venue object should include:
 *   - {string|number} id - Unique identifier for the venue.
 *   - {string} name - Name of the venue.
 *   - {number} price - Price per night for the venue.
 *   - {Array<Object>} [media] - Array of media objects, where each object can contain:
 *       - {string} url - URL of the venue image.
 * @returns {JSX.Element} The rendered VenuesList component.
 */
export default function VenuesList({ venues }) {
  const { mutate: deleteVenue, isLoading, error } = useDeleteVenue();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [selectedVenueName, setSelectedVenueName] = useState("");

  /**
   * Handles the click event for the delete button.
   * Sets the selected venue and opens the confirmation modal.
   *
   * @param {string|number} venueId - The id of the venue to delete.
   * @param {string} venueName - The name of the venue to display in the confirmation.
   */
  const handleDeleteClick = (venueId, venueName) => {
    setSelectedVenueId(venueId);
    setSelectedVenueName(venueName);
    setConfirmOpen(true);
  };

  /**
   * Confirms the deletion of the selected venue.
   * Calls the deleteVenue mutation and resets the modal state.
   */
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
            <Link
              to={`/venue/${venue.id}`}
              className="flex items-center space-x-4 flex-1"
            >
              <SafeImage
                src={venue.media && venue.media[0]?.url}
                fallback="/img/placeholdervenue-3.jpg"
                alt={venue.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <p className="font-bold text-lg">{venue.name}</p>
                <p className="text-gray-600">Price: ${venue.price} / night</p>
              </div>
            </Link>
            <div className="flex space-x-2 mt-4 md:mt-0">
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
