import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthStore } from "../../store/authStore";
import { useBooking } from "../../hooks/useBooking";
import ErrorMessage from "../ErrorMessage";
import Button from "../Button";
import Modal from "../Modal";

function getDatesBetween(start, end) {
  const dates = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export default function BookingForm({ venue, refetchProfile }) {
  const { isLoggedIn, userProfile } = useAuthStore();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingError, setBookingError] = useState("");

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
    } else {
      setNights(0);
      setTotalPrice(0);
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
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests,
    };

    bookingMutation.mutate(bookingPayload, {
      onSuccess: () => {
        if (refetchProfile) refetchProfile();
        setIsSuccessModalOpen(true);
      },
    });
  };

  const renderDay = (day, date) => {
    const isBooked = bookedDates.some(
      (booked) => booked.toDateString() === date.toDateString(),
    );
    if (isBooked) {
      return (
        <div
          style={{
            backgroundColor: "#fca5a5",
            color: "white",
            borderRadius: "50%",
            padding: "0.25rem",
          }}
        >
          {day}
        </div>
      );
    }
    return <div>{day}</div>;
  };

  return (
    <div className="mt-8 bg-white p-6 rounded shadow-md border border-primary text-center">
      <h2 className="text-xl font-bold mb-4">Reserve your stay</h2>

      {bookingError && <ErrorMessage message={bookingError} />}
      {bookingMutation.isError && (
        <ErrorMessage message={bookingMutation.error.message} />
      )}

      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="block font-bold mb-2">Select dates</label>
          <div className="flex flex-col md:flex-row md:space-x-4 justify-center px-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              excludeDates={bookedDates}
              renderDayContents={renderDay}
              className="w-full border border-gray-300 p-2 rounded-md mb-2 md:mb-0 text-center"
              placeholderText="Select start date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              excludeDates={bookedDates}
              renderDayContents={renderDay}
              className="w-full border border-gray-300 p-2 rounded-md text-center"
              placeholderText="Select end date"
            />
          </div>
        </div>

        {startDate && endDate && (
          <div className="text-lg font-bold text-gray-800">
            {nights} night{nights > 1 ? "s" : ""} - Total: $
            {totalPrice.toFixed(2)}
          </div>
        )}

        <div>
          <label className="block font-bold mb-2">Number of guests</label>
          <div className="flex items-center justify-center space-x-3">
            <button
              type="button"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              -
            </button>
            <span className="text-xl font-bold">{guests}</span>
            <button
              type="button"
              onClick={() => setGuests(Math.min(100, guests + 1))}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {!isLoggedIn || userProfile?.venueManager ? (
            <Button
              onClick={() => navigate(`/login?redirect=/venue/${venue.id}`)}
            >
              {userProfile?.venueManager
                ? "Log in as traveller to book"
                : "Log in to book"}
            </Button>
          ) : (
            <Button type="submit" disabled={bookingMutation.isLoading}>
              {bookingMutation.isLoading ? "Booking..." : "Book Now"}
            </Button>
          )}
        </div>
      </form>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title={
          <span className="font-extrabold text-1xl">Booking Confirmed!</span>
        }
      >
        <p className="text-gray-700 mb-2">
          Your booking at <span className="font-extrabold">{venue.name}</span>{" "}
          has been confirmed.
        </p>
        <p className="text-gray-700 mb-2">
          {nights} night{nights > 1 ? "s" : ""} - Total: $
          {totalPrice.toFixed(2)}
        </p>
        <p className="text-gray-700">
          Please check your email for further details.
        </p>
      </Modal>
    </div>
  );
}
