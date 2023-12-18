import React from 'react';
import Table1 from '../images/Table-1.png';
import Table2 from '../images/Table-2.png'
import Table3 from '../images/Table-3.png'
import chair from '../images/chair.avif'
import {Link} from 'react-router-dom'
import {AiFillCar,AiFillPhone,AiOutlineCheckCircle } from "react-icons/ai";
export default function Product() {


  return (
    <div className='container-xxl mt-3'>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
               <div className="carousel-item">
                    <img className="d-block w-100" src={Table2} style={{height:"600px", width:"140px"}}  alt="Third slide"/>
                </div>
                <div className="carousel-item active">
                    <img className="d-block w-100" src={Table3} style={{height:"600px", width:"140px"}} alt="second slide"/>
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
</div>



            <div className=' mt-1 shadow-none p-3 mb-5 bg-light rounded'>
                <h3 className='d-flex justify-content-center' style={{color:"green"}}>about us</h3>
                <h1 className='d-flex justify-content-center'> WHY CHOOSE US? </h1>
                <div > 
                    <div class="image">
                        <img src={chair} alt="" style={{width: "100%",height:"500px"}}/>
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


<div className="container footer">
        <section className="mainfooter">
            <div className="box-container">
                <div className="box">
                    <h3>Locations</h3>
                    <li>India</li>
                    <li>Japan</li>
                    <li>Russia</li>
                    <li>USA</li>
                    <li>France</li>
                </div>
                <div class="box">
                    <h3>Quick Links</h3>
                    <li><Link to="/Product">Buy Product</Link></li>
                    <li><Link to="/addproduct">Add Product</Link></li>
                    <li><Link to="/wishList">wishList</Link></li>
                    <li><Link to="/Cart">Cart</Link></li>
                    <li><Link to="/Myorder">Myorder</Link></li>
                </div>
                <div class="box">
                  <h3>Contact Info</h3>
                  <li>+123-456-7890</li>
                  <li>+111-222-3333</li>
                  <li>biswajit2329@gmail.com</li>
                  <li>biswajit@riktamtech.com</li>
                  <li>Hyderabad , india - 500016</li>
                </div>
                <div class="box">
                    <h3>Follow us</h3>
                    <li><a href="#">facebook</a></li>
                    <li><a href="#">twitter</a></li>
                    <li><a href="#">instagram</a></li>
                    <li><a href="#">linkedin</a></li>
                </div>
            </div>
            <hr/>
            <div className="credit"> Copyright @ 2023 by <span>Mr Biswajit Ghosh</span> </div>
        </section>
    </div>
</div>
  )
}
