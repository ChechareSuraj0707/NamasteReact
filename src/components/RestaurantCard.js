import { CDN_URL } from "../utils/constants";
import {useContext } from "react";
import UserContext from "../utils/UserContext";
export const RestaurantCard = (props) => {
  const { resData } = props;
  const { image, name, rating, cuisine, offer, time } = resData;
   const {loggedInUser} = useContext(UserContext);
  return (
    <div className="m-4 p-4 w-[250px] bg-gray-100 rounded-lg hover:bg-gray-200">
      <img className="res-logo" src={image} alt="restaurant" />
      {/* <img className="res-logo" src={cloudinaryImageId ? CDN_URL + cloudinaryImageId : "https://via.placeholder.com/508x320?text=No+Image"} alt="restaurant" /> */}
      <h3 className="font-bold py-2 text-lg">{name}</h3>
      <h4>{cuisine}</h4>
      <h4>{rating} stars</h4>
      <h4>{offer}</h4>
      <h4>{time} {loggedInUser}</h4>
    </div>
  );
};

//Higher Order Component (HOC) - A component that takes another component as input and returns a new component

// input - RestaurantCard
// output - EnhancedRestaurantCard (promoted version of RestaurantCard)

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label
          className="absolute 
  bg-black text-white
  text-xs font-semibold
  px-3 py-1
  rounded-full
  shadow-sm"
        >
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
