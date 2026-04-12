import React, { useEffect, useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { usermethod } from '../redux/UserSlice';
import Loader from './Loader';
import { FiUser, FiMail, FiMapPin, FiSave } from 'react-icons/fi';

const api = process.env.REACT_APP_API

export default function Update_userdata() {
  const [_id, set_id] = useState('')
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [address, setaddress] = useState("")

  const history = useNavigate();
  const dispatch = useDispatch()
  const [wrongname, setwrongname] = useState(false)
  const [wrongaddress, setwrongaddress] = useState(false)
  const [messaddress, setmessaddress] = useState("")
  const [messname, setmessname] = useState("")
  const userinfo = useSelector((state) => state?.user)?.user
  const [button, setbutton] = useState("Save Changes")
  const [disabled, setdisabled] = useState(false)
  const [load, setload] = useState(false) // eslint-disable-line no-unused-vars

  useEffect(() => {
    if (userinfo === null) {
      dispatch(usermethod.Logout_User())
      history('/Signin')
    } else {
      set_id(userinfo?.user?._id)
      setname(userinfo?.user?.name)
      setemail(userinfo?.user?.email)
      setaddress(userinfo?.user?.address)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function checkforname(s) {
    var regex = /^[a-zA-Z ]{2,30}$/;
    let a = regex.test(s);
    if (a === false) {
      setwrongname(true)
      setmessname("Name must only contain letters (2-30 characters)")
    }
    return a;
  }

  function checkaddress(s) {
    if (s.length > 10) return true;
    setwrongaddress(true)
    setmessaddress("Please enter a valid full address (min. 10 characters)")
    return false;
  }

  function update() {
    setwrongname(false)
    setwrongaddress(false)
    let a = checkaddress(address)
    let b = checkforname(name)
    if (a && b && (address !== userinfo?.user?.address || name !== userinfo?.user?.name)) {
      setbutton("Saving...")
      setdisabled(true)
      fetch(`${api}/user/updateAddressAndName/${_id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userinfo?.accessToken}`
        },
        body: JSON.stringify({ _id, name, email, address })
      }).then(r => r.json()).then((res) => {
        if (res.statusCode === 201) {
          setbutton("Save Changes")
          setdisabled(false)
          toast.success("Profile updated successfully!")
          dispatch(usermethod.Add_User({
            user: { _id: userinfo?.user?._id, email: userinfo?.user?.email, address, name },
            accessToken: userinfo?.accessToken
          }))
        } else if (res.statusCode === 498) {
          dispatch(usermethod.Logout_User())
          history('/Signin')
        } else {
          history('*')
        }
      })
    }
  }

  if (load) return <Loader />;

  return (
    <div className="min-h-screen bg-page flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-900">Your Profile</h1>
          <p className="text-stone-500 text-sm mt-1">Update your personal information and delivery address</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-8">

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-stone-100">
            <div className="w-16 h-16 rounded-2xl bg-brand flex items-center justify-center text-2xl font-bold text-white shadow-md">
              {name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-800">{name}</h2>
              <p className="text-sm text-stone-400">{email}</p>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-5">

            {/* Email (disabled) */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <FiMail size={14} className="text-stone-400" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-400 bg-stone-50 cursor-not-allowed"
              />
              <p className="text-xs text-stone-400 mt-1">Email cannot be changed</p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <FiUser size={14} className="text-stone-400" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setname(e.target.value); setwrongname(false); }}
                className={`input-base ${wrongname ? 'border-red-400 focus:ring-red-400' : ''}`}
                placeholder="Enter your full name"
                spellCheck={false}
              />
              {wrongname && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span>⚠️</span> {messname}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <FiMapPin size={14} className="text-stone-400" /> Delivery Address
              </label>
              <textarea
                value={address}
                onChange={(e) => { setaddress(e.target.value); setwrongaddress(false); }}
                className={`input-base resize-none h-24 ${wrongaddress ? 'border-red-400 focus:ring-red-400' : ''}`}
                placeholder="Enter your full delivery address"
                spellCheck={false}
              />
              {wrongaddress && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span>⚠️</span> {messaddress}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={update}
              disabled={disabled}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all shadow-md mt-2
                ${disabled ? 'bg-stone-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-light hover:shadow-lg active:scale-95'}`}
            >
              <FiSave size={16} />
              {button}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
