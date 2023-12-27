import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from 'react-spinners';
import '../css/Carousel.css'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
const api=process.env.REACT_APP_API
const Carousel=()=>{
    const history=useNavigate()
    const [data,setdata]=useState([])
    let userinfo=JSON.parse(localStorage.getItem('user'))
    const [load,setload]=useState(false)

    const [low,setlow]=useState(0);
    const [high,sethigh]=useState(4);

    useEffect(()=>{
       if(userinfo==null)
       {
          history('Signin')
       }
       else
       {
           loadproduct()
       }
    },[])

    function loadproduct()
    {
        setload(true)
        fetch(`${api}/product/getproductByType/Door`,{
            headers:{
                Authorization:`Bearer ${userinfo.accessToken}`
            }
        }).then(responce=>responce.json()).then((res)=>{
            if(res.statusCode==201)
            {
                setdata(res.data)
                setload(false)
            }
            else if(res.statusCode==498)
            {
                localStorage.removeItem('user')
                history('/Signin')
            }
            else
            {
                history('*');
            }
        },(error)=>{
            console.log(error)
        })
    }

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
        {
            load==true?
            <div className="Loaderitem">
                <PulseLoader color="#16A085"  />
            </div>
            :
            <>
                
                    <div className="carousel">
                        {data && data.map((item,ind)=>(
                            <>
                            { ind>=low && ind<=high && high-low==4 && 
                                <div  key={ind} >
                                    
                                    <img  src={item.newImage[0]} className="imgs" alt="Error"/>
                                    
                                </div>}
                            </>
                        ))}
                    </div>
                    <div className="Arrowleftright">
                    <FaAngleLeft style={{fontSize:40,borderRadius:20,border:'1px solid black',marginRight:10}} onClick={Decrement} />
                    {(high-low)==4 &&<FaAngleRight  style={{fontSize:40,borderRadius:20,border:'1px solid black',marginLeft:10}}  onClick={Increment}/>}
                    </div>
                
            </>
        }
    </>
    )
}
export default Carousel