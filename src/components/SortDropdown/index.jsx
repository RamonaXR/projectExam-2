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
      <select
        className="border border-gray-300 p-3 rounded-md text-gray-700 text-lg"
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
