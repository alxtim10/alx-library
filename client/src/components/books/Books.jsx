import { useEffect, useState } from "react";
import { addBook, getBookshelf } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    title: "",
    author: "",
    year: 0,
    bookshelf_id: null,
  });
  const [bookshelf, setBookshelf] = useState([]);

  async function getData() {
    const response = await getBookshelf();
    setBookshelf(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (bookshelf.length > 0) {
      setRequest((prev) => ({
        ...prev,
        bookshelf_id: bookshelf[0].BOOKSHELF_ID,
      }));
    }
  }, [bookshelf]);

  const handleSubmit = () => {
    if (
      request.title != "" &&
      request.author != "" &&
      request.year != 0 &&
      request.bookshelf_id != null
    ) {
      const res = addBook(request);
      if (res) {
        toast.success("Book added", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } else {
      toast.error("Fill all fields", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="flex items-center justify-center w-full mt-44">
        <div className="w-full shadow-xl rounded-lg bg-slate-300 p-5 px-10 flex flex-col items-center justify-center sm:w-[30rem]">
          <h1 className="font-bold text-2xl text-center mb-5">Books</h1>
          <div className="w-full grid grid-cols-1 gap-5">
            <div className="relative">
              <label className="text-md font-outfit font-bold">
                Title
              </label>
              <input
                className="mt-1 w-full bg-zinc-200 text-zinc-600  ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-sm px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-400"
                placeholder="NIM"
                type="text"
                onChange={(e) => {
                  setRequest((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="relative">
              <label className="text-md font-outfit font-bold">Author</label>
              <input
                className="mt-1 w-full bg-zinc-200 text-zinc-600  ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-sm px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-400"
                placeholder="Author"
                type="text"
                onChange={(e) => {
                  setRequest((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="relative">
              <label className="text-md font-outfit font-bold">Year</label>
              <input
                className="mt-1 w-full bg-zinc-200 text-zinc-600  ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-sm px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-400"
                placeholder="Year"
                maxLength="4"
                type="text"
                onChange={(e) => {
                  setRequest((prev) => ({
                    ...prev,
                    year: Number(e.target.value),
                  }));
                }}
              />
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-2">
              <label className="text-md font-outfit font-bold">Bookshelf</label>
              <select
                className="text-sm font-semibold outline-none rounded-md w-full p-2 bg-slate-200"
                onChange={(e) => {
                  let item = bookshelf.filter(
                    (val) => val.NAME == e.target.value
                  );
                  setRequest((prev) => ({
                    ...prev,
                    bookshelf_id: item[0].BOOKSHELF_ID,
                  }));
                }}
              >
                {bookshelf.map((item, i) => {
                  return (
                    <option key={i} className="text-sm font-semibold">
                      {item.NAME}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 hover:brightness-110  font-bold py-3 px-6 rounded-full bg-blue-700 shadow-lg shadow-blue-700/50 text-white"
          >
            Submit
          </button>
        </div>
      </section>
    </>
  );
};

export default Books;
