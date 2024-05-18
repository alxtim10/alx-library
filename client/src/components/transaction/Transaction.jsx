import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/cart.context";
import TransactionCard from "./TransactionCard";
import { ToastContainer, toast } from "react-toastify";
import { borrowBook } from "../../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    nim: "",
    start_date: "",
    return_date: "",
    books: [],
  });

  const handleBorrow = async () => {
    if (
      request.nim != "" &&
      request.start_date != "" &&
      request.return_date != "" &&
      request.books.length > 0
    ) {
      if (
        Math.round(
          (new Date(request.return_date).getTime() -
            new Date(request.start_date).getTime()) /
            (1000 * 3600 * 24)
        ) <= 14
      ) {
        const response = await borrowBook(request);
        if (response == true) {
          clearCart();
          toast.success("Book borrowed", {
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
        } else {
          toast.error("Student Not Exists", {
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
      } else {
        toast.error("Range cannot be more than 2 weeks", {
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

  useEffect(() => {
    const newArray = cartItems.map((x) => Number(x.id));
    setRequest((prev) => ({
      ...prev,
      books: newArray,
    }));
  }, [cartItems]);

  return (
    <section className="my-20 p-5 flex flex-col items-center justify-center font-outfit lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-5">
      <ToastContainer />
      <div className="w-full">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl mb-5 text-center text-blue-700 font-bold">
            Library Cart
          </h1>
          <div className="h-[1px] w-56 bg-black"></div>
        </div>
        {cartItems.map((cartItem) => {
          return <TransactionCard key={cartItem.id} cartItem={cartItem} />;
        })}
      </div>
      <div className="lg:flex lg:justify-center w-full lg:w-1/2">
        <div className="w-full lg:w-full mt-20">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl mb-5 text-center text-blue-700 font-bold">
              Borrow Details
            </h1>
            <div className="h-[1px] w-56 bg-black"></div>
          </div>
          <div className="mt-5">
            <label className="text-lg font-outfit font-bold">
              Nomor Induk Mahasiswa
            </label>
            <input
              className="mt-1 w-full bg-zinc-200 text-zinc-600  ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-lg px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-400"
              placeholder="NIM"
              type="text"
              onChange={(e) => {
                setRequest((prev) => ({
                  ...prev,
                  nim: e.target.value,
                }));
              }}
            />
          </div>
          <div className="mt-2 flex items-center justify-center gap-4 w-full">
            <div className="w-full">
              <label className="text-lg font-outfit font-bold">
                Start Date
              </label>
              <input
                className="mt-1 w-full bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-lg px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-400"
                placeholder="Start Date"
                type="date"
                onChange={(e) => {
                  setRequest((prev) => ({
                    ...prev,
                    start_date: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-full">
              <label className="text-lg font-outfit font-bold">
                Return Date
              </label>
              <input
                className="mt-1 w-full bg-zinc-200 text-zinc-600  ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-lg px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-400"
                placeholder="Start Date"
                type="date"
                onChange={(e) => {
                  setRequest((prev) => ({
                    ...prev,
                    return_date: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <button
            onClick={handleBorrow}
            className={` bg-black w-full mt-5 text-white p-4 rounded-md hover:border hover:border-black hover:bg-white hover:text-black transition-all duration-300`}
          >
            Borrow
          </button>
        </div>
      </div>
    </section>
  );
};

export default Transaction;
