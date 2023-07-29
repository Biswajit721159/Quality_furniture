import React, { useEffect, useState } from "react";
import { Navigate,Outlet } from "react-router-dom";
import Register from "./Register";

const Privatecomponent = () => {

  // const [user, setuser] = useState("");
  // useEffect(() => {
  //   const auth = localStorage.getItem("user");
  //   setuser(auth);
  // }, []);

  // return (
  //       <div>
  //         {user ? <Outlet /> : <Navigate to={'/Register'} />}
  //       </div>
  // );
};

export default Privatecomponent;
