import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";
import { Menu_API } from "../utils/constants";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const location = useLocation();
  const restaurantName = location.state?.name ?? "Restaurant";

  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!resId) return;
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(Menu_API + resId);
      setResInfo(response.data);
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  if (!resInfo || !resInfo.menuItems) {
    return <Shimmer />;
  }

  const menu = resInfo.menuItems;

  // CATEGORY LOGIC
  const categories = [
    {
      title: "All Dishes",
      items: menu,
    },
    {
      title: "Top Rated (Rating > 4)",
      items: menu.filter((i) => Number(i.rating) > 4),
    },
    {
      title: "Most Popular (Reviews > 70)",
      items: menu.filter((i) => i.ratingCount > 70),
    },
    {
      title: "Budget Friendly (Below ₹200)",
      items: menu.filter((i) => Number(i.price) < 200),
    },
    {
      title: "Premium Dishes (Above ₹300)",
      items: menu.filter((i) => Number(i.price) > 300),
    },
    {
      title: "Customisable Items",
      items: menu.filter((i) => i.isCustomisable === true),
    },
    {
      title: "Spicy Specials",
      items: menu.filter(
        (i) =>
          i.name.toLowerCase().includes("spicy") ||
          i.description.toLowerCase().includes("chili") ||
          i.description.toLowerCase().includes("hot")
      ),
    },
    {
      title: "Chef's Specials",
      items: menu.filter((i) => Number(i.rating) > 4.3 && i.ratingCount > 50),
    },
  ];

  return (
    <div className="p-6">
      <h1 className=" text-2xl font-bold mx-auto w-6/12 mb-3 justify-center items-center flex text-red-500">
        {restaurantName} Menu
      </h1>

      {/* Render all accordions */}
      {categories.map((cat, index) => (
        <RestaurantCategory key={index} title={cat.title} items={cat.items} />
      ))}
    </div>
  );
};

export default RestaurantMenu;
