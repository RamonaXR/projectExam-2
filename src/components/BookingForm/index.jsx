import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthStore } from "../../store/authStore";
import { useBooking } from "../../hooks/useBooking";
import ErrorMessage from "../ErrorMessage";
import Button from "../Button";

function getDatesBetween(start, end) {
  const dates = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export default function BookingForm({ venue }) {
  const { isLoggedIn, userProfile } = useAuthStore();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingError, setBookingError] = useState("");

  const bookedDates =
    venue.bookings && venue.bookings.length > 0
      ? venue.bookings.flatMap((b) => {
          const from = new Date(b.dateFrom);
          const to = new Date(b.dateTo);
          return getDatesBetween(from, to);
        })
      : [];

  const bookingMutation = useBooking();

  useEffect(() => {
    if (startDate && endDate) {
      const diffTime = endDate - startDate;
      const diffNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffNights);
      setTotalPrice(diffNights * venue.price);
    }
  }, [startDate, endDate, venue.price]);

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingError("");

    if (!isLoggedIn) {
      setBookingError("Please log in as a traveller to book the venue.");
      return;
    }
    if (userProfile?.venueManager) {
      setBookingError(
        "Venue managers cannot book venues. Please log in as a traveller.",
      );
      return;
    }
    if (!startDate || !endDate) {
      setBookingError("Please select both start and end dates.");
      return;
    }

    const bookingPayload = {
      venueId: venue.id,
      dateFrom: startDate,
      dateTo: endDate,
      guests: 1,
      nights,
      totalPrice,
    };

    bookingMutation.mutate(bookingPayload);
  };

  return (
    <div className="mt-8 border-t pt-4">
      <h2 className="text-2xl font-bold mb-4">Book this venue</h2>
      {bookingError && <ErrorMessage message={bookingError} />}
      {bookingMutation.isError && (
        <ErrorMessage message={bookingMutation.error.message} />
      )}
      {bookingMutation.isSuccess && (
        <div className="text-green-500 text-lg">
          Your booking is confirmed! Check your email for details.
        </div>
      )}
      <form onSubmit={handleBooking} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full">
            <label className="block font-bold mb-2">From:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()} // Prevent booking in the past
              excludeDates={bookedDates} // Disable booked dates
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholderText="Select start date"
            />
          </div>
          <div className="w-full mt-4 md:mt-0">
            <label className="block font-bold mb-2">To:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              excludeDates={bookedDates}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholderText="Select end date"
            />
          </div>
        </div>
        {startDate && endDate && (
          <div className="text-lg font-bold text-gray-800">
            {nights} night{nights > 1 ? "s" : ""} - Total: ${totalPrice}
          </div>
        )}
        <Button type="submit" disabled={bookingMutation.isLoading}>
          {bookingMutation.isLoading ? "Booking..." : "Confirm Booking"}
        </Button>
      </form>
    </div>
  );
}
