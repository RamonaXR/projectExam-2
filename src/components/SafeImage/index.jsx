/**
 * SafeImage component renders an image element that falls back to a specified image if the original fails to load.
 *
 * It checks for a valid `src` prop and uses the `fallback` image if `src` is not provided or if an error occurs during loading.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.src - The source URL for the image.
 * @param {string} props.alt - The alternative text for the image.
 * @param {string} props.fallback - The fallback image URL to use if the original fails to load.
 * @param {string} [props.className] - Additional CSS classes to apply to the image element.
 * @param {Object} [props.rest] - Any additional props to be passed to the image element.
 * @returns {JSX.Element} The rendered image element with fallback functionality.
 */
export default function SafeImage({ src, alt, fallback, className, ...props }) {
  const imageSrc = src || fallback;

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = fallback;
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
