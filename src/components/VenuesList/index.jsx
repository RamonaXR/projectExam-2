import { Link } from "react-router-dom";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useDeleteVenue } from "../../hooks/useDeleteVenue";

export default function VenuesList({ venues }) {
  const { mutate: deleteVenue, isLoading, error } = useDeleteVenue();

  if (!venues || venues.length === 0) {
    return <p className="text-gray-600">You have no venues.</p>;
  }

  return (
    <div className="space-y-4">
      {error && <ErrorMessage message={error.message} />}
      {venues.map((venue) => (
        <div
          key={venue.id}
          className="border p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <Link to={`/venue/${venue.id}`} className="font-bold text-lg">
              {venue.name}
            </Link>
            <p className="text-gray-600">Price: ${venue.price} / night</p>
          </div>
          <div className="flex space-x-2">
            <Link to={`/venue/${venue.id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Button onClick={() => deleteVenue(venue.id)} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
