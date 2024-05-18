/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../../contexts/cart.context";

const BookCard = (props) => {


  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addItemToCart(props);
    toast.success("Book added to cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <section className="p-3 rounded-xl shadow-xl flex items-center justify-center">
      <ToastContainer />
      <div className="flex flex-col items-start justify-center w-full">
        <img className="h-[15rem] w-full" src="/assets/hero.jpg" alt="" />
        <h1 className="font-bold text-xl mt-2">{props.title}</h1>
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-sm mt-2 font-semibold">{props.author}</h1>
            <h1 className="text-sm">{props.year}</h1>
            <h1 className="text-sm mt-2">Stock: {props.stock}</h1>
          </div>
          <button
            onClick={addToCartHandler}
            className={`${
              props.stock <= 0 ? "hidden" : "block"
            } mt-12 bg-blue-700 shadow-xl text-white py-1 px-3 text-sm rounded-md hover:bg-blue-900 transition-all`}
          >
            Borrow
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookCard;
