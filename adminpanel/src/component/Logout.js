import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Logout=()=>{
    const history=useNavigate()
    function login()
    {
        history('/')
    }
    return(
        <div>
            <h5>SuccessFully Logout</h5>
            <button onClick={login}>Login</button>
        </div>
    )
}
export default Logout