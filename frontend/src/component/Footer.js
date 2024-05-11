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
import { RiAdminFill } from "react-icons/ri";
import '../css/Footer.css'
const Footer=()=>{
    return(
        <footer className="mainfooter mt-5">
            <div className="box-container">
                <div className="box">
                    <h4 className="head2">Locations</h4>
                    <li className="head1"><GiIndiaGate /> India</li>
                    <li className="head1"><GiJapaneseBridge /> Japan</li>
                    <li className="head1"><LuRussianRuble /> Russia</li>
                    <li className="head1"><GiUsaFlag /> USA</li>
                    <li className="head1"><SiIledefrancemobilites /> France</li>
                </div>
                <div className="box">
                    <h4 className="head2">Quick Links</h4>
                    <li className="head1"><Link to="/Product"><MdOutlineSell /> Buy Product</Link></li>
                    {/* <li className="head1"><Link to="/addproduct"><IoMdAddCircleOutline /> Add Product</Link></li> */}
                    <li className="head1"><Link to="/wishList"><GiRoyalLove /> WishList</Link></li>
                    <li className="head1"><Link to="/Cart"><FaShoppingCart /> Cart</Link></li>
                    <li className="head1"><Link to="/Myorder"><IoMdReorder /> MyOrder</Link></li>
                    <li className="head1"><Link to="https://quality-furnitureadminpanel.vercel.app/" target="_blank"><RiAdminFill /> Adminpanel</Link></li>
                </div>
                <div className="box">
                <h4 className="head2">Contact Info</h4>
                    <li className="head1"><CiHeadphones/> +123-456-7890</li>
                    <li className="head1"><CiHeadphones/> +111-222-3333</li>
                    <li className="head1"><MdEmail /> biswajit2329@gmail.com</li>
                    <li className="head1"><MdEmail /> biswajit@riktamtech.com</li>
                    <li className="head1"><FaLocationArrow /> Hyderabad , india - 500016</li>
                </div>
                <div className="box">
                    <h4 className="head2">Follow us</h4>
                    <li className="head1"><a href="#"><FaFacebook /> Facebook</a></li>
                    <li className="head1"><a href="#"><FaTwitter /> Twitter</a></li>
                    <li className="head1"><a href="#"><FaInstagram /> Instagram</a></li>
                    <li className="head1"><a href="#"><FaLinkedinIn /> Linkedin</a></li>
                    <li className="head1"><a href="#"><FaYoutube /> Youtube</a></li>
                </div>
                {/* <div className="box">
                    <h4 className="head2">Message US</h4>
                    <div>
                        <input className="form-control mr-sm-2" name='search' type="search" placeholder="Enter Message" aria-label="Search"/>
                    </div>
                    <li></li>
                    <li className="head2"><button className="btn btn-primary btn-sm mt-1">Send</button></li>
                </div> */}
            </div>
            <hr/>
            <div className="credit"> Copyright @ 2023 by <span>Mr Biswajit Ghosh</span> </div>
        </footer>
    )
}

export default Footer