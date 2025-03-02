import Button from "../Button";

export default function SearchBar({
  searchInput,
  setSearchInput,
  setSearchQuery,
}) {
  return (
    <div className="max-w-3xl mx-auto mb-4 text-center">
      <label
        htmlFor="search-input"
        className="text-gray-700 text-xl font-bold mb-2 block"
      >
        Search for venue:
      </label>
      <div className="w-full flex flex-col sm:flex-row items-stretch gap-2">
        <input
          id="search-input"
          type="text"
          className="w-full border border-gray-300 p-3 rounded-md text-lg min-w-0"
          placeholder="Search venues..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setSearchQuery(searchInput)}
        />
        <Button onClick={() => setSearchQuery(searchInput)}>Search</Button>
      </div>
    </div>
  );
}
