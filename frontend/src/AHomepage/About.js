import React from 'react';
import Table3 from '../images/Table-3.png'
import { AiFillPhone } from "react-icons/ai";
import { FaShieldAlt, FaTruck } from "react-icons/fa";

const About = () => {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-stone-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">

                {/* Left side Image */}
                <div className="relative h-64 lg:h-auto bg-stone-100">
                    <img 
                        src={Table3} 
                        alt="High quality furniture" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white"></div>
                </div>

                {/* Right side content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                    
                    <div className="mb-8">
                        <span className="text-brand font-bold tracking-wider uppercase text-xs">About Us</span>
                        <h2 className="text-3xl font-black text-stone-900 mt-2 mb-4 leading-tight">
                            Build to last. <br/>
                            <span className="text-amber-600">Designed for life.</span>
                        </h2>
                        <p className="text-stone-500 text-sm leading-relaxed mb-4">
                            Founded with a simple idea: to provide high-quality, stylish furniture that combines comfort and durability. Over the years, we have grown into a trusted brand known for our commitment to excellence and customer satisfaction.
                        </p>
                        <p className="text-stone-500 text-sm leading-relaxed">
                            Each piece in our collection is crafted with meticulous attention to detail, using the finest materials and innovative design techniques. We believe that high-quality furniture should be accessible to everyone, which is why we offer competitive prices without compromising on quality.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-100 mt-auto">
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                                <FaTruck size={18} />
                            </div>
                            <h4 className="text-sm font-bold text-stone-800">Free Delivery</h4>
                            <span className="text-xs text-stone-400 mt-1">On all orders</span>
                        </div>
                        
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                                <FaShieldAlt size={18} />
                            </div>
                            <h4 className="text-sm font-bold text-stone-800">Premium Quality</h4>
                            <span className="text-xs text-stone-400 mt-1">Built to last</span>
                        </div>

                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                                <AiFillPhone size={20} />
                            </div>
                            <h4 className="text-sm font-bold text-stone-800">24/7 Support</h4>
                            <span className="text-xs text-stone-400 mt-1">Ready to help</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default About