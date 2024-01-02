import React from 'react';
import '../css/Main.css'
import Footer from './Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import Reviews_Section from './Reviews_Section';
import Order_section from './Order_section';
import User_section from './User_section';
import Product_Section from './Product_Section';
const Main=()=>{
    return(
        <div className="Container">
            <div className="left">
                <ui>
                    <li>
                       <Link to={'/product'}> Product Seaction</Link>
                    </li>
                    <li>
                        <Link to={'/review'}>Review Seaction</Link>
                    </li>
                    <li>
                        <Link to={'/order'}>Order Seaction</Link>
                    </li>
                </ui>
            </div>
            <div className="right">
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/product" element={<Product_Section/>}></Route>
                <Route path="/Review" element={<Reviews_Section/>}></Route>
                <Route path="/Order" element={<Order_section/>}></Route>
                <Route path="/user" element={<User_section/>}></Route>
            </Routes>
            </div>
        </div>
    )
}
export default Main