import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { usermethod } from '../redux/userslice'
import { Allusermethod } from "../redux/AllUserSlice";
import { PulseLoader, BeatLoader, ClipLoader } from 'react-spinners';
import { useParams } from "react-router-dom";
import Usershow from "./Usershow";
import Loader from '../component/Loader'
const api = process.env.REACT_APP_API

const User_Section = () => {
    const dispatch = useDispatch()
    const [load, setload] = useState(false)
    const history = useNavigate()
    let page = useParams().page;
    const LowerLimit = (page - 1) * 10;
    const UpperLimit = (page) * 10;
    const userinfo = useSelector((state) => state.user.user);

    useEffect(() => {
        loadproduct()
    }, [LowerLimit], [UpperLimit])

    function loadproduct() {
        setload(true)
        fetch(`${api}/user/getproductByLimit/${LowerLimit}/${UpperLimit}`, {
            headers: {
                Authorization: `Bearer ${userinfo.accessToken}`
            }
        }).then((res) => res.json()).then((data) => {
            if (data.statusCode == 201) {
                dispatch(Allusermethod.ADD_USER(data.data))
                setload(false)
            }
            else if (data.statusCode == 498) {
                dispatch(usermethod.LOGOUT())
                history('/')
            }
            else {
                history('*')
            }
        }).catch((error) => {
            history('*')
        })
    }

    return (
        <>
            {
                load == true ?
                    <Loader />
                    : <Usershow />
            }
        </>
    )
}

export default User_Section