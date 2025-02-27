import { useState } from "react";
import { validateAndAddImage } from "../../utils/imageUtils";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";

export default function ImageInput({ append, fields }) {
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [tempImageError, setTempImageError] = useState("");

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

  async function handleImageBlur() {
    if (tempImageUrl.trim() !== "") {
      await handleAddImage();
    }
  }

  return (
    <div>
      <label className="block font-bold mb-1">Add Image (Optional)</label>
      <div className="flex items-center space-x-2 mb-2">
        <input
          type="text"
          value={tempImageUrl}
          onChange={(e) => setTempImageUrl(e.target.value)}
          onBlur={handleImageBlur}
          placeholder="https://example.com/image.jpg"
          className="w-full border border-gray-300 p-2 rounded text-xs sm:text-base"
        />
        <Button type="button" onClick={handleAddImage}>
          Add
        </Button>
      </div>
      {tempImageError && <ErrorMessage message={tempImageError} />}
    </div>
  );
}
