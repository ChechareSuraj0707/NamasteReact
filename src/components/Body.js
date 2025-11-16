import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";  

const Body = () => {
  const [listofRestaurants, setListOfRestaurants] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

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

  // if(listofRestaurants.length === 0) {
  //   return <div>Loading restaurants..</div>;
  // }

  return listofRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search">
        <input
          type="text"
          className="search-box"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
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
        {filteredRestaurant.map((restaurant) => {
          const resData = restaurant?.data ? restaurant.data : restaurant;
          const key = resData?.id ?? resData?.name ?? Math.random();
          return <Link to = {"/reastaurant/"+ resData.id} state={{ name: resData.name }} key={resData.id}  style={{ textDecoration: "none" }} ><RestaurantCard  resData={resData} /></Link>;
        })}
      </div>
    </div>
  );
};

export default Body;
