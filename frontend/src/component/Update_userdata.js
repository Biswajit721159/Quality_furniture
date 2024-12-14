import React, { useEffect, useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { usermethod } from '../redux/UserSlice';
import Loader from './Loader';
import "../css/Auth.css";
const api = process.env.REACT_APP_API

export default function Update_userdata() {
  const [_id, set_id] = useState('')
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [address, setaddress] = useState("")

  const history = useNavigate();

  const dispatch = useDispatch()
  const [wrongname, setwrongname] = useState(false)
  const [wrongemail, setwrongemail] = useState(false)
  const [wrongaddress, setwrongaddress] = useState(false)
  const [messaddress, setmessaddress] = useState("")

  const [messname, setmessname] = useState("")
  const userinfo = useSelector((state) => state?.user)?.user

  const [button, setbutton] = useState("Submit")
  const [disabled, setdisabled] = useState(false)
  const [load, setload] = useState(false)


  useEffect(() => {
    if (userinfo === null) {
      dispatch(usermethod.Logout_User())
      history('/Signin')
    }
    else {
      set_id(userinfo?.user?._id)
      setname(userinfo?.user?.name)
      setemail(userinfo?.user?.email)
      setaddress(userinfo?.user?.address)
    }
  }, [])

  function checkforname(s) {
    var regex = /^[a-zA-Z ]{2,30}$/;
    let a = regex.test(s);
    if (a == false) {
      setwrongname(true)
      setmessname("*Name must be only string and should not contain symbols or numbers")
    }
    return a;
  }

  function checkaddress(s) {
    if (s.length > 10) {
      return true;
    }
    setwrongaddress(true)
    setmessaddress("*Invalid Address Please Enter Valid address")
    return false;
  }

  function update() {
    let a = checkaddress(address)
    let b = checkforname(name)
    if (a && b && (address !== userinfo?.user?.address || name !== userinfo?.user?.name)) {
      setbutton("Please wait...")
      setdisabled(true)
      fetch(`${api}/user/updateAddressAndName/${_id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userinfo?.accessToken}`
        },
        body: JSON.stringify({
          _id: _id,
          name: name,
          email: email,
          address: address,
        })
      })
        .then(responce => responce.json()).then((res) => {
          if (res.statusCode == 201) {
            setbutton("Submit")
            setdisabled(false)
            toast.success("user successfully updated!")
            let user = {
              user: {
                _id: userinfo?.user?._id,
                email: userinfo?.user?.email,
                address: address,
                name: name
              },
              accessToken: userinfo?.accessToken
            }
            dispatch(usermethod.Add_User(user))
          }
          else if (res.statusCode == 498) {
            dispatch(usermethod.Logout_User())
            history('/Signin')
          }
          else {
            history('*')
          }
        })
    }
  }

  return (

    load === false ?
      <div className="Reviewsform mt-2">
        <h5>Update Your Data</h5>
        <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} disabled className="inputreglog" placeholder="Enter Email Id" required />
        {wrongemail ? <label style={{ color: "red" }}>*Invalid Email address</label> : ""}

        <input type="text" value={name} onChange={(e) => { setname(e.target.value) }} className="inputreglog" spellCheck={false} placeholder="Enter Full Name" required />
        {wrongname ? <label style={{ color: "red" }}>{messname}</label> : ""}

        <textarea type="text" value={address} onChange={(e) => { setaddress(e.target.value) }} style={{ height: '60px' }} spellCheck={false} className="inputreglog" placeholder="Enter Full Address" required />
        {wrongaddress ? <label style={{ color: "red" }}>{messaddress}</label> : ""}

        <button className="btn btn-info mt-4" disabled={disabled} onClick={update}>{button}</button>
      </div>
      : <Loader />

  )
}
