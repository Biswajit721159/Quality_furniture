import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/Carousel.css'
import { AiFillStar } from "react-icons/ai";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import Card from '@mui/material/Card';
const Carousel = (props) => {

    let data = props.data;
    let message = props.message;
    const [low, setlow] = useState(0);
    const [high, sethigh] = useState(data.length >= 5 ? 4 : data.length);
    const [prev, setprev] = useState(false);
    const [next, setnext] = useState(data.length >= 6 ? true : false);


    function Increment() {
        if (high == data.length - 1) {
            setnext(false)
            return
        }
        setprev(true)
        setlow(low + 1)
        sethigh(high + 1)
    }

    function Decrement() {
        if (low == 0) {
            setprev(false);
            return;
        }
        setnext(true)
        sethigh(high - 1)
        setlow(low - 1)
    }

    return (
        <>
            {data && <h6 className="product_name" style={{ color: 'gray' }}>{message}</h6>}
            <div className="carousel">
                {data && data?.map((item, ind) => (
                    <div key={ind} >
                        {ind >= low && ind <= high &&
                            <div>
                                <Link to={`/Product/${item?._id}`} style={{ textDecoration: 'none' }}>
                                    <Card sx={{ m: 0.5, maxHeight: '300px' }} >
                                        <img src={item?.newImage?.[0]} className="imgs" alt="Error" />
                                        <p className="credit card-text">{item.product_name}</p>
                                        <div className="row mx-1">
                                            <div className="container col">
                                                <p className="card-text credit" style={{ color: '#D68910 ' }}>{item.offer}% OFF</p>
                                            </div>
                                            <div className="container col">
                                                <p className="card-text credit" style={{ color: 'gray' }}><s>₹{item.price}</s></p>
                                            </div>
                                        </div>

                                        <div className='row mx-1'>
                                            <div className='col'>
                                                {
                                                    parseInt(item.rating) == 0 ? <div className="card-text credit" style={{ color: "black" }}>{item.rating}<AiFillStar /></div>
                                                        :
                                                        parseInt(item.rating) == 1 ? <div className="card-text credit" style={{ color: "tomato" }}>{item.rating}<AiFillStar /></div>
                                                            :
                                                            parseInt(item.rating) == 2 ? <div className="card-text credit" style={{ color: "red" }}>{item.rating}<AiFillStar /></div>
                                                                :
                                                                parseInt(item.rating) == 3 ? <div className="card-text credit" style={{ color: "#DC7633" }}>{item.rating}<AiFillStar /></div>
                                                                    :
                                                                    parseInt(item.rating) == 4 ? <div className="card-text credit" style={{ color: "#28B463" }}>{item.rating}<AiFillStar /></div>
                                                                        :
                                                                        parseInt(item.rating) == 5 ? <div className="card-text credit" style={{ color: "green" }}>{item.rating}<AiFillStar /></div>
                                                                            : ""
                                                }
                                            </div>
                                            <div className=" col">
                                                <h6 className="card-text credit" style={{ color: 'tomato' }}>₹{(item.price - ((item.price * item.offer) / 100)).toFixed(2)}</h6>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        }
                    </div>
                ))}
            </div>
            {data?.length >= 6 &&
                <div className="Arrowleftright mt-2">
                    <FcPrevious disabled={!prev} onClick={Decrement} style={{ backgroundColor: "black", borderRadius: "10px", fontSize: '20px', cursor: 'pointer' }} />
                    <FcNext disabled={!next} onClick={Increment} style={{ backgroundColor: "black", borderRadius: "10px", fontSize: '20px', cursor: 'pointer' }} />
                </div>
            }
        </>
    )
}
export default Carousel