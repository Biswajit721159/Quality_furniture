import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usermethod } from '../redux/userslice';
import { useDispatch } from "react-redux";
const api = process.env.REACT_APP_API;

const Adminlogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [button, setButton] = useState("Login");
  const [disabled, setDisabled] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);

  const submit = () => {
    setButton("wait a second ...");
    setDisabled(true);
    fetch(`${api}/adminpanel/Login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(result => {
      if (result.statusCode === 200) {
        dispatch(usermethod.LOGIN(result.data));
        navigate('/'); 
      } else {
        setButton("Login");
        setDisabled(false);
        setWrongUser(true);
      }
    })
    .catch(() => {
      setButton("Login");
      setDisabled(false);
      setWrongUser(true);
    });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center">Admins Login Panel</h3>
        <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          {wrongUser && <div className="text-danger mb-3">*Wrong username or password</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={disabled}>{button}</button>
        </form>
      </div>
    </div>
  );
};

export default Adminlogin;
