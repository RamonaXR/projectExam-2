import { useState } from "react";
import { validateAndAddImage } from "../../utils/imageUtils";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";

/**
 * ImageInput component renders an input field and button for adding an image URL.
 *
 * It validates the provided image URL using a utility function and appends the image if valid.
 * Displays any validation error using the ErrorMessage component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.id - The unique identifier for the image input element.
 * @param {Function} props.append - Function to append a new image to the images list.
 * @param {Array} props.fields - The current array of image fields.
 * @returns {JSX.Element} The rendered image input component.
 */
export default function ImageInput({ id, append, fields }) {
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [tempImageError, setTempImageError] = useState("");

  /**
   * Validates and adds an image URL.
   *
   * Uses the validateAndAddImage utility function to check if the image URL is valid.
   * If valid, the image is appended and the temporary state is cleared.
   * Otherwise, an error message is set.
   *
   * @async
   * @returns {Promise<void>}
   */
  async function handleAddImage() {
    const error = await validateAndAddImage(
      tempImageUrl,
      setTempImageError,
      append,
      fields,
    );
    if (!error) {
      setTempImageUrl("");
      setTempImageError("");
    } else {
      setTempImageError(error);
    }
  }

  /**
   * Handles the blur event for the image input.
   *
   * If the input field is not empty, it triggers the image addition process.
   *
   * @async
   * @returns {Promise<void>}
   */
  async function handleImageBlur() {
    if (tempImageUrl.trim() !== "") {
      await handleAddImage();
    }
  }

  return (
    <div>
      <div className="flex items-center space-x-2 mb-8">
        <input
          id={id}
          type="text"
          value={tempImageUrl}
          onChange={(e) => setTempImageUrl(e.target.value)}
          onBlur={handleImageBlur}
          placeholder="https://example.com/image.jpg"
          className="w-full border border-gray-400 p-2 rounded text-xs sm:text-base"
        />
        <Button type="button" onClick={handleAddImage}>
          Add
        </Button>
      </div>
      {tempImageError && <ErrorMessage message={tempImageError} />}
    </div>
  );
}
