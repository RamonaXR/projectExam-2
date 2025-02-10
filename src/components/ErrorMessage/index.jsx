export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="text-center text-red-500">
      <p>{message}</p>
      <button
        onClick={onRetry}
        className="bg-button text-white px-4 py-2 mt-4 rounded"
      >
        Retry
      </button>
    </div>
  );
}
