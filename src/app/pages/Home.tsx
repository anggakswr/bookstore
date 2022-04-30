import Books from "../Books";
import Categories from "../Categories";

type HomeType = {
  keyword: string;
};

const Home = ({ keyword }: HomeType) => {
  return (
    <>
      <Categories />
      <Books keyword={keyword} />
    </>
  );
};

export default Home;
