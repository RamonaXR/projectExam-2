import { useRef, useEffect } from "react";
import VenueCard from "../VenueCard";
import { useVenues } from "../../hooks/useVenues";
import ErrorMessage from "../ErrorMessage";

export default function VenueList() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    searchInput,
    setSearchInput,
    setSearchQuery,
  } = useVenues();

  const observerRef = useRef();

  // Set up Intersection Observer for infinite scrolling
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

  if (isLoading)
    return <div className="text-center text-lg mt-4">Loading venues...</div>;
  if (isError)
    return <ErrorMessage message={error.message} onRetry={refetch} />;

  return (
    <div className="container mx-auto p-6">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-4">
        <div className="w-full flex flex-col sm:flex-row items-stretch gap-2">
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded-md text-lg min-w-0"
            placeholder="Search venues..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSearchQuery(searchInput)}
          />
          <button
            className="bg-button text-white px-5 py-3 rounded-md text-lg whitespace-nowrap"
            onClick={() => setSearchQuery(searchInput)}
          >
            Search
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mb-6 text-right">
        <select
          className="border border-gray-300 p-3 rounded-md text-gray-700 text-lg"
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [newSortBy, newSortOrder] = e.target.value.split("-");
            setSortBy(newSortBy);
            setSortOrder(newSortOrder);
          }}
        >
          <option value="created-desc">Latest</option>
          <option value="created-asc">Oldest</option>
          <option value="name-asc">A - Z</option>
          <option value="name-desc">Z - A</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.pages
          .flatMap((page) => page.data)
          .map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
      </div>
      {/* Infinite Scroll Trigger */}
      <div
        ref={observerRef}
        className="h-12 flex justify-center items-center mt-6"
      >
        {isFetchingNextPage && (
          <span className="text-lg">Loading more venues...</span>
        )}
      </div>
    </div>
  );
}
