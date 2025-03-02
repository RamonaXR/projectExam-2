import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

/**
 * Custom hook to fetch a user's profile.
 *
 * This hook uses react-query's `useQuery` to fetch profile data from the API endpoint.
 * It accepts a profile identifier (`name`) and optional query parameters to include related data,
 * such as bookings and venues. The request includes necessary headers (Content-Type, API key, and
 * an optional Authorization header if the user is logged in).
 *
 * @param {string} name - The profile name or identifier for which to fetch data.
 * @param {object} [params={ _bookings: true, _venues: true }] - Optional query parameters to modify the API request.
 * @returns {object} The query object returned by useQuery, containing data, isLoading, isError, and error properties.
 *
 * @example
 * const { data, isLoading, isError } = useProfile("johnDoe", { _bookings: true, _venues: true });
 */
export function useProfile(name, params = { _bookings: true, _venues: true }) {
  const token = useAuthStore((state) => state.userProfile?.accessToken);
  const queryKey = ["profile", name, params];
  return useQuery({
    queryKey,
    queryFn: async () => {
      const queryParams = new URLSearchParams(params);
      const response = await fetch(
        `${API_BASE_URL}/holidaze/profiles/${name}?${queryParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.errors
            ? data.errors.map((err) => err.message).join(", ")
            : "Error fetching profile",
        );
      }
      return data.data;
    },
    enabled: Boolean(name),
  });
}
