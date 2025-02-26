import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
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

export const venueSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  mediaUrl: yup.string().url("Must be a valid URL").nullable(),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  maxGuests: yup
    .number()
    .typeError("Max guests must be a number")
    .required("Max guests is required")
    .min(1, "At least 1 guest is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
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
