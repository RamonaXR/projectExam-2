import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

export function useUpdateProfile() {
  const token = useAuthStore((state) => state.userProfile?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData) => {
      const response = await fetch(
        `${API_BASE_URL}/holidaze/profiles/${profileData.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(profileData),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.errors
            ? data.errors.map((err) => err.message).join(", ")
            : "Update failed",
        );
      }
      return data.data;
    },
    onSuccess: (updatedProfile) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", updatedProfile.name],
      });
    },
  });
}
