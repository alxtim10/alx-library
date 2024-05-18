import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { getPagingBooks } from "../../api/api";
import { ToastContainer } from "react-toastify";

const Homepage = () => {
  const [books, setBooks] = useState([]);
  const [pageResponse, setPageResponse] = useState(1);

  const [request, setRequest] = useState({
    page: 1,
    size: 10,
  });

  async function getPaging(request) {
    if (request != null && request.year == 0) {
      request.year = null;
    }
    const response = await getPagingBooks(request);
    setBooks(response.data.books);
    setPageResponse(response.data);
  }

  useEffect(() => {
    getPaging(request);
  }, []);

  return (
    <section>
      <ToastContainer />
      <div className="w-full">
        <img className="h-[19rem] w-full" src="/assets/hero.jpg" alt="" />
      </div>
      <div className="flex items-center justify-center gap-2 mt-5">
        <input
          className="w-full border border-gray-400 rounded-full py-2 px-4 outline-none text-sm shadow-md"
          type="text"
          placeholder="Title"
          onChange={(e) => {
            setRequest((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
        <input
          className="w-full border border-gray-400 rounded-full py-2 px-4 outline-none text-sm shadow-md"
          type="text"
          placeholder="Author"
          onChange={(e) => {
            setRequest((prev) => ({
              ...prev,
              author: e.target.value,
            }));
          }}
        />
        <input
          className="w-full border border-gray-400 rounded-full py-2 px-4 outline-none text-sm shadow-md"
          type="text"
          maxLength={4}
          placeholder="Year"
          onChange={(e) => {
            setRequest((prev) => ({
              ...prev,
              year: Number(e.target.value),
            }));
          }}
        />
        <button
          onClick={() => getPaging(request)}
          className="w-1/4 bg-blue-700 shadow-xl text-white py-1 px-3 text-sm rounded-md hover:bg-blue-900 transition-all"
        >
          Search
        </button>
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {books.map((item, i) => {
          return (
            <div key={i}>
              <BookCard
                id={item.BOOK_ID}
                title={item.TITLE}
                author={item.AUTHOR}
                year={item.RELEASE_YEAR}
                stock={item.STOCK}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center mt-10 gap-5">
        <span
          className={`${
            pageResponse.currentPage == 1 ? "hidden" : "block"
          } text-md bg-blue-400 font-extraboldbold px-1 shadow-md rounded-md flex items-center justify-center`}
        >
          &lt;
        </span>
        <h1 className="text-xl font-bold">{pageResponse.currentPage}</h1>
        <span
          className={`${
            pageResponse.currentPage == pageResponse.totalPages
              ? "hidden"
              : "block"
          } text-md bg-blue-400 font-bold px-1 shadow-md rounded-md flex items-center justify-center`}
        >
          &gt;
        </span>
      </div>
    </section>
  );
};

export default Homepage;
