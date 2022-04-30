import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

const PurpleBox = () => {
  return (
    <header className="w-full box-between bg-purple-900 py-3 px-6">
      <h1 className="text-center text-xl text-white">B3k3n App</h1>

      <div className="box-center">
        <div className="relative">
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
          />
        </div>
      </div>
    </header>
  );
};

export default PurpleBox;
