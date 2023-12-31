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
    const [high,sethigh]=useState(data.length>=5?4:data.length);
    const [prev,setprev]=useState(false);
    const [next,setnext]=useState(data.length>=6?true:false);


    function Increment()
    {
        if(high==data.length-1)
        {
            setnext(false)
            return
        }
        setprev(true)
        setlow(low+1)
        sethigh(high+1)
    }

    function Decrement()
    {
        if(low==0)
        {
            setprev(false);
            return;
        }
        setnext(true)
        sethigh(high-1)
        setlow(low-1)
    }

    return(
    <>
        {data && <h3 className="product_name">{message}</h3>}
            <div className="carousel">
                {data && data.map((item,ind)=>(
                    <div key={ind} >
                    { ind>=low && ind<=high && 
                        <div>
                            <Link to={`/Product/${item._id}`}><img  src={item.newImage[0]} className="imgs" alt="Error"/></Link>
                        </div>
                    }
                    </div>
                ))}
            </div>
        {data.length>=6 && 
            <div className="Arrowleftright">
                <button className=" btn btn-primary btn-sm" disabled={!prev} onClick={Decrement}>Prev</button>
                <button  className="btn btn-primary btn-sm" disabled={!next}  onClick={Increment}>Next</button>
            </div>
        }    
    </>
    )
}
export default Carousel