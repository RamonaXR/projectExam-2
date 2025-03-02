import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

/**
 * Retrieves authentication headers for API requests.
 *
 * This function gets the current user's access token from the auth store and returns
 * an object containing the required headers for API requests, including the API key and,
 * if available, the Authorization header.
 *
 * @returns {Object} An object with headers for API requests.
 *
 * @example
 * const headers = getAuthHeaders();
 * // { "Content-Type": "application/json", "X-Noroff-API-Key": "your-api-key", Authorization: "Bearer token" }
 */
function getAuthHeaders() {
  const token = useAuthStore.getState().userProfile?.accessToken;
  return {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/**
 * Formats venue data to match the API payload requirements.
 *
 * This function takes raw venue data from a form or similar source and converts it
 * into the correct format expected by the API. It handles conversion of media URLs,
 * numbers for price, maxGuests, and rating, and ensures boolean values for meta fields.
 *
 * @param {Object} venueData - The raw venue data.
 * @param {string} venueData.name - The name of the venue.
 * @param {string} venueData.description - The venue description.
 * @param {Array} venueData.mediaUrls - An array of objects containing image URLs.
 * @param {string|number} venueData.price - The price per night.
 * @param {string|number} venueData.maxGuests - The maximum number of guests.
 * @param {string|number} venueData.rating - The venue rating.
 * @param {Object} venueData.meta - An object containing meta information about the venue.
 * @param {boolean} [venueData.meta.wifi] - Whether the venue has WiFi.
 * @param {boolean} [venueData.meta.parking] - Whether the venue offers parking.
 * @param {boolean} [venueData.meta.breakfast] - Whether breakfast is included.
 * @param {boolean} [venueData.meta.pets] - Whether pets are allowed.
 * @returns {Object} The formatted venue payload.
 *
 * @example
 * const payload = formatVenuePayload(formData);
 */
function formatVenuePayload(venueData) {
  return {
    name: venueData.name,
    description: venueData.description,
    media:
      venueData.mediaUrls && venueData.mediaUrls.length > 0
        ? venueData.mediaUrls.map((item) => ({
            url: item.url,
            alt: "Venue image",
          }))
        : [],
    price: Number(venueData.price),
    maxGuests: Number(venueData.maxGuests),
    rating: Number(venueData.rating) || 0,
    meta: {
      wifi: venueData.meta?.wifi || false,
      parking: venueData.meta?.parking || false,
      breakfast: venueData.meta?.breakfast || false,
      pets: venueData.meta?.pets || false,
    },
  };
}

/**
 * Sends a POST request to create a new venue.
 *
 * This function formats the provided venue data into the required API payload and
 * sends a POST request to the venues endpoint. If the response is not successful,
 * it throws an error with a concatenated error message.
 *
 * @param {Object} venueData - The venue data to be sent.
 * @returns {Promise<Object>} A promise that resolves with the API response data.
 *
 * @throws {Error} Throws an error if the API response is not ok.
 *
 * @example
 * addVenue(venueData)
 *   .then(data => console.log("Venue added", data))
 *   .catch(error => console.error(error));
 */
export async function addVenue(venueData) {
  const response = await fetch(`${API_BASE_URL}/holidaze/venues`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(formatVenuePayload(venueData)),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.errors
        ? data.errors.map((err) => err.message).join(", ")
        : "Venue creation failed",
    );
  }
  return data;
}

/**
 * Sends a PUT request to update an existing venue.
 *
 * This function accepts a venueId and the updated venue data, formats the data according to
 * API requirements, and sends a PUT request to update the venue. If the API call fails,
 * it throws an error with the corresponding error messages.
 *
 * @param {Object} param0 - An object containing the venueId and the updated venue data.
 * @param {string|number} param0.venueId - The unique identifier of the venue to update.
 * @param {Object} param0.venueData - The updated venue data.
 * @returns {Promise<Object>} A promise that resolves with the updated venue data from the API.
 *
 * @throws {Error} Throws an error if the API response is not ok.
 *
 * @example
 * editVenue({ venueId: "123", name: "Updated Venue", ... })
 *   .then(data => console.log("Venue updated", data))
 *   .catch(error => console.error(error));
 */

export async function editVenue({ venueId, ...venueData }) {
  const response = await fetch(`${API_BASE_URL}/holidaze/venues/${venueId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(formatVenuePayload(venueData)),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.errors
        ? data.errors.map((err) => err.message).join(", ")
        : "Venue update failed",
    );
  }
  return data;
}
