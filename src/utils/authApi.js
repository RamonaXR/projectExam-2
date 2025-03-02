import { API_BASE_URL, API_KEY } from "../constants";

/**
 * Sends a login request to the API.
 *
 * This function makes a POST request to the login endpoint with the provided payload.
 * It includes the API key in the request headers and expects the API to respond with
 * a JSON object containing user data or error messages.
 *
 * @param {Object} payload - The login credentials (e.g., { email: string, password: string }).
 * @returns {Promise<Object>} The API response data.
 * @throws {Error} Throws an error if the response is not ok, including API error messages if available.
 *
 * @example
 * loginApi({ email: "user@example.com", password: "password123" })
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */
export async function loginApi(payload) {
  const response = await fetch(`${API_BASE_URL}/auth/login?_holidaze=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.errors
        ? data.errors.map((err) => err.message).join(", ")
        : "Login failed.",
    );
  }

  return data;
}

export async function registerApi(payload) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.errors
        ? data.errors.map((err) => err.message).join(", ")
        : "Registration failed.",
    );
  }

  return data;
}
