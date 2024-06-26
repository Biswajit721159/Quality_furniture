import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material';
import { IoMdRefresh } from "react-icons/io";
import { reviewDashboard } from "../redux/CountSlice";

const ReviewsDashboard = () => {
  const dispatch = useDispatch()
  const userinfo = JSON.parse(localStorage.getItem('user'));
  const { reviewCount, loadingReview } = useSelector((state) => state.count);

  useEffect(() => {
    if (reviewCount === 0) loadreviews();
  }, [])

  function loadreviews() {
    dispatch(reviewDashboard({ userinfo: userinfo }))
  }

  return (
    <>
      <div className="box">
        <Link><Button size="small" color="info" onClick={loadreviews} style={{ borderRight: '5px solid green' }} startIcon={<IoMdRefresh size={'20px'} />}></Button></Link>
        <Link className="custom-link" to={'/Review'}>
          <div className="right-side">
            <div className="box-topic">Reviews</div>
            <div className="number">
              {loadingReview === true ? <ClipLoader color="red" size={'20px'} /> : reviewCount}
            </div>
            <div className="indicator"></div>
          </div>
        </Link>
      </div>
    </>
  );
};
export default ReviewsDashboard;
