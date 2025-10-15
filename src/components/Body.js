import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect } from "react";

const Body = () => {
  const [listofRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    // API call
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://mocki.io/v1/7023df9f-0845-444a-8e90-70448481feaf"
    );
    const json = await data.json();
    // Find the card with gridElements.infoWithStyle.info
    const restaurantCard = json.data.cards.find(
      (card) =>
        card.card &&
        card.card.gridElements &&
        card.card.gridElements.infoWithStyle &&
        Array.isArray(card.card.gridElements.infoWithStyle.info)
    );
    const restaurants = restaurantCard
      ? restaurantCard.card.gridElements.infoWithStyle.info
      : [];
    setListOfRestaurants(restaurants);
  }

  return (
    <div className="body">
      <button
        className="filter-btn"
        onClick={() => {
          const filteredList = listofRestaurants.filter(
            (res) => res.data.avgRating > 4
          );
          setListOfRestaurants(filteredList);
        }}
      >
        Top Rated Restaurants
      </button>
      <div className="res-container">
        {Array.isArray(listofRestaurants) && listofRestaurants.length > 0 ? (
          listofRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.data.id}
              resData={restaurant.data}
            />
          ))
        ) : (
          <p>No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default Body;
