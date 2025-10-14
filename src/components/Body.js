import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  const [listofRestaurants, setListOfRestaurants] = useState(resList);

  return (
    <div className="body">
      <button className="filter-btn" onClick={() =>{
        const filteredList = listofRestaurants.filter(
          (res) => res.data.avgRating > 4
        );
        setListOfRestaurants(filteredList);   
      }}>
        Top Rated Restaurants
        </button>
      <div className="res-container">
        {
          listofRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.data.id} resData={restaurant.data} />
          ))
        }
      </div>
    </div>
  );
};

export default Body;