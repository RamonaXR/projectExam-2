import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";

/**
 * Custom hook to fetch detailed data for a specific venue.
 *
 * This hook leverages react-query's useQuery to retrieve venue details from the API.
 * It fetches information about the venue including owner details and bookings.
 *
 * @param {string|number} venueId - The unique identifier of the venue to fetch.
 * @returns {object} The query object returned by useQuery, including properties such as data, isLoading, isError, and error.
 *
 * @example
 * const { data, isLoading, isError } = useVenue("123");
 */
export function useVenue(venueId) {
  return useQuery({
    queryKey: ["venue", venueId],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/holidaze/venues/${venueId}?_owner=true&_bookings=true`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch venue data.");
      }
      const data = await response.json();
      return data.data;
    },
  });
}
