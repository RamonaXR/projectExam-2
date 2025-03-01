import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

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
