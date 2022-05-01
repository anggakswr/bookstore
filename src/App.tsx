import PurpleHeader from "./components/PurpleHeader";
import { Routes, Route } from "react-router-dom";
import AppContextProvider from "./context/AppContextProvider";
import Home from "./pages/Home";
import Bookmark from "./pages/Bookmark";

const App = () => {
  return (
    <main>
      <AppContextProvider>
        <PurpleHeader />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="bookmark" element={<Bookmark />} />
        </Routes>
      </AppContextProvider>
    </main>
  );
};

export default App;
