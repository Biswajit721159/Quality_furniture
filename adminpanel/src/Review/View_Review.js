import React, { useEffect } from "react"
import { useSelector } from "react-redux"
const View_Review=()=>{
    const userinfo=useSelector((state)=>state.user.user);

    useEffect(()=>{
        if(userinfo==null)
        {

        }
        else
        {
            
        }
    },[])
    return(
        <>View_Review</>
    )
}
export default View_Review