import React from "react";
import ProductDashboard from "../Dashboard/ProductDashboard";
import UserDashboard from "../Dashboard/UserDashBoard";
import OrderDashboard from "../Dashboard/OrderDashboard";
import ReviewsDashboard from "../Dashboard/ReviewsDashboard";
import '../css/Dashboard.css';
const Dashboard = () => {
  return (
    <>
      <section className="home-section">
        <div className="home-content">
          <div className="overview-boxes">
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
