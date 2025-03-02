import VenueCard from "../VenueCard";
import { useVenues } from "../../hooks/useVenues";
import ErrorMessage from "../ErrorMessage";
import SearchBar from "../SearchBar";
import SortDropdown from "../SortDropdown";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import Loader from "../Loader";

/**
 * VenueList component renders a list of venue cards with search and sorting functionality.
 *
 * It uses the `useVenues` hook to fetch venue data with support for infinite scrolling,
 * sorting, and searching. The component displays a search bar, a sort dropdown, a grid of venue cards,
 * and handles loading and error states.
 *
 * @component
 * @returns {JSX.Element} The rendered venue list component.
 */
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

  const observerRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (isLoading) {
    return <Loader />;
  }
  if (isError)
    return <ErrorMessage message={error.message} onRetry={refetch} />;

  return (
    <div className="container mx-auto p-6">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchQuery={setSearchQuery}
      />

      <div className="max-w-3xl mx-auto mb-6 text-right">
        <SortDropdown
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.pages
          .flatMap((page) => page.data)
          .map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
      </div>

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
