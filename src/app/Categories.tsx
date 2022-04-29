import axios from "axios";
import { useEffect, useState } from "react";

type CategoriesType = {
  id: number;
  name: string;
};

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<CategoriesType[] | []>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/fee-assessment-categories");
        console.log("get cats", res.data);
        setCategories(res.data);
      } catch {
        setError("An error occurred while displaying categories");
      }

      setLoading(false);
    };

    getCategories();
  }, []);

  return (
    <section className="p-4 flex flex-wrap gap-2 justify-center">
      {/* err msg */}
      {error && <small className="text-red-500">{error}</small>}

      {/* skeleton loading */}
      {loading &&
        ["dummycat1", "dummycat2", "dummycat3"].map((cat) => (
          <button
            key={cat}
            className="p-2 rounded-xl bg-gray-200 text-sm w-40 h-10"
          />
        ))}

      {categories.map((category) => (
        <button
          key={category.id}
          className="p-2 rounded-xl border border-gray-200 text-sm"
        >
          {category.name}
        </button>
      ))}
    </section>
  );
};

export default Categories;
