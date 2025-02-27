import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

function getAuthHeaders() {
  const token = useAuthStore.getState().userProfile?.accessToken;
  return {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

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
