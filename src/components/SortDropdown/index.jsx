/**
 * SortDropdown component renders a dropdown menu for sorting items.
 *
 * It allows users to choose a sort criterion and order. When a new option is selected,
 * the component splits the value to extract the sort field and order, then calls the
 * respective setter functions.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.sortBy - The current sort field (e.g., "created" or "name").
 * @param {string} props.sortOrder - The current sort order ("asc" or "desc").
 * @param {Function} props.setSortBy - Function to update the sort field.
 * @param {Function} props.setSortOrder - Function to update the sort order.
 * @returns {JSX.Element} The rendered dropdown for sorting.
 */
export default function SortDropdown({
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
}) {
  const handleChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split("-");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="max-w-3xl mx-auto mb-6 text-right">
      <label htmlFor="sort" className="sr-only">
        Sort by
      </label>
      <select
        id="sort"
        className="ring-1 ring-gray-300 border-r-8 border-r-transparent p-3 rounded-md text-gray-700 text-lg"
        value={`${sortBy}-${sortOrder}`}
        onChange={handleChange}
      >
        <option value="created-desc">Latest</option>
        <option value="created-asc">Oldest</option>
        <option value="name-asc">A - Z</option>
        <option value="name-desc">Z - A</option>
      </select>
    </div>
  );
}
