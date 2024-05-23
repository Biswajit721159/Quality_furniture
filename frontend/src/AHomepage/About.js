import React from 'react';
import Table3 from '../images/Table-3.png'
import { AiFillCar, AiFillPhone, AiOutlineCheckCircle } from "react-icons/ai";
import { MdDirectionsBike } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { RiEBikeFill } from "react-icons/ri";
import '../css/About.css'
const About = () => {
    return (
        <div className=' mt-2 shadow-none p-3 mb-5 bg-light rounded gradient-background'>
            <h3 className='headline1' style={{color:'green'}}>About us</h3>
            <h1 className='headline2' style={{color:'green'}} > WHY CHOOSE US? </h1>
            <div className='gradient-background'>
                <div className="imageitem" >
                    <img src={Table3} className="imageitem" alt="Error" />
                </div>
                <div style={{ color: 'gray' }}>
                    <h3 className='headline2 mt-4' style={{color:'green'}}>Best Quality Furniture in the country</h3>
                    <p className='headline1' style={{color:"grey"}}><strong style={{color:'green'}}>(About us ):</strong> Our luxury coaches offer a premium travel experience with plush, reclining seats, ample legroom, and onboard amenities such as Wi-Fi, charging ports, and entertainment systems. Sit back, relax, and enjoy the journey in style.</p>
                    <p className='headline1' style={{color:"grey"}}><strong style={{color:'green'}}>(Our story ):</strong> Founded in [Year], QUFurniture started with a simple idea: to provide high-quality, stylish furniture that combines comfort and durability. Over the years, we have grown into a trusted brand known for our commitment to excellence and customer satisfaction.</p>
                    <p className='headline1' style={{color:"grey"}}><strong style={{color:'green'}}>(Our commitment ):</strong>At QUFurniture, we are passionate about creating furniture that not only looks great but also stands the test of time. Each piece in our collection is crafted with meticulous attention to detail, using the finest materials and innovative design techniques. Whether you're furnishing a cozy apartment or a spacious home, our wide range of products ensures that you will find something that perfectly fits your needs.</p>
                    <p className='headline1' style={{color:"grey"}}><strong style={{color:'green'}}>(Uality and durability):</strong>Our furniture is built to last, made from premium materials that ensure longevity and durability. We offer a diverse selection of styles, from contemporary to classic, so you can find the perfect match for your home decor.We believe that high-quality furniture should be accessible to everyone, which is why we offer competitive prices without compromising on quality.</p>
                    <p className='headline1' style={{color:"grey"}}><strong style={{color:'green'}}>(Our vision):</strong> Our vision at QUFurniture is to be the go-to destination for anyone looking to create a beautiful, comfortable home. We are constantly exploring new trends and innovations to bring you the best in furniture design and functionality.</p>
                    <p className='headline1' style={{color:"grey"}}><strong style={{color:'green'}}>(Charter bus):</strong> Whether you're planning a family reunion, corporate retreat, or group excursion, our charter buses are the ideal choice for large group travel. With spacious interiors, onboard restrooms, and experienced drivers, we'll take you wherever you need to go with ease.</p>
                    <p className='headline1' style={{color:"grey"}}><strong style={{color:'green'}}>(Shuttle):</strong> Make your airport transfer hassle-free with our convenient airport shuttle service. We offer regular departures to and from major airports, ensuring timely arrivals and departures for passengers traveling to catch their flights.</p>
    
                    <div className="row1 mt-5">
                        <div className="col1 shadow p-2 mb-5 bg-white rounded" >
                            <RiEBikeFill className='icon' />
                            <span className='headline1'>Free Delivery</span>
                        </div>
                        <div className="col1 shadow p-2 mb-5 bg-white rounded" >
                            <FaRupeeSign className='icon' />
                            <span className='headline1'>Easy Payments</span>
                        </div>
                        <div className="col1 shadow p-2 mb-5 bg-white rounded" >
                            <AiFillPhone className='icon' />
                            <span className='headline1'>24/7 Service</span>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default About