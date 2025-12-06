import { useState } from "react";

const RestaurantCategory = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="m-4 p-4 border border-gray-300 rounded-lg">

      {/* Accordion Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
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

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};

export default RestaurantCategory;
