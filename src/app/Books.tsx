import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type BooksType = {
  id: number;
  title: string;
  cover_url: string;
  authors: string[];
};

type BooksPropsType = {
  keyword: string;
};

const Books = ({ keyword }: BooksPropsType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [books, setBooks] = useState<BooksType[] | []>([]);
  const [initialBooks, setInitialBooks] = useState<BooksType[] | []>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || "0";
  const size = searchParams.get("size") || "10";
  const categoryId = searchParams.get("categoryId") || "1";

  useEffect(() => {
    const getBooks = async () => {
      setError("");
      setLoading(true);
      setBooks([]);
      setInitialBooks([]);

      try {
        const res = await axios.get("/fee-assessment-books", {
          params: {
            page,
            size,
            categoryId,
          },
        });

        // console.log("get books", res.data);
        setBooks(res.data);
        setInitialBooks(res.data);
      } catch {
        setError("An error occurred while displaying books");
      }

      setLoading(false);
    };

    getBooks();
  }, [page, size, categoryId]);

  const pageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    setSearchParams({ page, size: e.target.value, categoryId });
  };

  const nextPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const number = parseInt(page) + 1;
    setSearchParams({ page: number.toString(), size, categoryId });
  };

  const prevPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const number = parseInt(page) - 1;
    setSearchParams({ page: number.toString(), size, categoryId });
  };

  const pageTitle = parseInt(page) + 1;

  useEffect(() => {
    const newBooks = initialBooks.filter((book) => {
      const includesBookTitle = book.title
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const bookAuthors = book.authors
        .map((author) => author.toLowerCase())
        .join();
      const includesAuthors = bookAuthors.includes(keyword);

      return includesBookTitle || includesAuthors;
    });

    setBooks(newBooks);
  }, [keyword, initialBooks]);

  return (
    <section className="px-8">
      <div className="mt-4 box-between">
        <h1 className="text-gray-500 font-semibold">
          {parseInt(page) > 0 ? "Page " + pageTitle : "Must read"}
        </h1>

        <div className="box-equal gap-x-4">
          <span className="font-semibold text-gray-500">Items per page</span>

          <select className="bg-white p-2" onChange={pageSizeChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* err msg */}
      {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start mt-4">
        {/* skeleton loading */}
        {loading &&
          ["dummybook1", "dummybook2", "dummybook3", "dummybook4"].map(
            (book) => (
              <div key={book}>
                <div className="animate-pulse rounded-xl bg-gray-200 w-full h-60 md:h-96" />

                <div className="mt-2 animate-pulse rounded-xl bg-gray-200 w-3/5 h-8" />
              </div>
            )
          )}

        {/* books */}
        {!loading &&
          books.map((book) => (
            <button key={book.id} className="text-left">
              <div
                className="p-2 rounded-xl border border-gray-200 text-sm w-full h-60 md:h-96 bg-center bg-cover"
                style={{ backgroundImage: `url(${book.cover_url})` }}
              />

              <p className="mt-2 font-semibold text-gray-500">{book.title}</p>
            </button>
          ))}
      </div>

      {/* prev & next page btn */}
      <div className="box-center gap-x-4 mt-4">
        {!loading && parseInt(page) ? (
          <button className="font-semibold text-purple-900" onClick={prevPage}>
            &laquo; Previous page
          </button>
        ) : null}

        {!loading && books.length > 9 ? (
          <button className="font-semibold text-purple-900" onClick={nextPage}>
            Next page &raquo;
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default Books;
