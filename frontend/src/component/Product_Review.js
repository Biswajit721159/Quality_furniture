import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiFillStar } from "react-icons/ai";
import { PulseLoader } from 'react-spinners';
import { VscVerifiedFilled } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { usermethod } from '../redux/UserSlice'
import '../css/Product_Review.css'
import Loader from "./Loader";
const api = process.env.REACT_APP_API
const Product_Review = (id) => {

    const userinfo = useSelector((state) => state.user)?.user
    const dispatch = useDispatch()
    const _id = id._id
    const history = useNavigate()
    const [loadreview, setloadreview] = useState(false)
    const [loadrating, setloadrating] = useState(false);
    const [reviews_data_show, setreviews_data_show] = useState([])

    let [persentage_5_star, setpersentage_5_star] = useState(0);
    let [persentage_4_star, setpersentage_4_star] = useState(0);
    let [persentage_3_star, setpersentage_3_star] = useState(0);
    let [persentage_2_star, setpersentage_2_star] = useState(0);
    let [persentage_1_star, setpersentage_1_star] = useState(0);

    let [number_5_star, setnumber_5_star] = useState(0);
    let [number_4_star, setnumber_4_star] = useState(0);
    let [number_3_star, setnumber_3_star] = useState(0);
    let [number_2_star, setnumber_2_star] = useState(0);
    let [number_1_star, setnumber_1_star] = useState(0);
    let [total, settotal] = useState(0);
    let [overall_rating, setoverall_rating] = useState(0);

    let [low, setlow] = useState(0);
    let [high, sethigh] = useState(5);
    let [prev, setprev] = useState(false);
    let [next, setnext] = useState(false);

    useEffect(() => {
        if (userinfo === null) {
            history('/Signin')
        }
        else {
            loadReview(0, 5);
            loadRating();
        }
    }, [_id])

    function loadRating() {
        setloadrating(true)
        fetch(`${api}/Reviews/findRatingPersentageofProduct/${_id}`, {
            headers:
            {
                Authorization: `Bearer ${userinfo?.accessToken}`
            }
        }).then((responce => responce.json())).then((res) => {
            if (res.statusCode = 201) {
                let result = res?.data;
                setpersentage_1_star(result[0].persentage_1_star);
                setnumber_1_star(result[0].number_1_star);

                setpersentage_2_star(result[1].persentage_2_star);
                setnumber_2_star(result[1].number_2_star);

                setpersentage_3_star(result[2].persentage_3_star);
                setnumber_3_star(result[2].number_3_star);

                setpersentage_4_star(result[3].persentage_4_star);
                setnumber_4_star(result[3].number_4_star);

                setpersentage_5_star(result[4].persentage_5_star);
                setnumber_5_star(result[4].number_5_star);
                setoverall_rating(result[5].overall_rating);
                settotal(result[5].total);
                setloadrating(false);
            }
            else if (res?.statusCode == 498) {
                dispatch(usermethod.Logout_User())
                history('/Signin')
            }
            else {
                history('*');
            }
        })
    }

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
        <>
            <>
                {
                    loadrating == true ?
                        <Loader /> :
                        <div className='col12 mt-4'>
                            <p className='reviewtextitem'><strong>{overall_rating}</strong> <AiFillStar /> Average based on <strong>{total}</strong> reviews.</p>
                            <div className="row">
                                <div className="side">
                                    <div className="reviewtextitem" >5<AiFillStar /></div>
                                </div>
                                <div className="middle">
                                    <div className="bar-container">
                                        <div className="bar" style={{ width: `${persentage_5_star}%`, backgroundColor: "#04AA6D" }}></div>
                                    </div>
                                </div>
                                <div className="side right">
                                    <div className="reviewtextitem" >{number_5_star}</div>
                                </div>
                                <div className="side">
                                    <div className="reviewtextitem" >4<AiFillStar /></div>
                                </div>
                                <div className="middle">
                                    <div className="bar-container">
                                        <div className="bar" style={{ width: `${persentage_4_star}%`, backgroundColor: "#2196F3" }}></div>
                                    </div>
                                </div>
                                <div className="side right">
                                    <div className="reviewtextitem" >{number_4_star}</div>
                                </div>
                                <div className="side">
                                    <div className="reviewtextitem" >3<AiFillStar /></div>
                                </div>
                                <div className="middle">
                                    <div className="bar-container">
                                        <div className="bar" style={{ width: `${persentage_3_star}%`, backgroundColor: "#00bcd4" }}></div>
                                    </div>
                                </div>
                                <div className="side right">
                                    <div className="reviewtextitem" >{number_3_star}</div>
                                </div>
                                <div className="side">
                                    <div className="reviewtextitem" >2<AiFillStar /></div>
                                </div>
                                <div className="middle">
                                    <div className="bar-container">
                                        <div className="bar" style={{ width: `${persentage_2_star}%`, backgroundColor: "#ff9800" }}></div>
                                    </div>
                                </div>
                                <div className="side right">
                                    <div className="reviewtextitem" >{number_2_star}</div>
                                </div>
                                <div className="side">
                                    <div className="reviewtextitem" >1<AiFillStar /></div>
                                </div>
                                <div className="middle">
                                    <div className="bar-container">
                                        <div className="bar" style={{ width: `${persentage_1_star}%`, backgroundColor: "#f44336" }}></div>
                                    </div>
                                </div>
                                <div className="side right">
                                    <div className="reviewtextitem" >{number_1_star}</div>
                                </div>
                            </div>
                        </div>
                }
                {
                    loadreview == true ?
                        <div className="LoaderiteminReviewProduct">
                            <PulseLoader color="#16A085" />
                        </div> :
                        <div className='col21 mt-4'>
                            <ui className="col21item1">
                                {
                                    reviews_data_show != undefined && reviews_data_show.length != 0 ?
                                        reviews_data_show.map((data, ind) => (
                                            <li key={ind} style={{ margin: '2px' }}>
                                                <span className="reviewtextitem"><VscVerifiedFilled /> {data.rating} <AiFillStar /> {data.review}</span>
                                            </li>
                                        ))
                                        : <h4 className="col-md-12 text-center" style={{ marginTop: "100px", color: "#808B96" }}>Review is not Posted</h4>
                                }
                                {reviews_data_show != undefined && reviews_data_show.length != 0 &&
                                    <div className="col21item2">
                                        <button className="btn btn-primary btn-sm" disabled={!prev} onClick={prevpage}>prev</button>
                                        <button className="btn btn-primary btn-sm" disabled={!next} onClick={nextpage}>next</button>
                                    </div>
                                }
                            </ui>
                        </div>
                }
            </>
        </>
    )
}
export default Product_Review