import React from "react";
import { Link } from "react-router-dom";
import { CiHeadphones } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { GiIndiaGate } from "react-icons/gi";
import { GiJapaneseBridge } from "react-icons/gi";
import { LuRussianRuble } from "react-icons/lu";
import { GiUsaFlag } from "react-icons/gi";
import { SiIledefrancemobilites } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { GiRoyalLove } from "react-icons/gi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineSell } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { IoMdReorder } from "react-icons/io";
import '../css/Footer.css'
const Footer=()=>{
    return(
        <footer className="mainfooter">
            <div className="box-container">
                <div className="box">
                    <h4>Locations</h4>
                    <li><GiIndiaGate /> India</li>
                    <li><GiJapaneseBridge /> Japan</li>
                    <li><LuRussianRuble /> Russia</li>
                    <li><GiUsaFlag /> USA</li>
                    <li><SiIledefrancemobilites /> France</li>
                </div>
                <div class="box">
                    <h4>Quick Links</h4>
                    <li><Link to="/Product"><MdOutlineSell /> Buy Product</Link></li>
                    <li><Link to="/addproduct"><IoMdAddCircleOutline /> Add Product</Link></li>
                    <li><Link to="/wishList"><GiRoyalLove /> WishList</Link></li>
                    <li><Link to="/Cart"><FaShoppingCart /> Cart</Link></li>
                    <li><Link to="/Myorder"><IoMdReorder /> MyOrder</Link></li>
                </div>
                <div class="box">
                <h4>Contact Info</h4>
                    <li><CiHeadphones/> +123-456-7890</li>
                    <li><CiHeadphones/> +111-222-3333</li>
                    <li><MdEmail /> biswajit2329@gmail.com</li>
                    <li><MdEmail /> biswajit@riktamtech.com</li>
                    <li><FaLocationArrow /> Hyderabad , india - 500016</li>
                </div>
                <div class="box">
                    <h4>Follow us</h4>
                    <li><a href="#"><FaFacebook /> Facebook</a></li>
                    <li><a href="#"><FaTwitter /> Twitter</a></li>
                    <li><a href="#"><FaInstagram /> Instagram</a></li>
                    <li><a href="#"><FaLinkedinIn /> Linkedin</a></li>
                    <li><a href="#"><FaYoutube /> Youtube</a></li>
                </div>
                <div class="box">
                    <h4>Follow us</h4>
                    <div>
                        <input className="form-control mr-sm-2" name='search' type="search" placeholder="Enter Message" aria-label="Search"/>
                    </div>
                    <li></li>
                    <li><button className="btn btn-primary btn-sm mt-1">Send</button></li>
                </div>
            </div>
            <hr/>
            <div className="credit p-2"> Copyright @ 2023 by <span>Mr Biswajit Ghosh</span> </div>
        </footer>
    )
}

export default Footer