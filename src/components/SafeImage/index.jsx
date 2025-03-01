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
