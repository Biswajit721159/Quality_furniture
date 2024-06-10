import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material';
import { IoMdRefresh } from "react-icons/io";
import { productDashboard } from "../redux/CountSlice";
const api = process.env.REACT_APP_API

const ProductDashboard = () => {
  const dispatch = useDispatch()
  const userinfo = JSON.parse(localStorage.getItem('user'));
  const { productCount, loadingProduct } = useSelector((state) => state.count);

  useEffect(() => {
    loadproduct();
  }, [])


  function loadproduct() {
    if (productCount === 0) {
      dispatch(productDashboard({ userinfo: userinfo }))
    }
  }
  function loadAgain() {
    dispatch(productDashboard({ userinfo: userinfo }))
  }

  return (
    <>
      <div className="box">
        <Link><Button size="small" color="info" onClick={loadAgain} startIcon={<IoMdRefresh size={'20px'} />}></Button></Link>
        <Link className="custom-link" to={'/Product'}>
          <div className="right-side">
            <div className="box-topic">Product</div>
            <div className="number">
              {loadingProduct === true ? <PulseLoader color="#16A085" size={'10px'} /> : productCount}
            </div>
            <div className="indicator"></div>
          </div>
        </Link>
      </div>
    </>
  );
};
export default ProductDashboard;
