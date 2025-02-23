import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";

export function useLogin() {
  return useMutation({
    mutationFn: async (payload) => {
      console.log("Login payload:", payload);
      const response = await fetch(
        `${API_BASE_URL}/auth/login?_holidaze=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: API_KEY,
          },
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.errors
            ? data.errors.map((err) => err.message).join(", ")
            : "Login failed.",
        );
      }
      const json = await response.json();
      console.log("Login response:", json);
      return json;
    },
  });
}
