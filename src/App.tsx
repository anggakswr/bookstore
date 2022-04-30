import PurpleHeader from "./app/PurpleHeader";
import Categories from "./app/Categories";
import Books from "./app/Books";
import { useState } from "react";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const updateKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <main>
      <PurpleHeader updateKeyword={updateKeyword} />
      <Categories />
      <Books keyword={keyword} />
    </main>
  );
};

export default App;
