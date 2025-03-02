import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueSchema } from "../../validation/validationSchemas";
import SafeImage from "../SafeImage";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import Modal from "../Modal";
import AmenitiesCheckboxes from "../AmenitiesCheckboxes";
import StarRating from "../StarRating";
import ImageInput from "../ImageInput";
import { AiOutlineClose } from "react-icons/ai";

/**
 * VenueForm component renders a form to create or update a venue.
 *
 * The form includes fields for the venue's name, description, images, price per night, maximum guests, rating,
 * and amenities. It leverages react-hook-form with Yup validation for managing form state.
 * Users can add images via an ImageInput component, preview and remove images, set the venue rating,
 * and select various amenities.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.initialValues - The initial values for the form fields.
 * @param {Function} props.onSubmit - Callback function to be invoked when the form is submitted.
 * @param {boolean} props.isLoading - Indicates whether the form submission is in progress.
 * @param {string} props.buttonText - The text to display on the submit button.
 * @returns {JSX.Element} The rendered venue form.
 */
export default function VenueForm({
  initialValues,
  onSubmit,
  isLoading,
  buttonText,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(venueSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "mediaUrls",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  /**
   * Opens the preview modal to display the selected image.
   *
   * @param {string} imageUrl - The URL of the image to preview.
   */
  const openPreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setIsPreviewModalOpen(true);
  };

  /**
   * Closes the image preview modal and clears the preview image.
   */
  const closePreview = () => {
    setIsPreviewModalOpen(false);
    setPreviewImage(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="venue-name" className="block font-bold">
          Name
        </label>
        <input
          id="venue-name"
          type="text"
          placeholder="Enter venue name"
          {...register("name")}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.name && <ErrorMessage message={errors.name.message} />}
      </div>

      <div>
        <label htmlFor="venue-description" className="block font-bold">
          Description
        </label>
        <textarea
          id="venue-description"
          placeholder="Enter venue description"
          {...register("description")}
          className="w-full border border-gray-300 p-2 rounded"
        ></textarea>
        {errors.description && (
          <ErrorMessage message={errors.description.message} />
        )}
      </div>

      <div>
        <label htmlFor="image-input" className="block font-bold">
          Add Images (Optional)
        </label>
        <ImageInput id="image-input" append={append} fields={fields} />
        {errors.mediaUrls && (
          <ErrorMessage message={errors.mediaUrls.message} />
        )}
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative p-2 border border-primary rounded shadow"
          >
            <SafeImage
              src={field.url}
              alt={`Image ${index + 1}`}
              fallback="/img/placeholdervenue-3.jpg"
              className="w-24 h-24 object-cover rounded cursor-pointer"
              onClick={() => openPreview(field.url)}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2"
            >
              <AiOutlineClose
                size={24}
                className="text-red-600 bg-white rounded-full p-1"
              />
            </button>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="venue-price" className="block font-bold">
          Price/ Night
        </label>
        <input
          id="venue-price"
          type="number"
          placeholder="Enter price per night"
          {...register("price")}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.price && <ErrorMessage message={errors.price.message} />}
      </div>

      <div>
        <label htmlFor="venue-maxGuests" className="block font-bold">
          Max Guests
        </label>
        <input
          id="venue-maxGuests"
          type="number"
          placeholder="Enter maximum guests"
          {...register("maxGuests")}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.maxGuests && (
          <ErrorMessage message={errors.maxGuests.message} />
        )}
      </div>

      <div>
        <span className="block font-bold mb-1">Rating</span>
        <Controller
          control={control}
          name="rating"
          render={({ field: { value, onChange } }) => (
            <StarRating
              id="venue-rating"
              rating={value || 0}
              setRating={onChange}
            />
          )}
        />
        {errors.rating && <ErrorMessage message={errors.rating.message} />}
      </div>

      <div>
        <AmenitiesCheckboxes register={register} />
      </div>

      <div className="text-center">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : buttonText}
        </Button>
      </div>

      <Modal isOpen={isPreviewModalOpen} onClose={closePreview}>
        {previewImage && (
          <SafeImage
            src={previewImage}
            alt="Preview"
            fallback="/img/placeholdervenue-3.jpg"
            className="w-full h-auto"
          />
        )}
      </Modal>
    </form>
  );
}
