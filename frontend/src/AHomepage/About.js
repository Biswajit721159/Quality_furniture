import React from 'react';
import Table3 from '../images/Table-3.png'
import {AiFillCar,AiFillPhone,AiOutlineCheckCircle } from "react-icons/ai";
import '../css/About.css'
const About=()=>{
    return(
        <div className=' mt-1 shadow-none p-3 mb-5 bg-light rounded'>
        <h3 className='headline1' >About us</h3>
        <h1 className='headline2'  > WHY CHOOSE US? </h1>
        <div > 
            <div className="imageitem">
                <img src={Table3} className="imageitem" alt="Error"/>
            </div>
            <div >
                <h3 className='headline2'>Best Quality Furniture in the country</h3>
                <p className='headline1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sequi corrupti corporis quaerat voluptatem ipsam neque labore modi autem, saepe numquam quod reprehenderit rem? Tempora aut soluta odio corporis nihil!</p>
                <p className='headline1'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, nemo. Sit porro illo eos cumque deleniti iste alias, eum natus.</p>
                <div className="row d-flex justify-content-center-mt-3">
                    <div className="col shadow p-2 mb-5 bg-white rounded" style={{border:"2px solid green" ,textAlign:"center"}}>
                        <AiFillCar/>
                        <span className='headline1'>free delivery</span>
                    </div>
                    <div className="col shadow p-2 mb-5 bg-white rounded" style={{border:"2px solid green" ,textAlign:"center"}}>
                        <AiOutlineCheckCircle/>
                        <span className='headline1'>easy payments</span>
                    </div>
                    <div className="col shadow p-2 mb-5 bg-white rounded" style={{border:"2px solid green" ,textAlign:"center"}}>
                        <AiFillPhone/>
                        <span className='headline1'>24/7 service</span>
                    </div>
                </div>    
            </div>
        </div> 
    </div>
    )
}

export default About