import { useContext, useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";

const PurpleHeader = () => {
  // global state
  const appContext = useContext(AppContext);
  const appDispatch = appContext.appDispatch;

  // local state
  const [keyword, setKeyword] = useState("");

  const submit = () => {
    appDispatch({ type: "SET_SEARCH_KEYWORD", payload: keyword });
  };

  return (
    <header className="fixed z-10 inset-x-0 top-0 box-between bg-purple-900 py-3 px-6">
      <Link
        to="/"
        className="hidden md:block text-center md:text-xl text-white"
      >
        B3k3n App
      </Link>

      <div className="box-center gap-x-4">
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

        <Link to="/bookmark" className="w-10 h-10 box-center" title="Bookmark">
          <IconContext.Provider
            value={{
              color: "white",
            }}
          >
            <FaBookmark />
          </IconContext.Provider>
        </Link>
      </div>
    </header>
  );
};

export default PurpleHeader;
