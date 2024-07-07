import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../redux/ProductSlice";
import { productmethod } from "../redux/ProductSlice";
const GoodToSee = () => {
    const userinfo = useSelector((state) => state?.user)?.user
    const dispatch = useDispatch()
    let { allproduct, lowerLimit, higherLimit, lowprice, highprice, selectcatagory, searchproduct } = useSelector((state) => state?.product)
    function backTOHome() {
        dispatch(productmethod.setSearchProduct({ searchproduct: '' }))
        dispatch(loadProduct({ lowprice, highprice, selectcatagory, searchproduct, lowerLimit, higherLimit, userinfo }))
    }
    return (
        <div style={{ textAlign: 'center', color: 'gray', marginTop: '21px', marginBottom: '10px', fontSize: '15px' }}>
            Welcome Back...  <Link onClick={() => backTOHome()}>Refresh</Link>
        </div>
    )
}
export default GoodToSee