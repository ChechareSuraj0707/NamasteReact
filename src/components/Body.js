import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listofRestaurants, setListOfRestaurants] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

 const fetchRestaurants = async () => {
      try {
        // setLoading(true);
        const response = await axios.get("http://localhost:3000/api/restaurants");
        const list = response?.data?.restaurants ?? response?.data?.data ?? response?.data ?? [];
        // setListOfRestaurants(Array.isArray(list) ? list : []);
        setListOfRestaurants(list);
        setError(null);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to fetch restaurants");
        setListOfRestaurants([]);
      } finally {
        // setLoading(false);
      }
    };

    // if(listofRestaurants.length === 0) {
    //   return <div>Loading restaurants..</div>;
    // } 

  return listofRestaurants.length === 0 ?(<Shimmer/>)
  : (
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

      {/* {loading && <Shimmer />}
      {error && <div style={{ color: "red" }}>Error: {error}</div>} */}

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
