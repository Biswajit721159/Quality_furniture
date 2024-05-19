import React, { useEffect, useState } from "react";
import { PulseLoader } from 'react-spinners';
import { MdStar } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usermethod } from '../redux/UserSlice'
import { AiFillStar } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import '../css/ReviewShow.css'
const api = process.env.REACT_APP_API
const ReviewShow = (id) => {

    const _id = id._id
    const dispatch = useDispatch()
    const [prev, setprev] = useState(false)
    const [next, setnext] = useState(false)
    const [low, setlow] = useState(0)
    const [high, sethigh] = useState(5)
    const userinfo = useSelector((state) => state.user)?.user
    const [loadreview, setloadreview] = useState(false)
    const [reviews_data_show, setreviews_data_show] = useState([])
    const history = useNavigate()

    useEffect(() => {
        if (userinfo === null) {
            history('/Signin')
        }
        else {
            loadReview(0, 5);
        }
    }, [])

    function loadReview(low, high) {
        setloadreview(true)
        fetch(`${api}/Reviews/${_id}/${low}/${high}`, {
            headers:
            {
                Authorization: `Bearer ${userinfo?.accessToken}`
            }
        }).then((responce => responce.json())).then((res) => {
            if (res.statusCode = 201) {
                let n = res?.data?.length;

                if (n < 5) setreviews_data_show(res?.data?.slice?.(0, n - 1));
                else setreviews_data_show(res?.data?.slice?.(0, 5));
                if (n) {
                    setprev(res?.data?.[n - 1]?.prev);
                    setnext(res?.data?.[n - 1]?.next);
                }
                setloadreview(false);
            }
            else if (res.statusCode === 498) {
                dispatch(usermethod.Logout_User())
                history('/Signin')
            }
            else {
                history('*');
            }
        })
    }

    function prevpage() {
        setlow(low - 5);
        sethigh(high - 5);
        loadReview(low - 5, high - 5);
    }

    function nextpage() {
        setlow(high);
        sethigh(high + 5);
        loadReview(high, high + 5);
    }

    return (
        <div className="ReviewShow">
            {
                loadreview === true ?
                    <div className="LoaderiteminReviewProduct">
                        <PulseLoader color="#16A085" size={'7px'} />
                    </div>
                    :
                    <div className='mt-5'>
                        <ul >
                            {
                                reviews_data_show !== undefined && reviews_data_show?.length !== 0 ?
                                    reviews_data_show.map((data, ind) => (
                                        <li key={ind} style={{ margin: '2px' }} className="reviewtextitem text-center">
                                            <GoDotFill color="green" />{data?.rating} <AiFillStar /> {data?.review}
                                        </li>
                                    ))
                                    : <h4 className="col-md-12 text-center" style={{ marginTop: "100px", color: "#808B96" }}>Review is not Posted</h4>
                            }
                            {
                                reviews_data_show !== undefined && reviews_data_show.length !== 0 &&
                                (prev || next) && (<div className="col21item2">
                                    <button className="btn btn-primary btn-sm" disabled={!prev} onClick={prevpage}>Prev</button>
                                    <button className="btn btn-primary btn-sm" disabled={!next} onClick={nextpage}>Next</button>
                                </div>)
                            }
                        </ul>
                    </div>
            }
        </div>
    )
}
export default ReviewShow