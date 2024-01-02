import React from "react";
import "../css/Main.css";
import { Link } from "react-router-dom";
const ProductDashboard = () => {
  return (
    <>
        <div class="home-content">
          <div class="overview-boxes">
            <div class="box">
              <Link >
                <div class="right-side">
                  <div class="box-topic">Total Product</div>
                  <div class="number">2</div>
                  <div class="indicator"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
    </>
  );
};
export default ProductDashboard;
