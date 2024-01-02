import React from "react";
import "../css/Main.css";
import { Link } from "react-router-dom";
import ProductDashboard from "../Dashboard/ProductDashboard";
import UserDashboard from "../Dashboard/UserDashBoard";
import OrderDashboard from "../Dashboard/OrderDashboard";
import ReviewsDashboard from "../Dashboard/ReviewsDashboard";
const Dashboard = () => {
  return (
    <>
      <section class="home-section" style={{display:'flex',flexDirection:'column',flexWrap:'wrap'}}>
        <ReviewsDashboard/>
        <UserDashboard/>
        <ProductDashboard/>
        <OrderDashboard/>
      </section>
    </>
  );
};
export default Dashboard;
