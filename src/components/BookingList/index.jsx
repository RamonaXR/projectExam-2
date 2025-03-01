import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useDeleteBooking } from "../../hooks/useDeleteBooking";
import SafeImage from "../SafeImage";
import Modal from "../Modal";

export default function BookingsList({ bookings }) {
  const { mutate: deleteBooking, isLoading, error } = useDeleteBooking();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedVenueName, setSelectedVenueName] = useState("");

  const handleDeleteClick = (bookingId, venueName) => {
    setSelectedBookingId(bookingId);
    setSelectedVenueName(venueName);
    setConfirmOpen(true);
  };

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
            className="border p-4 rounded shadow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <Link to={`/venue/${booking.venue?.id || ""}`}>
                <SafeImage
                  src={booking.venue?.media && booking.venue.media[0]?.url}
                  fallback="/img/placeholdervenue-3.jpg"
                  alt={booking.venue?.name || "Venue"}
                  className="w-24 h-24 object-cover rounded"
                />
              </Link>
              <div>
                <p>
                  {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                  {new Date(booking.dateTo).toLocaleDateString()}
                </p>
                <p>Guests: {booking.guests}</p>
              </div>
            </div>

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
