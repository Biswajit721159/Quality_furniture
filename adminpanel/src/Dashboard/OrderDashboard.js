import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material';
import { IoMdRefresh } from "react-icons/io";
import { orderDashboard } from "../redux/CountSlice";
const OrderDashboard = () => {
  const dispatch = useDispatch()
  const userinfo = JSON.parse(localStorage.getItem('user'));
  const { orderCount, loadingOrder } = useSelector((state) => state.count)

  useEffect(() => {
    if (orderCount === 0) loadorder();
  }, [])


  function loadorder() {
    dispatch(orderDashboard({ userinfo: userinfo }))
  }

  return (
    <>
      <div className="box">
        <Link><Button size="small" color="info" onClick={loadorder} style={{ borderRight: '5px solid green' }} startIcon={<IoMdRefresh size={'20px'} />}></Button></Link>
        <Link className="custom-link" to={'/Order'}>
          <div className="right-side" >
            <div className="box-topic">Order</div>
            <div className="number">
              {loadingOrder === true ? <ClipLoader color='red' size={'20px'} /> : orderCount}
            </div>
            <div className="indicator"></div>
          </div>
        </Link>
      </div>
    </>
  );
};
export default OrderDashboard;
