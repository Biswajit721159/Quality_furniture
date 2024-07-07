import React, { useEffect } from "react";
import { PulseLoader } from 'react-spinners';
import { useSelector, useDispatch } from "react-redux";
import { GoDotFill } from "react-icons/go";
import '../css/ReviewShow.css'
import Button from '@mui/material/Button';
import { Reviewmethod, loadReview, updatelikeAnddisLike } from "../redux/ProductReview";
import Loading from '../component/Loading';
import { SetRating } from '../constant/Rating';
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { ClipLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";

const ReviewShow = (id) => {
    const _id = id._id
    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state.user)?.user;
    const history = useNavigate();
    const { ProductReview, loadingReview, next, LowerLimit, UpperLimit, product_id, updateLikeAndDisLike, review_id } = useSelector((state) => state.Review);

    useEffect(() => {
        if (product_id === _id) {
            if (ProductReview?.length === 0) {
                loadReview(0, 5);
            }
        } else {
            dispatch(Reviewmethod.clearOrder());
            loadreview(0, 5);
        }
    }, [])

    function loadreview(low, high) {
        dispatch(loadReview({ userinfo, product_id: _id, LowerLimit: low, UpperLimit: high }));
    }

    function likepost(review_id, option) {
        if (checkLogin()) {
            history('/Signin')
            return;
        }
        if (updateLikeAndDisLike === false) {
            dispatch(Reviewmethod.setReviewid(review_id));
            dispatch(updatelikeAnddisLike({ review_id, option, userinfo }))
        }
    }
    function dislikepost(review_id, option) {
        if (checkLogin()) {
            history('/Signin')
            return;
        }
        if (updateLikeAndDisLike === false) {
            dispatch(Reviewmethod.setReviewid(review_id));
            dispatch(updatelikeAnddisLike({ review_id, option, userinfo }))
        }
    }

    function checkLogin() {
        if (userinfo?.accessToken) {
            return false;
        } else {
            return true;
        }
    }


    return (
        <div className="ReviewShow">
            {
                loadingReview === true && ProductReview?.length === 0 ?
                    <div className="LoaderiteminReviewProduct">
                        <PulseLoader color="#16A085" size={'7px'} />
                    </div>
                    :
                    <div className='mt-5'>
                        {
                            ProductReview?.length !== 0 ?
                                ProductReview?.map((data, ind) => (
                                    <p key={ind} style={{ margin: '2px' }} className="ReviewText">
                                        <div className="Rating">
                                            <GoDotFill size={'7px'} style={{ marginTop: '5px' }} />
                                            <SetRating rating={data?.rating} />
                                            ({data?.review})
                                        </div>
                                        <div className="likeDislikebutton">
                                            {
                                                updateLikeAndDisLike === true && review_id === data?._id ?
                                                    <ClipLoader size={'21px'} />
                                                    : <><AiFillLike onClick={() => likepost(data._id, "like")} style={data.islike === 1 && { color: "green" }} className="like" />{data?.like}</>
                                            }
                                            {
                                                updateLikeAndDisLike === true && review_id === data?._id ?
                                                    <ClipLoader size={'12px'} style={{ marginLeft: '7%' }} />
                                                    : <> <AiFillDislike onClick={() => dislikepost(data._id, "dislike")} style={data.islike === -1 && { color: "red" }} className="dislike" />{data?.dislike}</>
                                            }
                                        </div>
                                    </p>
                                ))
                                : <h4 className="col-md-12 text-center" style={{ marginTop: "40px", color: "#808B96" }}>Review is not Posted</h4>
                        }
                        {
                            loadingReview === true ? <Loading /> :
                                next && <div className="col21item2">
                                    <Button size='small' variant="contained" color="warning" onClick={() => loadreview(LowerLimit, UpperLimit)}>Load More</Button>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}
export default ReviewShow