/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const TransactionCard = ({ cartItem }) => {
  const { removeItemToCart } = useContext(CartContext);

  const removeItemHandler = () => removeItemToCart(cartItem);

  return (
    <div className="flex justify-center text-center items-center text-lg font-outfit mt-10 border-b-black border-b-[1px] pb-3">
      <div className="w-full flex justify-center items-center">
        <img src="/assets/hero.jpg" className="w-36 xl:w-56" />
      </div>
      <div className="flex flex-col items-start md:items-center w-full ml-1">
        <h1 className="text-lg font-bold">{cartItem.title}</h1>
        <h1 className="text-md font-semibold">{cartItem.author}</h1>
        <h1 className="text-sm">{cartItem.year}</h1>
        <h1 className="flex justify-start items-center gap-5 mt-5">
          <button 
          onClick={removeItemHandler}
          className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all">Remove</button>
        </h1>
      </div>
    </div>
  );
};

export default TransactionCard;
