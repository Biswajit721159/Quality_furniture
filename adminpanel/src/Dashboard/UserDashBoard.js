import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { IoMdRefresh } from "react-icons/io";
import { Button } from '@mui/material';
import { userDashboard } from '../redux/CountSlice'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const userinfo = JSON.parse(localStorage.getItem('user'));
  let { userCount, loadingUser } = useSelector((state) => state?.count)

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (count <= userCount) {
  //       setcount((prevCount) => prevCount + 1);
  //     }
  //     else {
  //       clearInterval(intervalId);
  //     }
  //   }, 100);
  //   return () => clearInterval(intervalId);
  // }, [count])

  useEffect(() => {
    loadproduct()
  }, [])

  function loadproduct() {
    if (userCount === 0) {
      dispatch(userDashboard({ userinfo: userinfo }))
    }
  }
  function loadAgain() {
    dispatch(userDashboard({ userinfo: userinfo }))
  }


  return (
    <>
      <div className="box">
        <Link><Button size="small" color="info" onClick={loadAgain} startIcon={<IoMdRefresh size={'20px'} />}></Button></Link>
        <Link className="custom-link" to={'/User'}>
          <div className="right-side">
            <div className="box-topic">User</div>
            <div className="number">
              {loadingUser === true ? <PulseLoader color="#16A085" size={'10px'} /> : userCount}
            </div>
            <div className="indicator"></div>
          </div>
        </Link>
      </div>
    </>
  );
};
export default UserDashboard;
