import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadReview } from '../redux/ReviewSlice';
import Loading from "../component/Loading";
import TableShowReview from "./TableShowReview";
import { TextField, Container, Button } from '@mui/material';
import { Link } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import { Reviewmethod } from '../redux/ReviewSlice'
import { IoMdArrowBack } from "react-icons/io";

const View_Review = () => {

    const history = useNavigate()
    let _id = useParams()._id
    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state.user.user);
    const { product_id, LowerLimit, UpperLimit, reviewLoading } = useSelector((state) => state?.review);

    useEffect(() => {
        if (product_id !== _id) {
            dispatch(Reviewmethod.setLimit({ LowerLimit: 0, UpperLimit: 10 }))
            loadreview()
        }
    }, [])

    function loadreview() {
        dispatch(loadReview({ userinfo: userinfo, LowerLimit: 0, UpperLimit: 10, product_id: _id }))
    }
    function Back() {
        history('/Review')
    }

    return (
        <>
            <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <Button size="small" type="submit" variant="contained" onClick={Back} color="info" style={{ marginTop: '5px', marginLeft: '20px' }}>
                    <IoMdArrowBack /> Back
                </Button>
                <Link style={{ marginTop: '5px', marginLeft: '20px' }} >
                    <Button variant="contained" color="warning" startIcon={<IoMdRefresh size={'20px'} />}>
                        Refresh
                    </Button>
                </Link>
                <TextField
                    variant="outlined"
                    // value={searchValue}
                    // onChange={handleInputChange}
                    placeholder="Enter Email.."
                    size="small"
                    style={{ marginTop: '5px' }}
                    spellCheck='false'
                />
            </Container >
            {
                reviewLoading === true ?
                    <Loading /> : <TableShowReview />
            }
        </>
    )
}
export default View_Review