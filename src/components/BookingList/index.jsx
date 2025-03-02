import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useDeleteBooking } from "../../hooks/useDeleteBooking";
import SafeImage from "../SafeImage";
import Modal from "../Modal";

/**
 * BookingsList displays a list of upcoming bookings along with options to delete them.
 *
 * It renders booking details such as the booking dates, guest count, and venue information.
 * Each booking includes a delete button which, when clicked, opens a confirmation modal.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.bookings - An array of booking objects.
 * Each booking object should contain:
 *   - {string|number} id - Unique identifier for the booking.
 *   - {string} dateFrom - Start date of the booking.
 *   - {string} dateTo - End date of the booking.
 *   - {number} guests - Number of guests.
 *   - {Object} venue - Venue details including:
 *       - {string|number} id - Venue unique identifier.
 *       - {string} name - Name of the venue.
 *       - {Array<Object>} media - Array of media objects with at least a URL.
 *
 * @returns {JSX.Element} The rendered list of bookings.
 */
export default function BookingsList({ bookings }) {
  const { mutate: deleteBooking, isLoading, error } = useDeleteBooking();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedVenueName, setSelectedVenueName] = useState("");

  /**
   * Handles the delete button click for a specific booking.
   *
   * Sets the selected booking and opens the confirmation modal.
   *
   * @param {string|number} bookingId - The unique identifier of the booking to delete.
   * @param {string} venueName - The name of the venue associated with the booking.
   */
  const handleDeleteClick = (bookingId, venueName) => {
    setSelectedBookingId(bookingId);
    setSelectedVenueName(venueName);
    setConfirmOpen(true);
  };

  /**
   * Confirms the deletion of the selected booking.
   *
   * Calls the deleteBooking mutation and resets the selection and modal state.
   */
  const handleConfirmDelete = () => {
    deleteBooking(selectedBookingId);
    setConfirmOpen(false);
    setSelectedBookingId(null);
    setSelectedVenueName("");
  };

  if (!bookings || bookings.length === 0) {
    return <p className="text-gray-600">No upcoming bookings.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {error && <ErrorMessage message={error.message} />}
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border p-4 rounded shadow flex flex-col gap-4 sm:flex-row sm:items-center justify-between"
          >
            {/* Wrap image and details in a Link */}
            <Link
              to={`/venue/${booking.venue?.id || ""}`}
              className="flex items-center gap-4 flex-1"
            >
              <SafeImage
                src={booking.venue?.media && booking.venue.media[0]?.url}
                fallback="/img/placeholdervenue-3.jpg"
                alt={booking.venue?.name || "Venue"}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <p>
                  {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                  {new Date(booking.dateTo).toLocaleDateString()}
                </p>
                <p>Guests: {booking.guests}</p>
              </div>
            </Link>
            <Button
              onClick={() =>
                handleDeleteClick(
                  booking.id,
                  booking.venue?.name || "this booking",
                )
              }
              disabled={isLoading}
              className="px-3 py-1"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
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
            Are you sure you want to delete the booking for{" "}
            <strong>{selectedVenueName}</strong>?
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
