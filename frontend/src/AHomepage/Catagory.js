import React, { useEffect } from "react";
import { LoadCatagory } from "../redux/ProductSlice";
import { useDispatch, useSelector } from 'react-redux'
import { Card } from "@mui/material";
import '../css/Catagory.css'
import CardMedia from '@mui/material/CardMedia';
import { Link } from "react-router-dom";
import { loadProduct } from '../redux/ProductSlice'
const Catagory = () => {
    const dispatch = useDispatch()
    const userinfo = useSelector((state) => state?.user)?.user
    const { Catagory, catagoryloader, lowprice, highprice, lowerLimit, higherLimit } = useSelector((state) => state.product)
    let searchInput = useSelector((state) => state?.product?.searchproduct)
    useEffect(() => {
        if (Catagory?.length === 0)
            dispatch(LoadCatagory())
    }, [])
    function GoToProduct(selectcatagory) {
        dispatch(loadProduct({ lowprice, highprice, selectcatagory, searchInput, lowerLimit, higherLimit, userinfo }))
    }
    return (
        <>
            <h5 style={{ textAlign: "center" }}>Catagory</h5>
            <div className="catagory mt-2">
                {
                    Catagory && Catagory?.map((data, ind) => (
                        <Link to={'/Product'} key={ind} onClick={() => GoToProduct(data?.product_type)}>
                            <Card className="catagoryitem">
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={data?.firstImage}
                                    alt="wait"
                                />
                                <h6 className="card-title mt-3" style={{ textDecoration: 'none' }}>{data?.product_type}({data?.count})</h6>
                            </Card>
                        </Link>
                    ))
                }
            </div>
        </>
    )

}
export default Catagory