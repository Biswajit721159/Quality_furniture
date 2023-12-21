import React, { useEffect, useState } from 'react';
import Table1 from '../images/Table-1.png';
import Table2 from '../images/Table-2.png'
import Table3 from '../images/Table-3.png'
import chair from '../images/chair.avif'
import {Link} from 'react-router-dom'
import {AiFillCar,AiFillPhone,AiOutlineCheckCircle } from "react-icons/ai";
import data from '../constant/carousel'
import Footer from '../component/Footer'
export default function Product() {


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
        }, 1500);
        return()=>{
            clearInterval(x);
        }
    },[index])

  return (
    <div className='container-sm'>


        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {
                    data.map((item,ind)=>(
                        ind==index?
                        <div className="carousel-item active" key={ind}>
                           <img className="d-block w-100" src={item} style={{height:"600px", width:"140px"}} alt="second slide"/>
                           <a className="carousel-control-prev" href="#carouselExampleControls" onClick={prev} role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" style={{backgroundColor:"black",borderRadius:"10px"}}  aria-hidden="true"></span>
                                {/* <span className="sr-only">Previous</span> */}
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" onClick={next} role="button" data-slide="next">
                                <span className="carousel-control-next-icon" style={{backgroundColor:"black",borderRadius:"10px"}}  aria-hidden="true"></span>
                                {/* <span className="sr-only" >Next</span> */}
                            </a>
                        </div>
                        :""
                    ))
                }
               {/* <div className="carousel-item">
                    <img className="d-block w-100" src={Table2} style={{height:"600px", width:"140px"}}  alt="Third slide"/>
                </div>
                <div className="carousel-item active">
                    <img className="d-block w-100" src={chair} style={{height:"600px", width:"140px"}} alt="second slide"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={Table1} style={{height:"600px", width:"140px"}}  alt="first slide"/>
                </div> */}
            </div>
    </div>


    {/* <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
               <div className="carousel-item">
                    <img className="d-block w-100" src={Table2} style={{height:"600px", width:"140px"}}  alt="Third slide"/>
                </div>
                <div className="carousel-item active">
                    <img className="d-block w-100" src={chair} style={{height:"600px", width:"140px"}} alt="second slide"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={Table1} style={{height:"600px", width:"140px"}}  alt="first slide"/>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" style={{backgroundColor:"black"}}  aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" style={{backgroundColor:"black"}}  aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
            </div>
    </div> */}

    <div className=' mt-1 shadow-none p-3 mb-5 bg-light rounded'>
        <h3 className='d-flex justify-content-center' style={{color:"green"}}>About us</h3>
        <h1 className='d-flex justify-content-center'> WHY CHOOSE US? </h1>
        <div > 
            <div class="image">
                <img src={Table3} alt="" style={{width: "100%",height:"500px"}}/>
            </div>
            <div >
                <h3>Best Quality Furniture in the country</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sequi corrupti corporis quaerat voluptatem ipsam neque labore modi autem, saepe numquam quod reprehenderit rem? Tempora aut soluta odio corporis nihil!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, nemo. Sit porro illo eos cumque deleniti iste alias, eum natus.</p>
                <div class="row d-flex justify-content-center-mt-3">
                    <div class="col shadow p-3 mb-5 bg-white rounded" style={{border:"3px solid green" ,textAlign:"center"}}>
                        <AiFillCar/>
                        <span>free delivery</span>
                    </div>
                    <div class="col shadow p-3 mb-5 bg-white rounded" style={{border:"3px solid green" ,textAlign:"center"}}>
                        <AiOutlineCheckCircle/>
                        <span>easy payments</span>
                    </div>
                    <div class="col shadow p-3 mb-5 bg-white rounded" style={{border:"3px solid green" ,textAlign:"center"}}>
                        <AiFillPhone/>
                        <span>24/7 service</span>
                    </div>
                </div>    
            </div>
        </div> 
    </div>

    <Footer/>
</div>


  )
}
