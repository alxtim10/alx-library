const BookCard = () => {
  return (
    <section className="p-3 rounded-xl shadow-xl flex items-center justify-center">
      <div className="flex flex-col items-start justify-center w-full">
        <img className="h-[15rem] w-full" src="/assets/hero.jpg" alt="" />
        <h1 className="font-bold text-xl mt-2">The Little Prince</h1>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-sm mt-2">Bethania Elira</h1>
          <button className="bg-black shadow-xl text-white py-1 px-3 text-sm rounded-md hover:bg-gray-700 transition-all">
            Rent now &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookCard;
