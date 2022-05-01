import { useEffect, useState } from "react";
import Book, { BookItem } from "../components/books/Book";

const Bookmark = () => {
  const [books, setBooks] = useState<BookItem[]>([]);

  useEffect(() => {
    const bookmarksJson = localStorage.getItem("bookmarks");

    if (bookmarksJson) {
      // if localstorage is not empty
      const bookmarks = JSON.parse(bookmarksJson); // arr or existing bookmarks
      setBooks(bookmarks);
    } else {
      setBooks([]);
    }
  }, []);

  const updateBookmarkPage = (id: number) => {
    setBooks((prevBooks) => {
      return prevBooks.filter((book: BookItem) => book.id !== id);
    });
  };

  return (
    <section className="mt-20 px-8">
      <p className="mt-4 text-center text-gray-500 font-semibold">Bookmark</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start mt-4">
        {/* books */}
        {books.map((book) => (
          <Book
            key={"book" + book.id}
            book={book}
            updateBookmarkPage={updateBookmarkPage}
          />
        ))}
      </div>

      {!books.length ? (
        <p className="text-gray-500 text-center text-sm">No data</p>
      ) : null}
    </section>
  );
};

export default Bookmark;
