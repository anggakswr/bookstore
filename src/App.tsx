import PurpleHeader from "./app/PurpleHeader";
import Home from "./app/pages/Home";
import Bookmark from "./app/pages/Bookmark";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [keyword, setKeyword] = useState("");

  const updateKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <main>
      <PurpleHeader updateKeyword={updateKeyword} />

      <Routes>
        <Route path="/" element={<Home keyword={keyword} />} />
        <Route path="bookmark" element={<Bookmark />} />
      </Routes>
    </main>
  );
};

export default App;
