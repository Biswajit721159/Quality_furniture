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
      <section class="home-section">
        <div class="home-content">
        <div class="overview-boxes">
          <ReviewsDashboard />
          <UserDashboard />
          <ProductDashboard />
          <OrderDashboard />
        </div>
        </div>
      </section>
    </>
  );
};
export default Dashboard;
