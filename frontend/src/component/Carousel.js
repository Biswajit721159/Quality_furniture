import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from 'react-spinners';
import '../css/Carousel.css'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
const Carousel=(props)=>{

    let data=props.data;
    let message=props.message;
    const [low,setlow]=useState(0);
    const [high,sethigh]=useState(4);

    function Increment()
    {
        if(high==data.length-1) return;
        setlow(low+1)
        sethigh(high+1)
    }

    function Decrement()
    {
        if(low==0) return
        sethigh(high-1)
        setlow(low-1)
    }

    return(
    <>
        {data && <h3 className="product_name">{message}</h3>}
            <div className="carousel">
                {data && data.map((item,ind)=>(
                    <div key={ind} >
                    { ind>=low && ind<=high && high-low==4 && 
                        <div key={ind} >
                            <Link to={`/Product/${item._id}`}><img  src={item.newImage[0]} className="imgs" alt="Error"/></Link>
                        </div>
                    }
                    </div>
                ))}
            </div>
        {data && 
            <div className="Arrowleftright">
                <FaAngleLeft className="Decrement" onClick={Decrement} />
                {(high-low)==4 &&<FaAngleRight  className="Increment"  onClick={Increment}/>}
            </div>
        }    
    </>
    )
}
export default Carousel