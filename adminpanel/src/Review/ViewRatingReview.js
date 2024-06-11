import React from "react";
import { useLocation } from "react-router-dom";

const ViewRatingReview = () => {
    const location = useLocation()
    const { data } = location.state || {};
    console.log("data is", data)
    return (
        <>ViewRatingReview</>
    )
}

export default ViewRatingReview