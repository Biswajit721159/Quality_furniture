import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
const api=process.env.REACT_APP_API
const Product_View=()=>{
    const _id=useParams()._id
    const userinfo=useSelector((state)=>state.user.user)
    const history=useNavigate()
    useEffect(()=>{
        loadproduct();
    },[])

    function loadproduct()
    {
        fetch(`${api}/product/${_id}`,{
            headers:{
                Authorization:`Bearer ${userinfo.accessToken}`
            }
        }).then((res)=>res.json()).then((data)=>{
            if(data.statusCode==201)
            {

            }
            else if(data.statusCode==498)
            {

            }
            else
            {
                history('*');
            }
        }).catch((error)=>{
            history('*')
        })
    }

    return(
        <>Product_View</>
    )
}
export default Product_View