import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;
     const {
    image,
    name,
    rating,
    cuisine,
    offer,
    time,
  } = resData;
  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img
        className="res-logo"
        src={image} alt="restaurant" />
        {/* <img className="res-logo" src={cloudinaryImageId ? CDN_URL + cloudinaryImageId : "https://via.placeholder.com/508x320?text=No+Image"} alt="restaurant" /> */}
       <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisine}</h4>
      <h4>{rating} stars</h4>
      <h4>{offer}</h4>
      <h4>{time} minutes</h4>
    </div>

//     cuisine
// : 
// "Chinese, Asian, Tibetan, Desserts"
// id
// : 
// "f8b2e9a1-9c3f-4d45-91a4-2d57b9d31c11"
// image
// : 
// "https://media.istockphoto.com/id/545286388/photo/chinese-food-blank-background.jpg?s=1024x1024&w=is&k=20&c=KxgiUigzYxtMqahfVpGMM6SHfLOHCZb4Mby0At2UbFQ="
// location
// : 
// "Baner"
// name
// : 
// "Chinese Wok"
// offer
// : 
// "ITEMS AT ₹119"
// rating
// : 
// 4.2
// time
// : 
// "25–30 mins"
  );
};

export default RestaurantCard;