/**
 * Updates the URL search parameters based on sorting and search query values.
 *
 * This function constructs a query parameter object containing the sort field, sort order,
 * and search query if they are provided, and then calls the provided setSearchParams function
 * to update the URL accordingly.
 *
 * @param {Function} setSearchParams - Function to update the URL search parameters (typically from react-router).
 * @param {string} sortBy - The field to sort by.
 * @param {string} sortOrder - The order of sorting (e.g., "asc" or "desc").
 * @param {string} searchQuery - The search query string.
 */
export function updateSearchParams(
  setSearchParams,
  sortBy,
  sortOrder,
  searchQuery,
) {
  const params = {};
  if (sortBy) params.sort = sortBy;
  if (sortOrder) params.sortOrder = sortOrder;
  if (searchQuery) params.q = searchQuery;

  setSearchParams(params);
}
