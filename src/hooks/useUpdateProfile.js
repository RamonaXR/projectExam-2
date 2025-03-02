import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

/**
 * Custom hook to update a user's profile.
 *
 * This hook leverages react-query's useMutation to send a PUT request to update the user's profile.
 * It uses the user's access token (if available) for authorization and sends the profile data as JSON.
 * Upon successful update, it invalidates the query for the updated profile to ensure fresh data is fetched.
 *
 * @returns {object} The mutation object returned by useMutation, which includes properties such as mutate, isLoading, isError, etc.
 *
 * @example
 * const { mutate: updateProfile } = useUpdateProfile();
 * updateProfile({
 *   name: "johnDoe",
 *   bio: "Updated bio",
 *   avatar: { url: "https://example.com/avatar.jpg", alt: "User avatar" }
 * });
 */
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
