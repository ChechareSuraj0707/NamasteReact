import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div>
      <h1>OOPS </h1>
      <h1>Somthing Gone Wrong !! </h1>
      <h1>
        {error.status} :{error.statusText}
      </h1>
    </div>
  );
};

export default Error;
