import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  venueSchema,
  singleUrlSchema,
} from "../../validation/validationSchemas";
import SafeImage from "../SafeImage";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { FaStar } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "../Modal";

export default function VenueForm({
  initialValues,
  onSubmit,
  isLoading,
  buttonText,
}) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(venueSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "mediaUrls",
  });

  const [tempImageUrl, setTempImageUrl] = useState("");
  const [tempImageError, setTempImageError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const currentRating = watch("rating") || 0;

  async function handleAddImage() {
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
      setTempImageUrl("");
      setTempImageError("");
    } catch (error) {
      setTempImageError(error.message);
    }
  }

  async function handleImageBlur() {
    if (tempImageUrl.trim() !== "") {
      await handleAddImage();
    }
  }

  const handleFormSubmit = (data) => {
    if (tempImageUrl.trim() !== "") {
      setTempImageError(
        "Please leave the image URL field (or clear it) before submitting.",
      );
      return;
    }
    onSubmit(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.name && <ErrorMessage message={errors.name.message} />}
        </div>

        <div>
          <label className="block font-bold mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
          {errors.description && (
            <ErrorMessage message={errors.description.message} />
          )}
        </div>

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

        <div>
          <label className="block font-bold mb-1">Images</label>
          {fields.length === 0 && (
            <p className="text-gray-600 text-sm mb-2">No images added.</p>
          )}
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col sm:flex-row mb-4">
              <SafeImage
                src={field.url}
                alt="Image Preview"
                fallback="/img/placeholdervenue-3.jpg"
                className="w-24 h-24 object-cover rounded border cursor-pointer"
                onClick={() => setPreviewUrl(field.url)}
              />
              <div className="mt-2 sm:mt-0 sm:ml-4 flex items-center w-full space-x-2">
                <input
                  type="text"
                  {...register(`mediaUrls.${index}.url`)}
                  className="w-full border border-gray-300 p-2 rounded whitespace-normal break-all text-xs sm:text-base"
                  readOnly
                  title={field.url}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>
              {errors.mediaUrls &&
                errors.mediaUrls[index] &&
                errors.mediaUrls[index].url && (
                  <ErrorMessage message={errors.mediaUrls[index].url.message} />
                )}
            </div>
          ))}
        </div>

        <div>
          <label className="block font-bold mb-1">Price per night</label>
          <input
            type="number"
            {...register("price")}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.price && <ErrorMessage message={errors.price.message} />}
        </div>

        <div>
          <label className="block font-bold mb-1">Max Guests</label>
          <input
            type="number"
            {...register("maxGuests")}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.maxGuests && (
            <ErrorMessage message={errors.maxGuests.message} />
          )}
        </div>

        <div>
          <label className="block font-bold mb-1">Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => setValue("rating", star)}
                className={`cursor-pointer text-2xl ${
                  currentRating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          {errors.rating && <ErrorMessage message={errors.rating.message} />}
        </div>

        <div className="space-y-2">
          <span className="block font-bold">Amenities</span>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("meta.wifi")}
              className="mr-2"
            />
            <label>WiFi</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("meta.parking")}
              className="mr-2"
            />
            <label>Parking</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("meta.breakfast")}
              className="mr-2"
            />
            <label>Breakfast</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("meta.pets")}
              className="mr-2"
            />
            <label>Pets Allowed</label>
          </div>
        </div>

        <div className="flex justify-center">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : buttonText}
          </Button>
        </div>
      </form>

      {previewUrl && (
        <Modal isOpen={!!previewUrl} onClose={() => setPreviewUrl(null)}>
          <SafeImage
            src={previewUrl}
            alt="Large Preview"
            fallback="/img/placeholdervenue-3.jpg"
            className="w-full h-auto object-contain"
          />
        </Modal>
      )}
    </>
  );
}
