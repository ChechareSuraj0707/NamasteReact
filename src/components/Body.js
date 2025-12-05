import RestaurantCard ,{withPromotedLabel}from "./RestaurantCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useonlineStatus from "../utils/useOnlineStatus";
import TicTacToe from "./TicTacToe";

const Body = () => {
  const [listofRestaurants, setListOfRestaurants] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const EnhancedRestaurantCard = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      // setLoading(true);
      const response = await axios.get("http://localhost:3000/api/restaurants");
      const list =
        response?.data?.restaurants ??
        response?.data?.data ??
        response?.data ??
        [];
      // setListOfRestaurants(Array.isArray(list) ? list : []);
      setListOfRestaurants(list);
      setFilteredRestaurant(list);
      setError(null);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch restaurants"
      );
      setListOfRestaurants([]);
    } finally {
      // setLoading(false);
    }
  };

  const onlineStatus = useonlineStatus();

  if (onlineStatus === false) {
    return <TicTacToe />;
  }

  return listofRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              const filteredRestaurant = listofRestaurants.filter((res) => {
                const d = res?.data ? res.data : res;
                const name = (d?.name ?? "").toString();
                return name
                  .toLowerCase()
                  .includes((searchText ?? "").toLowerCase());
              });
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 m-4 rounded-lg"
            onClick={() => {
              const filteredList = listofRestaurants.filter((res) => {
                const d = res?.data ? res.data : res;
                return Number(d?.rating) > 4;
              });
              setListOfRestaurants(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      {/* {loading && <Shimmer />}
      {error && <div style={{ color: "red" }}>Error: {error}</div>} */}

      <div className="res-container flex flex-wrap justify-center ">
        {filteredRestaurant.map((restaurant) => {
          const resData = restaurant?.data ? restaurant.data : restaurant;
          const key = resData?.id ?? resData?.name ?? Math.random();
          return (
            <Link
              to={"/reastaurant/" + resData.id}
              state={{ name: resData.name }}
              key={resData.id}
              style={{ textDecoration: "none" }}
            >
              {resData.promoted 
  ? <EnhancedRestaurantCard resData={resData} />
  : <RestaurantCard resData={resData} />
}

            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
