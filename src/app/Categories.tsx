import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type CategoriesType = {
  id: number;
  name: string;
};

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<CategoriesType[] | []>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // GET categories
  useEffect(() => {
    const getCategories = async () => {
      setError("");

      try {
        const res = await axios.get("/fee-assessment-categories");

        // console.log("get cats", res.data);
        setCategories(res.data);
      } catch {
        setError("An error occurred while displaying categories");
      }

      setLoading(false);
    };

    getCategories();
  }, []);

  // render category classnames
  const isCategoryActive = (id: number) => {
    const categoryId = searchParams.get("categoryId") || "1";

    return id.toString() === categoryId
      ? "p-2 rounded-xl text-sm bg-purple-900 text-white"
      : "p-2 rounded-xl border border-gray-200 text-sm";
  };

  // push a search params
  const onCategoryClick = (id: number) => {
    setSearchParams({ categoryId: id.toString() });
  };

  return (
    <section className="mt-20">
      <p className="mt-4 text-center text-gray-500 font-semibold">
        Explore Categories
      </p>

      {/* err msg */}
      {error && <p className="text-red-500 text-center text-sm">{error}</p>}

      <div className="p-4 flex flex-wrap gap-2 justify-center">
        {/* skeleton loading */}
        {loading &&
          ["dummycat1", "dummycat2", "dummycat3"].map((cat) => (
            <button
              key={cat}
              className="animate-pulse p-2 rounded-xl bg-gray-200 text-sm w-40 h-10"
            />
          ))}

        {/* categories */}
        {!loading &&
          categories.map((category) => (
            <button
              key={category.id}
              className={isCategoryActive(category.id)}
              onClick={() => onCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
      </div>
    </section>
  );
};

export default Categories;
