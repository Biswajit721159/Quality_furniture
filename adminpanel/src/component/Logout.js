import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate('/');
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <h5 className="mb-4">Successfully Logged Out</h5>
        <button className="btn btn-primary" onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Logout;
