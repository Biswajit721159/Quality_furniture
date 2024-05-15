import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { useDispatch, useSelector } from "react-redux";
import { loadTopproduct, loadTopOfferProduct } from '../redux/TopProductSlice'
const api = process.env.REACT_APP_API
const SubComponent = () => {

    const dispatch = useDispatch()
    const topproduct = useSelector((state) => state?.FrontPageProduct?.loadTopproduct)
    const topOfferproduct = useSelector((state) => state?.FrontPageProduct?.loadTopOfferProduct)

    useEffect(() => {
        if (topproduct?.length === 0 || topproduct === null) dispatch(loadTopproduct());
        if (topOfferproduct?.length === 0 || topOfferproduct === null) dispatch(loadTopOfferProduct());
    }, [])

    return (
        <>
            {topproduct && <Carousel data={topproduct} message='Top Product' />}
            {topOfferproduct && <Carousel data={topOfferproduct} message='Top Offer' />}
        </>
    )
}
export default SubComponent