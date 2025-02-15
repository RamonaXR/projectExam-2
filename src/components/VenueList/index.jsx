import { useRef, useEffect } from "react";
import VenueCard from "../VenueCard";
import { useVenues } from "../../hooks/useVenues";
import ErrorMessage from "../ErrorMessage";
import SearchBar from "../SearchBar";
import SortDropdown from "../SortDropdown";

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

  // Intersection Observer for infinite scrolling
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
      {/* Search Bar Component */}
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchQuery={setSearchQuery}
      />

      {/* Sort Dropdown */}
      <div className="max-w-3xl mx-auto mb-6 text-right">
        <SortDropdown
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        />
      </div>

      {/* Venue Cards Grid */}
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
