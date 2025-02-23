export default function Button({
  children,
  className = "",
  as: Component = "button",
  ...props
}) {
  const baseClass =
    "bg-button text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-gray-500";
  return (
    <Component className={`${baseClass} ${className}`} {...props}>
      {children}
    </Component>
  );
}
