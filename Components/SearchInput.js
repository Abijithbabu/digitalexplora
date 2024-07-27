import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function SearchInput({ ...props }) {
  return (
    <div className="searchInput">
      <MagnifyingGlassIcon className="w-4 h-4 mr-2 text-gray-800" />
      <input
        type="text"
        {...props}
        className="bg-transparent focus:outline-none border-none flex-1"
      />
    </div>
  );
}

export default SearchInput;
