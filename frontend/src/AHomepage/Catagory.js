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
            {Catagory?.length !== 0 && <h6 style={{ textAlign: "center", color: 'gray', marginTop: '2px' }}>Catagory</h6>}
            <div className="catagory mt-2">
                {
                    Catagory && Catagory?.map((data, ind) => (
                        <Link to={'/Product'} key={ind} onClick={() => GoToProduct(data?.product_type)} style={{ textDecoration: 'none' }}>
                            <Card className="catagoryitem">
                                <CardMedia
                                    className="CatagoryImage"
                                    style={{ marginTop: '2px', borderRadius: '10%' }}
                                    component="img"
                                    height="150"
                                    image={data?.firstImage}
                                    alt="wait"
                                />
                                <h6 className="catagory-title1 mt-3" style={{ color: 'green' }}>{data?.product_type}({data?.count})</h6>
                            </Card>
                        </Link>
                    ))
                }
            </div>
        </>
    )

}
export default Catagory