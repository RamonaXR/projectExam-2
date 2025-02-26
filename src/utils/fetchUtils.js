export async function fetchFn(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    const errorMessage =
      data.errors?.map((err) => err.message).join(", ") ||
      `Server Error (Status: ${response.status})`;
    throw new Error(errorMessage);
  }
  return data;
}
