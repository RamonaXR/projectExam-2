import { API_BASE_URL, API_KEY } from "../constants";

export async function loginApi(payload) {
  console.log("Login payload:", payload);

  const response = await fetch(`${API_BASE_URL}/auth/login?_holidaze=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: API_KEY,
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

  console.log("Login response:", data);
  return data;
}

export async function registerApi(payload) {
  console.log("Registering user with payload:", payload);

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: API_KEY,
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

  console.log("Registration successful. Response data:", data);
  return data;
}
