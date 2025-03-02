import Button from "../Button";

/**
 * ErrorMessage component displays an error message and an optional retry button.
 *
 * The component shows the provided error message in red text. If the `onRetry`
 * callback is provided, a "Retry" button is rendered to allow users to retry the failed action.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.message - The error message to display.
 * @param {Function} [props.onRetry] - Optional callback function to execute when the retry button is clicked.
 * @returns {JSX.Element} The rendered error message component.
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="text-center text-red-500">
      <p>{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4">
          Retry
        </Button>
      )}
    </div>
  );
}
