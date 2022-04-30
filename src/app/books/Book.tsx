import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaStar } from "react-icons/fa";

type BookItem = {
  id: number;
  cover_url: string;
  title: string;
};

type BookType = {
  book: BookItem;
};

const Book = ({ book }: BookType) => {
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

  const bookmark = () => {
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
      }

      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    }
  };

  return (
    <div className="text-left relative">
      {/* star icon / bookmark icon */}
      <button
        className="absolute top-0 right-0 rounded-bl-xl bg-white w-8 h-8 box-center"
        onClick={bookmark}
      >
        <IconContext.Provider
          value={{
            color: isBookmarked ? "yellow" : "gray",
          }}
        >
          <FaStar />
        </IconContext.Provider>
      </button>

      <div
        className="p-2 rounded-xl border border-gray-200 text-sm w-full h-60 md:h-96 bg-center bg-cover"
        style={{ backgroundImage: `url(${book.cover_url})` }}
      />

      <p className="mt-2 font-semibold text-gray-500">{book.title}</p>
    </div>
  );
};

export default Book;
