import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../redux/ProductSlice";
import { productmethod } from "../redux/ProductSlice";
const GoToMainPage = () => {
    const userinfo = useSelector((state) => state?.user)?.user
    const dispatch = useDispatch()
    let { allproduct, lowerLimit, higherLimit, lowprice, highprice, selectcatagory, searchproduct } = useSelector((state) => state?.product)
    function backTOHome() {
        dispatch(productmethod.setSearchProduct({ searchproduct: '' }))
        if (allproduct?.length === 0) {
            dispatch(loadProduct({ lowprice, highprice, selectcatagory, searchproduct, lowerLimit, higherLimit, userinfo }))
        }
        else dispatch(productmethod.Addsearch({ searchinput: '', allproduct }));
    }
    return (
        <>

            <div style={{ textAlign: 'center', color: 'gray', marginTop: '21px', marginBottom: '10px', fontSize: '17px' }}>
                <Link style={{ marginTop: '5px', marginLeft: '20px' }} onClick={() => backTOHome()}>
                    <Button variant="contained" color="warning" startIcon={<IoMdRefresh size={'20px'} />}>
                        Refresh
                    </Button>
                </Link>
            </div>
        </>
    )
}
export default GoToMainPage