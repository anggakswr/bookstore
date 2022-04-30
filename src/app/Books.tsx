import axios from "axios";
import { useEffect, useState } from "react";

type BooksType = {
  id: number;
  title: string;
  cover_url: string;
};

const Books = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [books, setBooks] = useState<BooksType[] | []>([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("/fee-assessment-books", {
          params: {
            page: 0,
            size: 10,
            categoryId: 1,
          },
        });

        console.log("get books", res.data);
        setBooks(res.data);
      } catch {
        setError("An error occurred while displaying books");
      }

      setLoading(false);
    };

    getBooks();
  }, []);

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start px-8 mt-4">
      {/* err msg */}
      {error && (
        <small className="text-red-500 text-center col-span-2 md:col-span-4">
          {error}
        </small>
      )}

      {/* skeleton loading */}
      {loading &&
        ["dummybook1", "dummybook2", "dummybook3", "dummybook4"].map((book) => (
          <div key={book}>
            <div className="animate-pulse rounded-xl bg-gray-200 w-full h-60" />

            <div className="mt-2 animate-pulse rounded-xl bg-gray-200 w-3/5 h-8" />
          </div>
        ))}

      {/* books */}
      {!loading &&
        books.map((book) => (
          <button key={book.id} className="text-left">
            <div
              className="p-2 rounded-xl border border-gray-200 text-sm w-full h-60 bg-center bg-cover"
              style={{ backgroundImage: `url(${book.cover_url})` }}
            />

            <p className="mt-2 font-semibold text-gray-500">{book.title}</p>
          </button>
        ))}
    </section>
  );
};

export default Books;
