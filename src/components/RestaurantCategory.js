import { useState } from "react";

const RestaurantCategory = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-6/12 mx-auto p-4 border border-gray-300 rounded-lg">
      {/* Accordion Header */}
      <div
        className="w-6/12 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="mt-4">
          {items.length === 0 ? (
            <p className="text-gray-500">No items available.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 mb-3 border-b border-gray-200 flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ⭐ {item.rating} ({item.ratingCount} reviews)
                  </p>
                  <p>₹{item.price}</p>
                </div>
                {/* Image + Add button wrapper */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  {/* Add button on the image */}
                  <button className="absolute bottom-1 right-1 bg-green-500 text-white text-sm px-2 py-1 rounded shadow">
                    +Add
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
