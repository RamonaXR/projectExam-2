import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";

export function useBooking() {
  return useMutation(async (bookingPayload) => {
    const response = await fetch(`${API_BASE_URL}/holidaze/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: API_KEY,
      },
      body: JSON.stringify(bookingPayload),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        data.errors
          ? data.errors.map((err) => err.message).join(", ")
          : "Booking failed",
      );
    }
    return response.json();
  });
}
