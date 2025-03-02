import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchFn } from "../utils/fetchUtils";
import { updateSearchParams } from "../utils/queryUtils";
import { API_BASE_URL } from "../constants";

/**
 * Custom hook to fetch venues with infinite scrolling, sorting, and search filtering.
 *
 * This hook leverages react-query's useInfiniteQuery to fetch venue data from an API endpoint
 * that supports pagination. It also manages local state for sorting and search, and synchronizes
 * these values with the URL's search parameters using react-router's useSearchParams.
 *
 * The hook constructs the API endpoint dynamically based on the current search query and sorting
 * options, and returns the query object along with state values and setters for sortBy, sortOrder,
 * searchInput, and searchQuery.
 *
 * @returns {object} An object containing:
 *   - All properties returned by useInfiniteQuery (e.g., data, isLoading, isError, fetchNextPage, etc.)
 *   - sortBy {string}: The current field used for sorting venues.
 *   - setSortBy {Function}: Function to update the sortBy state.
 *   - sortOrder {string}: The current sort order ("asc" or "desc").
 *   - setSortOrder {Function}: Function to update the sortOrder state.
 *   - searchInput {string}: The current search input value.
 *   - setSearchInput {Function}: Function to update the searchInput state.
 *   - setSearchQuery {Function}: Function to update the search query and trigger a refetch.
 *
 * @example
 * const {
 *   data,
 *   isLoading,
 *   isError,
 *   fetchNextPage,
 *   sortBy,
 *   setSortBy,
 *   sortOrder,
 *   setSortOrder,
 *   searchInput,
 *   setSearchInput,
 *   setSearchQuery
 * } = useVenues();
 */
export function useVenues() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "created");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("order") || "desc",
  );
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    updateSearchParams(setSearchParams, sortBy, sortOrder, searchQuery);
  }, [sortBy, sortOrder, searchQuery, setSearchParams]);

  const getEndpoint = (pageParam = 1) => {
    const baseUrl = `${API_BASE_URL}/holidaze/venues${searchQuery ? "/search" : ""}`;
    const queryParams = new URLSearchParams({
      ...(searchQuery && { q: searchQuery }),
      sort: sortBy,
      sortOrder: sortOrder,
      _owner: "true",
      limit: "10",
      page: pageParam.toString(),
    });
    return `${baseUrl}?${queryParams.toString()}`;
  };

  const query = useInfiniteQuery({
    queryKey: ["venues", sortBy, sortOrder, searchQuery],
    queryFn: ({ pageParam = 1 }) => fetchFn(getEndpoint(pageParam)),
    getNextPageParam: (lastPage) =>
      lastPage.meta?.isLastPage
        ? undefined
        : lastPage.meta.nextPage || lastPage.meta.currentPage + 1,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    searchInput,
    setSearchInput,
    setSearchQuery,
  };
}
