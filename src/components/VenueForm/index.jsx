import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueSchema } from "../../validation/validationSchemas";
import SafeImage from "../SafeImage";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { AiOutlineClose } from "react-icons/ai";
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

  const [previewUrl, setPreviewUrl] = useState(null);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <ImageInput append={append} fields={fields} />

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
                  className="w-full border border-gray-300 p-2 rounded"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>
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

        <StarRating register={register} setValue={setValue} watch={watch} />

        <AmenitiesCheckboxes register={register} />

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
            className="w-full h-auto object-contain"
          />
        </Modal>
      )}
    </>
  );
}
