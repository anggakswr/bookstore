import { useEffect, useState, useContext } from "react";
import { IconContext } from "react-icons";
import { FaBookmark } from "react-icons/fa";
import { AppContext } from "../../context/AppContextProvider";

export type BookItem = {
  id: number;
  cover_url: string;
  title: string;
};

type BookPropType = {
  book: BookItem;
  updateBookmarkPage?: (id: number) => void;
};

const Book = ({ book, updateBookmarkPage }: BookPropType) => {
  // global state
  const appContext = useContext(AppContext);
  const appDispatch = appContext.appDispatch;

  // local stage
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarksJson = localStorage.getItem("bookmarks");

    if (bookmarksJson) {
      // if localstorage is not empty
      const bookmarks = JSON.parse(bookmarksJson); // arr or existing bookmarks
      const bookIsBookmarked = bookmarks.find(
        (bookmark: BookItem) => bookmark.id === book.id
      );

      setIsBookmarked(bookIsBookmarked ? true : false);
    } else {
      setIsBookmarked(false);
    }
  }, [book.id]);

  const toggleBookmark = () => {
    const bookmarksJson = localStorage.getItem("bookmarks");

    if (!bookmarksJson) {
      // if localstorage empty
      localStorage.setItem("bookmarks", JSON.stringify([book]));
    } else {
      // if localstorage is not empty
      const bookmarks = JSON.parse(bookmarksJson); // arr or existing bookmarks
      const bookIsBookmarked = bookmarks.find(
        (bookmark: BookItem) => bookmark.id === book.id
      );

      let newBookmarks: BookItem[] = [];

      if (bookIsBookmarked) {
        // remove bookmark
        newBookmarks = bookmarks.filter(
          (bookmark: BookItem) => bookmark.id !== book.id
        );
        setIsBookmarked(false);
      } else {
        // add a new bookmark
        newBookmarks = [...bookmarks, book];
        setIsBookmarked(true);

        // trigger animate-ping in PurpleHeader
        appDispatch({ type: "SET_BOOKMARK_PING", payload: true });
      }

      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    }

    if (updateBookmarkPage) {
      updateBookmarkPage(book.id);
    }
  };

  return (
    <div className="text-left relative">
      {/* star icon / bookmark icon */}
      <button
        className="absolute top-0 right-0 border-t border-r border-gray-200 rounded-bl-xl rounded-tr-xl bg-white w-8 h-8 box-center"
        onClick={toggleBookmark}
      >
        <IconContext.Provider
          value={{
            color: isBookmarked ? "red" : "gray",
          }}
        >
          <FaBookmark />
        </IconContext.Provider>
      </button>

      <div
        className="p-2 rounded-xl border border-gray-200 text-sm w-full h-60 md:h-96 bg-center bg-cover"
        style={{ backgroundImage: `url(${book.cover_url})` }}
      />

      <button className="mt-2 font-semibold text-gray-500">{book.title}</button>
    </div>
  );
};

export default Book;
