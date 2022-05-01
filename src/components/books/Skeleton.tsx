const Skeleton = () => {
  return (
    <>
      {["dummybook1", "dummybook2", "dummybook3", "dummybook4"].map((book) => (
        <div key={book}>
          <div className="animate-pulse rounded-xl bg-gray-200 w-full h-60 md:h-96" />

          <div className="mt-2 animate-pulse rounded-xl bg-gray-200 w-3/5 h-8" />
        </div>
      ))}
    </>
  );
};

export default Skeleton;
