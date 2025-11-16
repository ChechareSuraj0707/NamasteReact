import { useEffect, useState } from "react";
import { useParams ,useLocation} from "react-router-dom";
import axios from "axios";
import Shimmer from "./Shimmer";
import { Menu_API } from "../utils/constants";

const RestaurantMenu = () => {
const { resId } = useParams();
const location = useLocation();
const restaurantName = location.state?.name || "Restaurant";

  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if(!resId) return;
    fetchMenu();
  }, [resId]);

 const fetchMenu = async () => {
  try {
    const response = await axios.get(
      Menu_API + resId
    );

    console.log("API DATA:", response.data);
    setResInfo(response.data);
  } catch (err) {
    console.error("API ERROR:", err);
  }
};

  // ⛔ FIX: Prevent crash when resInfo is null
  if (!resInfo || !resInfo.menuItems) {
    return <Shimmer />;
  }

  console.log("MENU ITEMS =", resInfo.menuItems);

  return (
    <div>
      <h1>{restaurantName}</h1>
      <h2>Restaurant Menu</h2>

      <ul>
        {resInfo.menuItems.map((item) => {
          console.log("ITEM =", item);

          return (
            <li key={item.id} style={{ marginBottom: "20px" }}>
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>
                Rating: ⭐ {item.rating} ({item.ratingCount} reviews)
              </p>
              <p>{item.description}</p>

              <img
                src={item.image}
                alt={item.name}
                style={{ width: "150px", borderRadius: "10px" }}
              />

              {item.isCustomisable && <p>Customisable ✔️</p>}
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
