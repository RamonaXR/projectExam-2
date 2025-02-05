import { useRef, useEffect } from "react";
import VenueCard from "../VenueCard";
import { useInfiniteVenues } from "../../hooks/useInfiniteVenues";

export default function VenueList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteVenues();

  const observerRef = useRef();

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <div className="text-center">Loading venues...</div>;

  const errorMessage = data?.pages.find((page) => page.error)?.error;
  if (errorMessage)
    return (
      <div className="text-center text-red-500">
        <p>{errorMessage}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-button text-white px-4 py-2 mt-4 rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.pages.map((page) =>
          page.data.map((venue) => <VenueCard key={venue.id} venue={venue} />),
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={observerRef} className="h-10 flex justify-center items-center">
        {isFetchingNextPage && <span>Loading more venues...</span>}
      </div>
    </div>
  );
}
