import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const Cart = () => {
  const items = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div className="m-4 p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        Cart Items
      </h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty 🛒
        </p>
      ) : (
        items.map((item, index) => (
          <div
            key={item.id || index}
            className="p-4 mb-4 border border-gray-200 rounded-lg flex justify-between items-center"
          >
            {/* Item Info */}
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600">
                ⭐ {item.rating} ({item.ratingCount} reviews)
              </p>
              <p className="font-medium">₹{item.price}</p>

              {/* Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded"
                  onClick={() => handleRemoveItem(item)}
                >
                  − Remove
                </button>

                <button
                  className="bg-green-500 text-white text-sm px-3 py-1 rounded"
                  onClick={() => handleAddItem(item)}
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
