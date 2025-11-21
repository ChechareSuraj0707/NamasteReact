import { useEffect, useState } from "react";
import { Menu_API } from "./constants";
import axios from "axios";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!resId) return;
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(Menu_API + resId);

      console.log("API DATA:", response.data);
      setResInfo(response.data);
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };
  return resInfo;
};
export default useRestaurantMenu;
