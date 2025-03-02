/**
 * Button component renders a styled button element or a custom component.
 *
 * This component applies a default set of styles and allows additional styling
 * through the `className` prop. It also supports rendering as a different element
 * by using the `as` prop.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {string} [props.className=""] - Additional CSS classes to apply.
 * @param {string|React.ElementType} [props.as="button"] - The element type to render. Defaults to "button".
 * @param {Object} [props.rest] - Additional props that are passed to the rendered component.
 * @returns {JSX.Element} The rendered button component.
 */

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
