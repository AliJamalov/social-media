import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { GrLinkPrevious } from "react-icons/gr";

type searchProps = {
  setIsShowSearchResult: (value: boolean) => void;
  setQuery: (value: string) => void;
  isShowSearchResult: boolean;
};

const Searchbar = ({ setIsShowSearchResult, setQuery, isShowSearchResult }: searchProps) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setQuery(searchValue);
  }, [searchValue]);

  return (
    <section className="w-full p-3">
      <div className="relative flex">
        {isShowSearchResult && (
          <button
            onClick={() => setIsShowSearchResult(false)}
            className="bg-blue-500 rounded-md py-2 px-4 text-white mr-3"
          >
            <GrLinkPrevious />
          </button>
        )}
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsShowSearchResult(true)}
          className="w-full bg-white rounded-2xl py-1 px-3 outline-none"
          type="text"
          placeholder="search..."
        />
        <IoSearchOutline size={20} className="absolute top-[20%] right-2" />
      </div>
    </section>
  );
};

export default Searchbar;
