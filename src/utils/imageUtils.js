import { singleUrlSchema } from "../validation/validationSchemas";

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
