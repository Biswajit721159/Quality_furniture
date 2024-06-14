import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, TextField, Rating, Button, Box, Typography } from '@mui/material';
import { updateReview } from "../redux/ReviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowBack } from "react-icons/io";
const ViewRatingReview = () => {
    const userinfo = useSelector((state) => state?.user?.user)
    const dispatch = useDispatch()
    const location = useLocation();
    let { data } = location.state || {};
    const [review, setReview] = useState(data?.review || '');
    const { UpdatedReviewMessage, UpdatedReviewLoading } = useSelector((state) => state?.review)
    const navigate = useNavigate();

    const handleUpdate = () => {
        data.review = review
        dispatch(updateReview({ formData: data, review: review, userinfo: userinfo }))
    };
    function Back() {
        navigate(-1);
    }

    return (
        <Container>
            <Button size="small" type="submit" variant="contained" onClick={Back} color="info" style={{ marginTop: '5px', marginLeft: '20px' }}>
                <IoMdArrowBack /> Back
            </Button>
            <Box sx={{ my: 4 }}>
                <h4 style={{ textAlign: 'center' }}>View and Update Rating & Review</h4>
                <TextField
                    label="Order ID"
                    value={data?.order_id || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    disabled={true}
                />
                <TextField
                    label="Product ID"
                    value={data?.product_id || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    disabled={true}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating
                        sx={{ fontSize: '25px' }}
                        name="rating"
                        value={data?.rating}
                    // onChange={(event, newValue) => {
                    //     setRating(newValue);
                    // }}
                    />
                    <span style={{ marginLeft: 16 }}>{data?.rating}</span>
                </Box>
                <TextField
                    label="Review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    margin="normal"
                />

                <Button variant="contained" disabled={UpdatedReviewLoading} color="primary" onClick={handleUpdate}>
                    {UpdatedReviewLoading === false ? "Update" : "Wait a second.."}
                </Button>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'red' }}>
                    {UpdatedReviewMessage}
                </Typography>
            </Box>
        </Container>
    );
};

export default ViewRatingReview;
