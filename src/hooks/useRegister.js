import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";

export function useRegister() {
  return useMutation({
    mutationFn: async (payload) => {
      console.log("Registering user with payload:", payload);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: API_KEY,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.errors
            ? data.errors.map((err) => err.message).join(", ")
            : "Registration failed.",
        );
      }
      const responseData = await response.json();
      console.log("Registration successful. Response data:", responseData);
      return responseData;
    },
  });
}
