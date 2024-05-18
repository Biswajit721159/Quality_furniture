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
            {Catagory?.length !== 0 && <h5 className="product_name" >Catagory</h5>}
            <div className="catagory  mt-2" style={{ backgroundColor: `rgba(var(--color-foreground), 0.2)` }}>
                {
                    Catagory && Catagory?.map((data, ind) => (
                        <Link to={'/Product'} key={ind} onClick={() => GoToProduct(data?.product_type)} style={{ textDecoration: 'none' }}>
                            <Card className="catagoryitem gradient-background">
                                <CardMedia
                                    className="CatagoryImage"
                                    style={{ marginTop: '2px', borderRadius: '10%' }}
                                    component="img"
                                    height="150"
                                    image={data?.firstImage}
                                    alt="wait"
                                />
                                <p className="card-title mt-3" style={{ backgroundColor: 'rgba(var(--color-foreground), 0.2)' }}>{data?.product_type}({data?.count})</p>
                            </Card>
                        </Link>
                    ))
                }
            </div>
        </>
    )

}
export default Catagory