import { singleUrlSchema } from "../validation/validationSchemas";

/**
 * Validates a temporary image URL and appends it to the fields array if valid.
 *
 * This function trims the provided URL and checks if it is non-empty. If non-empty,
 * it uses the `singleUrlSchema` to validate the URL. If the URL is valid and the current
 * number of image fields is less than 8, the URL is appended to the fields array.
 * If the URL is invalid or there are already 8 images, an appropriate error message is set.
 *
 * @param {string} tempImageUrl - The temporary image URL input by the user.
 * @param {Function} setTempImageError - Function to update the temporary image error state.
 * @param {Function} append - Function to append a new image to the list of fields.
 * @param {Array} fields - The current array of image fields.
 * @returns {Promise<string>} A promise that resolves to an empty string if successful,
 * or an error message string if validation fails.
 *
 * @example
 * const errorMessage = await validateAndAddImage(url, setError, append, fields);
 * if (errorMessage) {
 *   // Handle error
 * }
 */
export async function validateAndAddImage(
  tempImageUrl,
  setTempImageError,
  append,
  fields,
) {
  const trimmedUrl = tempImageUrl.trim();
  if (!trimmedUrl) {
    setTempImageError("");
    return;
  }
  try {
    await singleUrlSchema.validate({ url: trimmedUrl });
    if (fields.length >= 8) {
      setTempImageError("You can add at most 8 images");
      return;
    }
    append({ url: trimmedUrl });
    return "";
  } catch (error) {
    return error.message;
  }
}
