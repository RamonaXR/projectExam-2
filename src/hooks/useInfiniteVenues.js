import { useInfiniteQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";

const fetchVenues = async ({ pageParam = 1 }) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/holidaze/venues?_owner=true&page=${pageParam}&limit=10`,
    );

    const data = await response.json();

    console.log("Fetched Venues Data:", data);

    if (!response.ok) {
      return {
        error:
          data.errors?.map((err) => err.message).join(", ") ||
          `Server Error (Status: ${response.status})`,
      };
    }

    return data;
  } catch {
    return { error: "Network error. Please check your connection." };
  }
};

export const useInfiniteVenues = () => {
  return useInfiniteQuery({
    queryKey: ["venues"],
    queryFn: fetchVenues,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.error) return undefined; // Stop fetching if an error occurs
      return lastPage.meta?.isLastPage ? undefined : pages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
