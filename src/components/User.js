import { React, useContext } from "react";
import UserContext from "../utils/UserContext";
const User = () => {
  const { loggedInUser } = useContext(UserContext);
  return (
    <div className="user-card">
      <h2> Name : {loggedInUser}</h2>
      <h3> Location : Pune</h3>
      <h4> Contact : 7******609</h4>
    </div>
  );
};

export default User;
