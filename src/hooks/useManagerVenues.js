import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

/**
 * Custom hook to fetch venues managed by a specific manager.
 *
 * This hook leverages react-query's useQuery to retrieve the venues for a given manager by their name.
 * It sends a GET request to the API endpoint with the necessary headers, including an optional
 * Authorization header if a user access token is available. The query is enabled only when a valid
 * manager name is provided.
 *
 * @param {string} name - The manager's name or identifier for which to fetch venues.
 * @returns {object} The query object returned by useQuery, containing properties such as data, isLoading, isError, error, etc.
 *
 * @example
 * const { data, isLoading, isError } = useManagerVenues("managerName");
 */
export function useManagerVenues(name) {
  const token = useAuthStore.getState().userProfile?.accessToken;

  return useQuery({
    queryKey: ["managerVenues", name],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/holidaze/profiles/${name}/venues?_bookings=true`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.errors
            ? data.errors.map((err) => err.message).join(", ")
            : "Error fetching manager venues",
        );
      }

      const data = await response.json();
      return data.data;
    },
    enabled: Boolean(name),
  });
}
