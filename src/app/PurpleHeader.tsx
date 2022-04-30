import { useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

type PurpleHeaderType = {
  updateKeyword: (keyword: string) => void;
};

const PurpleHeader = ({ updateKeyword }: PurpleHeaderType) => {
  const [keyword, setKeyword] = useState("");

  const submit = () => {
    updateKeyword(keyword);
  };

  return (
    <header className="fixed z-10 inset-x-0 top-0 box-between bg-purple-900 py-3 px-6">
      <h1 className="text-center md:text-xl text-white">B3k3n App</h1>

      <div className="hidden md:flex items-center justify-center">
        <form className="relative">
          <div className="absolute left-2 inset-y-0 box-center">
            <IconContext.Provider
              value={{
                color: "gray",
              }}
            >
              <FaSearch />
            </IconContext.Provider>
          </div>

          <input
            type="text"
            className="rounded-lg focus:outline-none py-2 pl-8 pr-2"
            placeholder="Search Atomic Habits"
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button
            className="hidden"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              submit();
            }}
          />
        </form>
      </div>

      <button className="md:hidden">
        <IconContext.Provider
          value={{
            color: "white",
          }}
        >
          <FaSearch />
        </IconContext.Provider>
      </button>
    </header>
  );
};

export default PurpleHeader;
