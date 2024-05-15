import React from 'react';
import Footer from '../component/Footer'
import SubComponent from './SubComponent';
import Homepage1 from '../AHomepage/Homepage1';
import About from '../AHomepage/About';
import Contact from '../AHomepage/Contact';
import Catagory from '../AHomepage/Catagory'
export default function Product() {

  return (
    <div className='container-sm'>
      <Homepage1 />
      <Catagory />
      <SubComponent />
      <About />
      {/* <Contact/> */}
      <Footer />
    </div>
  )
}
