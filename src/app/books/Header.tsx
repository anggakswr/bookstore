type BooksHeaderType = {
  page: string;
  keyword: string;
  pageSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  size: string;
};

const BooksHeader = ({
  page,
  keyword,
  pageSizeChange,
  size,
}: BooksHeaderType) => {
  const pageTitle = parseInt(page) + 1;

  return (
    <div className="mt-4 box-between">
      <h1 className="text-gray-500 font-semibold">
        {parseInt(page) > 0 ? "Page " + pageTitle : "Must read"}

        {keyword && (
          <span className="pl-4 font-normal text-sm">
            (Show search result of "{keyword}")
          </span>
        )}
      </h1>

      <div className="box-equal gap-x-4">
        <span className="font-semibold text-gray-500">Items per page</span>

        <select className="bg-white p-2" onChange={pageSizeChange} value={size}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default BooksHeader;
