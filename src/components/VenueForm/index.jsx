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

  const { fields, append } = useFieldArray({
    control,
    name: "mediaUrls",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const openPreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setIsPreviewModalOpen(true);
  };

  const closePreview = () => {
    setIsPreviewModalOpen(false);
    setPreviewImage(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-bold">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.name && <ErrorMessage message={errors.name.message} />}
      </div>

      <div>
        <label htmlFor="description" className="block font-bold">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full border border-gray-300 p-2 rounded"
        ></textarea>
        {errors.description && (
          <ErrorMessage message={errors.description.message} />
        )}
      </div>

      <div>
        <ImageInput append={append} fields={fields} />
        {errors.mediaUrls && (
          <ErrorMessage message={errors.mediaUrls.message} />
        )}
      </div>

      {fields.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="cursor-pointer"
              onClick={() => openPreview(field.url)}
            >
              <SafeImage
                src={field.url}
                alt={`Image ${index + 1}`}
                fallback="/img/placeholdervenue-3.jpg"
                className="w-full h-20 object-cover rounded"
              />
            </div>
          ))}
        </div>
      )}

      <div>
        <label htmlFor="price" className="block font-bold">
          Price
        </label>
        <input
          id="price"
          type="text"
          {...register("price")}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.price && <ErrorMessage message={errors.price.message} />}
      </div>

      <div>
        <label htmlFor="maxGuests" className="block font-bold">
          Max Guests
        </label>
        <input
          id="maxGuests"
          type="text"
          {...register("maxGuests")}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.maxGuests && (
          <ErrorMessage message={errors.maxGuests.message} />
        )}
      </div>

      <div>
        <label className="block font-bold mb-1">Rating</label>
        <Controller
          control={control}
          name="rating"
          render={({ field: { value, onChange } }) => (
            <StarRating rating={value || 0} setRating={onChange} />
          )}
        />
        {errors.rating && <ErrorMessage message={errors.rating.message} />}
      </div>

      <div>
        <AmenitiesCheckboxes register={register} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : buttonText}
        </Button>
      </div>

      <Modal
        isOpen={isPreviewModalOpen}
        onClose={closePreview}
        title="Image Preview"
      >
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
