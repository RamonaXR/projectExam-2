/**
 * Fetches data from a given URL and returns the parsed JSON response.
 *
 * This function performs a GET request to the specified URL and attempts to parse
 * the response as JSON. If the response is not successful (i.e., response.ok is false),
 * it throws an error with a message constructed from the API's error messages or a generic
 * server error message including the status code.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} The JSON data retrieved from the URL.
 * @throws {Error} Throws an error if the response status is not ok.
 *
 * @example
 * fetchFn("https://api.example.com/data")
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */
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
