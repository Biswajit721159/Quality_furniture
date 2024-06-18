import React from "react"
import { HiStar } from "react-icons/hi";
export const SetRating = ({ rating }) => {
    return (
        <>
            {
                rating === 0 ? <Rating rating={rating} color={'#808080'} /> :
                    rating > 0 && rating <= 1 ? <Rating rating={rating} color={'#FF0000'} /> :
                        rating > 1 && rating <= 2 ? <Rating rating={rating} color={'#FF7F00'} /> :
                            rating > 2 && rating <= 3 ? <Rating rating={rating} color={'#A4A42D'} /> :
                                rating > 3 && rating <= 4 ? <Rating rating={rating} color={'#27AE60'} /> :
                                    <Rating rating={rating} color={'green'} />
            }
        </>
    )
}

export const Rating = ({ rating, color }) => {
    return (
        <>
            <p style={{ color: color, fontSize: '15px' }}>{rating} < HiStar color={color} style={{ marginTop: '-7px' }} /></p>
        </>
    )
}