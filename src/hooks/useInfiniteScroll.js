import { useEffect, useRef } from "react";

/**
 * Custom hook that sets up an infinite scrolling observer.
 *
 * This hook creates an IntersectionObserver that watches a DOM element (provided via the returned ref)
 * and calls the `fetchNextPage` function when the element is fully visible (threshold of 1)
 * and there is a next page available (`hasNextPage` is true). The observer is cleaned up on unmount.
 *
 * @param {Function} fetchNextPage - Callback function to fetch the next page of data.
 * @param {boolean} hasNextPage - Flag indicating whether there is a next page to load.
 * @returns {React.MutableRefObject} A ref to be attached to the element that triggers infinite scrolling.
 *
 * @example
 * const observerRef = useInfiniteScroll(fetchNextPage, hasNextPage);
 *
 * return (
 *   <div ref={observerRef}>
 *     {isFetchingNextPage && <p>Loading more items...</p>}
 *   </div>
 * );
 */
export function useInfiniteScroll(fetchNextPage, hasNextPage) {
  const observerRef = useRef();

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

  return observerRef;
}
