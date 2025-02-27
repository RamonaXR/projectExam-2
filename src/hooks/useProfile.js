import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

export function useProfile(name, params = { _bookings: true, _venues: true }) {
  const token = useAuthStore((state) => state.userProfile?.accessToken);
  console.log("useProfile token:", token);
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
