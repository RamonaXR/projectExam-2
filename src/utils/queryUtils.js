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
