import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
const Product_View=()=>{
    const _id=useParams()._id
    const userinfo=useSelector((state)=>state.user.user)
    console.log(userinfo)
    useEffect(()=>{
        loadproduct();
    },[])

    function loadproduct()
    {
        
    }

    return(
        <>Product_View</>
    )
}
export default Product_View