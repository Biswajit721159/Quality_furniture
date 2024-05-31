import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { usermethod } from '../redux/userslice'
import { productmethod } from "../redux/ProductSlice";
import { PulseLoader, BeatLoader, ClipLoader } from 'react-spinners';
import Reviews_show from "./Reviews_show";
import Loader from '../component/Loader'
const api = process.env.REACT_APP_API

const Reviews_Section = () => {
    const dispatch = useDispatch()
    const userinfo = useSelector((state) => state.user.user);
    const [load, setload] = useState(false)
    const history = useNavigate();
    const page = parseInt(useParams().page);
    const LowerLimit = (page - 1) * 10;
    const UpperLimit = (page) * 10;

    useEffect(() => {
        if (userinfo == null) {
            history('/')
        }
        else {
            loadproduct();
        }
    }, [page])

    function loadproduct() {
        setload(true)
        fetch(`${api}/product/getproductByLimit/${LowerLimit}/${UpperLimit}`, {
            headers: {
                Authorization: `Bearer ${userinfo.accessToken}`
            }
        }).then((res) => res.json()).then((data) => {
            if (data.statusCode == 201) {
                dispatch(productmethod.ADD_PRODUCT(data.data))
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
                    :
                    <Reviews_show />
            }
        </>
    )
}

export default Reviews_Section