import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useDeleteBooking } from "../../hooks/useDeleteBooking";

export default function BookingsList({ bookings }) {
  const { mutate: deleteBooking, isLoading, error } = useDeleteBooking();

  if (!bookings || bookings.length === 0) {
    return <p className="text-gray-600">No upcoming bookings.</p>;
  }

  return (
    <div className="space-y-4">
      {error && <ErrorMessage message={error.message} />}
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="border p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <p>
              {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
              {new Date(booking.dateTo).toLocaleDateString()}
            </p>
            <p>Guests: {booking.guests}</p>
          </div>
          <Button
            onClick={() => deleteBooking(booking.id)}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      ))}
    </div>
  );
}
