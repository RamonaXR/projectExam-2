import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthStore } from "../../store/authStore";
import { useBooking } from "../../hooks/useBooking";
import ErrorMessage from "../ErrorMessage";
import Button from "../Button";
import Modal from "../Modal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../../validation/validationSchemas";

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

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      guests: 1,
    },
    resolver: yupResolver(bookingSchema),
  });

  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingError, setBookingError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const guests = watch("guests");

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

  const isOverlap = (start, end, bookedDates) => {
    const normalize = (date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const normalizedStart = normalize(start);
    const normalizedEnd = normalize(end);
    const selectedDates = getDatesBetween(normalizedStart, normalizedEnd);
    return selectedDates.some((date) =>
      bookedDates.some(
        (booked) => normalize(booked).toDateString() === date.toDateString(),
      ),
    );
  };

  const onSubmit = (data) => {
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
    if (!data.startDate || !data.endDate) {
      setBookingError("Please select both start and end dates.");
      return;
    }
    if (nights < 1) {
      setBookingError("The booking must be at least 1 night.");
      return;
    }
    if (isOverlap(data.startDate, data.endDate, bookedDates)) {
      setBookingError("Selected dates overlap with an existing booking.");
      return;
    }

    const bookingPayload = {
      venueId: venue.id,
      dateFrom: data.startDate.toISOString(),
      dateTo: data.endDate.toISOString(),
      guests: data.guests,
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
            backgroundColor: "#d32f2f",
            color: "white",
            borderRadius: "50%",
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="start-date" className="block font-bold mb-2">
            Select Start Date
          </label>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                id="start-date"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                selectsStart
                startDate={field.value}
                endDate={endDate}
                minDate={new Date()}
                excludeDates={bookedDates}
                renderDayContents={renderDay}
                className="w-full border border-gray-300 p-2 rounded-md mb-2 md:mb-0 text-center"
                placeholderText="Select start date"
              />
            )}
          />
          {errors.startDate && (
            <ErrorMessage message={errors.startDate.message} />
          )}
        </div>

        <div>
          <label htmlFor="end-date" className="block font-bold mb-2">
            Select End Date
          </label>
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <DatePicker
                id="end-date"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                selectsEnd
                startDate={startDate}
                endDate={field.value}
                minDate={startDate || new Date()}
                excludeDates={bookedDates}
                renderDayContents={renderDay}
                className="w-full border border-gray-300 p-2 rounded-md text-center"
                placeholderText="Select end date"
              />
            )}
          />
          {errors.endDate && <ErrorMessage message={errors.endDate.message} />}
        </div>

        {startDate && endDate && (
          <div className="text-lg font-bold text-gray-800">
            {nights} night{nights > 1 ? "s" : ""} - Total: $
            {totalPrice.toFixed(2)}
          </div>
        )}

        <div>
          <label htmlFor="guest-count" className="block font-bold mb-2">
            Number of Guests
          </label>
          <div className="flex items-center justify-center space-x-3">
            <button
              type="button"
              onClick={() => {
                const currentGuests = parseInt(guests, 10) || 1;
                setValue("guests", Math.max(1, currentGuests - 1));
              }}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              -
            </button>
            <span id="guest-count" className="text-xl font-bold">
              {guests}
            </span>
            <button
              type="button"
              onClick={() => {
                const currentGuests = parseInt(guests, 10) || 1;
                setValue("guests", Math.min(100, currentGuests + 1));
              }}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              +
            </button>
          </div>
          {errors.guests && <ErrorMessage message={errors.guests.message} />}
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
          <span className="font-extrabold text-xl">Booking Confirmed!</span>
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
