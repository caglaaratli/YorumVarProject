import Icon from "react-icomoon";
import iconSet from "../assets/selection.json"; // IcoMoon'dan alınan selection.json dosyasının yolu

const SearchBar = () => {
  return (
    <div className="flex justify-center items-center mt-10 mb-5">
      <div className="flex items-center bg-white rounded-full shadow-lg">
        <div className="p-4">
          <Icon iconSet={iconSet} icon="search" className="w-6 h-6" />
        </div>
        <input
          type="text"
          className="px-4 py-3 w-full sm:w-64 focus:outline-none rounded-full"
          placeholder="Search product"
        />

        <button className="flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-white rounded-full py-4 px-8 ml-2">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
