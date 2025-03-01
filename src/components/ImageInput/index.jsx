import { useState } from "react";
import { validateAndAddImage } from "../../utils/imageUtils";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";

export default function ImageInput({ id, append, fields }) {
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
