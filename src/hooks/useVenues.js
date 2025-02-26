import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchFn } from "../utils/fetchUtils";
import { updateSearchParams } from "../utils/queryUtils";
import { API_BASE_URL } from "../constants";

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
