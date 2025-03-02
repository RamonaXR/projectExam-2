import Button from "../Button";

/**
 * SearchBar component renders a search input field along with a search button.
 *
 * It allows users to enter a search term to look for venues and triggers a search
 * either on pressing the Enter key or by clicking the search button.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.searchInput - The current value of the search input field.
 * @param {Function} props.setSearchInput - Function to update the search input state.
 * @param {Function} props.setSearchQuery - Function to set the search query and trigger a search.
 * @returns {JSX.Element} The rendered search bar component.
 */
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
