import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import axios from "axios";

const Body = () => {
  const [listofRestaurants, setListOfRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/restaurants");
        const list = response?.data?.restaurants ?? response?.data?.data ?? response?.data ?? [];
        setListOfRestaurants(Array.isArray(list) ? list : []);
        setError(null);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to fetch restaurants");
        setListOfRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="body">
      <button
        className="filter-btn"
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

      {loading && <div>Loading restaurants...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      <div className="res-container">
        {listofRestaurants.map((restaurant) => {
          const resData = restaurant?.data ? restaurant.data : restaurant;
          const key = resData?.id ?? resData?.name ?? Math.random();
          return <RestaurantCard key={key} resData={resData} />;
        })}
      </div>
    </div>
  );
};

export default Body;
