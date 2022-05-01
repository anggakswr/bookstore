type PaginationType = {
  page: string;
  prevPage: () => void;
  nextPage: () => void;
  booksLength: number;
};

const Pagination = ({
  page,
  prevPage,
  nextPage,
  booksLength,
}: PaginationType) => {
  return (
    <div className="box-center gap-x-4 mt-16">
      {parseInt(page) ? (
        <button className="font-semibold text-purple-900" onClick={prevPage}>
          &laquo; Previous page
        </button>
      ) : null}

      {booksLength > 9 && (
        <button className="font-semibold text-purple-900" onClick={nextPage}>
          Next page &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
