import React from "react";
import { useEffect } from "react";

const RestaurantMenu = () => {
  const id = "f8b2e9a1-9c3f-4d45-91a4-2d57b9d31c11";
  useEffect(() => {
    fetchMenu();
    // console.log("useEffect - fetch the menu data");
  }, []);
  //   const fetchMenu = async () => {
  //     const data = await fetch(`http://localhost:3000/api/restroMenu/:${id}`);
  //     console.log(data);
  //     const json = await data.json();
  //     console.log(json);
  //   };

  const fetchMenu = async () => {
    try {
      const data = await fetch(`http://localhost:3000/api/restroMenu/${id}`);

      //   if (!data.ok) {
      //     console.error("Server returned", data.status);
      //     return;
      //   }

      const json = await data.json();
      console.log(json);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div>
      <h1> Name of the Restaurant</h1>
      <h2> Menu </h2>
      <ul>
        <li>Pizza</li>
        <li>Burger</li>
        <li>Pasta</li>
        <li>French Fries</li>
        <li>Coke</li>
      </ul>
    </div>
  );
};

export default RestaurantMenu;
