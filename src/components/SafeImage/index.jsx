export default function SafeImage({ src, alt, fallback, className, ...props }) {
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = fallback;
  };

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
