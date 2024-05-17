import BookCard from "./BookCard";

const Homepage = () => {
  return (
    <section>
      <div className="w-full">
        <img className="h-[19rem] w-full" src="/assets/hero.jpg" alt="" />
      </div>
      <div className="flex items-center justify-center mt-5">
        <input
          className="w-3/4 lg:w-1/2 border border-gray-400 rounded-full py-2 px-4 outline-none text-sm shadow-md"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </section>
  );
};

export default Homepage;
