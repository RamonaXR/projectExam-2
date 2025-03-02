import * as yup from "yup";

/**
 * Schema for user login.
 *
 * Validates that:
 * - email is a valid email ending with "@stud.noroff.no" and is required.
 * - password is at least 8 characters long and is required.
 *
 * @type {yup.ObjectSchema}
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .test("is-stud-email", "Email must be a @stud.noroff.no email", (value) =>
      value ? value.toLowerCase().endsWith("@stud.noroff.no") : false,
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

/**
 * Schema for user registration.
 *
 * Validates that:
 * - name is provided.
 * - email is a valid email ending with "@stud.noroff.no" and is required.
 * - password is at least 8 characters long and is required.
 * - avatarUrl is a valid URL and is required.
 * - bio is optional and cannot exceed 160 characters.
 *
 * @type {yup.ObjectSchema}
 */
export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .test("is-stud-email", "Email must be a @stud.noroff.no email", (value) =>
      value ? value.toLowerCase().endsWith("@stud.noroff.no") : false,
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  avatarUrl: yup
    .string()
    .url("Must be a valid URL")
    .required("Avatar URL is required"),
  bio: yup.string().max(160, "Bio must be 160 characters or less"),
});

/**
 * Schema for validating a single image URL.
 *
 * Ensures that the URL field is provided and is a valid URL.
 *
 * @type {yup.ObjectSchema}
 */
export const singleUrlSchema = yup.object().shape({
  url: yup
    .string()
    .required("URL is required")
    .url("Must be a valid image URL"),
});

/**
 * Schema for venue creation or editing.
 *
 * Validates that:
 * - name and description are required.
 * - mediaUrls, if provided, must be an array of objects with a valid URL each and no more than 8 items.
 * - price is a required number between 0 and 10,000.
 * - maxGuests is a required number between 1 and 100.
 * - rating is a number between 0 and 5 (can be null).
 * - meta is an object with boolean fields for wifi, parking, breakfast, and pets.
 *
 * @type {yup.ObjectSchema}
 */
export const venueSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  mediaUrls: yup
    .array()
    .of(
      yup.object().shape({
        url: yup
          .string()
          .trim()
          .required("Image URL is required")
          .url("Must be a valid URL"),
      }),
    )
    .max(8, "You can only add up to 8 images")
    .optional(),
  price: yup
    .number()
    .typeError("Price is required")
    .required("Price is required")
    .min(0, "Price cannot be negative")
    .max(10000, "Price cannot exceed 10,000"),
  maxGuests: yup
    .number()
    .typeError("Max guests is required")
    .required("Max guests is required")
    .min(1, "At least 1 guest is required")
    .max(100, "Max guests cannot exceed 100"),
  rating: yup
    .number()
    .typeError("Please select a rating")
    .min(0, "Rating must be at least 0")
    .max(5, "Rating cannot exceed 5")
    .nullable(),
  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
});

/**
 * Schema for booking a venue.
 *
 * Validates that:
 * - startDate is a required date.
 * - endDate is a required date that must be the same or later than the startDate.
 * - guests is a required number between 1 and 100.
 *
 * @type {yup.ObjectSchema}
 */
export const bookingSchema = yup.object().shape({
  startDate: yup.date().required("Select a start date"),
  endDate: yup
    .date()
    .required("Select an end date")
    .min(yup.ref("startDate"), "End date must be after start date"),
  guests: yup
    .number()
    .required("Number of guests is required")
    .min(1, "At least one guest is required")
    .max(100, "Maximum 100 guests allowed"),
});
