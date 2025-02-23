import Button from "../Button";

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
