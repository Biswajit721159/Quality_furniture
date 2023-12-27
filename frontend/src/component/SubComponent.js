import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
const api=process.env.REACT_APP_API
const SubComponent=()=>{

    const [topproduct,settopproduct]=useState(null)
    const [topOfferproduct,settopOfferproduct]=useState(null)

    useEffect(()=>{
        loadTopproduct();
        loadTopOfferProduct();
    },[])

    function loadTopOfferProduct()
    {
        fetch(`${api}/product/TopOfferProduct/${10}`).then(responce=>responce.json()).then((res)=>{
            if(res.statusCode==201){
                settopOfferproduct(res.data)
            }
        })
    }
    function loadTopproduct()
    {
        fetch(`${api}/product/getproductByType/Door`).then(responce=>responce.json()).then((res)=>{
            if(res.statusCode==201){
                settopproduct(res.data)
            }
        })
    }

    return(
        <>
            {topproduct && <Carousel data={topproduct} message='Top Product'/>}
            {topOfferproduct && <Carousel data={topOfferproduct} message='Top Offer'/>}
        </>
    )
}
export default SubComponent