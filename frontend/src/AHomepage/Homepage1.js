import React, { useState, useEffect } from "react";
import data from '../constant/carousel'
import '../css/Homepage1.css'
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
const Homepage1 = () => {
    const [index, setindex] = useState(0)

    function next() {
        setindex((index + 1) % data.length)
    }

    function prev() {
        setindex((index + 1) % data.length)
    }

    useEffect(() => {
        let x = setTimeout(() => {
            next()
        }, 5000);
        return () => {
            clearInterval(x);
        }
    }, [index])
    return (
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {
                    data.map((item, ind) => (
                        ind == index ?
                            <div className="carousel-item active" key={ind}>
                                <img className="d-block w-100" id="image" src={item} alt="" />
                                <a className="carousel-control-prev" onClick={prev} role="button" data-slide="prev">
                                    <FcPrevious style={{ backgroundColor: "black", borderRadius: "10px", fontSize: '15px', cursor: 'pointer' }} />
                                </a>
                                <a className="carousel-control-next" onClick={next} role="button" data-slide="next">
                                    <FcNext style={{ backgroundColor: "black", borderRadius: "10px", fontSize: '15px', cursor: 'pointer' }} />
                                </a>
                            </div>
                            : ""
                    ))
                }
            </div>
        </div>
    )
}
export default Homepage1