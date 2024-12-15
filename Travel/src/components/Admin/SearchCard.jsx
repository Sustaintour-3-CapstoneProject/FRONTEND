import { useState } from "react";
import { TextInput } from "flowbite-react";
import { FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const SearchCard = ({
  topic,
  onSearch,
  placeholder = "Search",
  create = false,
  addText = "Add Content",
  link,
}) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(search);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full rounded-3xl shadow-lg border border-[#D4D4D4] bg-white">
      <div className="p-6">
        <div className="space-y-3 mb-6">
          <h2 className="text-2xl font-bold capitalize">{topic} Management</h2>
          <p className="text-sm">Manage {topic} data easily and efficiently</p>
        </div>
        <div className="flex flex-row flex-wrap xl:flex-nowrap gap-4 items-center w-full">
          <div className="flex flex-row gap-4 w-full">
            <TextInput
              id="search"
              type="text"
              icon={IoIosSearch}
              placeholder={placeholder}
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              className="p-2 px-3 text-white font-bold text-2xl bg-[#0EA5E9] rounded-lg hover:bg-[#0284C7] transition-colors"
            >
              <IoIosSearch />
            </button>
          </div>
          {create && (
            <Link
              to={link}
              className="flex items-center gap-3 cursor-pointer border border-[#D4D4D4] h-full xl:w-[20%] w-full px-4 py-2 rounded-lg text-[#0EA5E9]"
            >
              <FaPlus /> {addText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
