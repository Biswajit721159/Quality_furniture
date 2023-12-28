import React,{useState,useEffect} from "react";
import data from '../constant/carousel'
import '../css/Homepage1.css'
const Homepage1=()=>{
    const [index,setindex]=useState(0)

    function next()
    {
        setindex((index+1)%data.length)
    }

    function prev()
    {
        setindex((index+1)%data.length)
    }

    useEffect(()=>{
        let x=setTimeout(() => {
            next()
        }, 2000);
        return()=>{
            clearInterval(x);
        }
    },[index])
    return(
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {
                    data.map((item,ind)=>(
                        ind==index?
                        <div className="carousel-item active" key={ind}>
                           <img className="d-block w-100" id="image" src={item} alt="slide"/>
                           <a className="carousel-control-prev" href="#carouselExampleControls" onClick={prev} role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" style={{backgroundColor:"black",borderRadius:"10px"}}  aria-hidden="true"></span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" onClick={next} role="button" data-slide="next">
                                <span className="carousel-control-next-icon" style={{backgroundColor:"black",borderRadius:"10px"}}  aria-hidden="true"></span>
                            </a>
                        </div>
                        :""
                    ))
                }
            </div>
    </div>
    )
}
export default Homepage1