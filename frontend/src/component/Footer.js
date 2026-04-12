import React from "react";
import { Link } from "react-router-dom";
import { CiHeadphones } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaShoppingCart } from "react-icons/fa";
import { GiIndiaGate, GiJapaneseBridge, GiUsaFlag, GiRoyalLove } from "react-icons/gi";
import { LuRussianRuble } from "react-icons/lu";
import { SiIledefrancemobilites } from "react-icons/si";
import { MdOutlineSell } from "react-icons/md";
import { IoMdReorder } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";

const Footer = () => {
    const linkClass = "flex items-center gap-2 text-stone-400 hover:text-amber-400 transition-colors text-sm py-0.5";
    const headingClass = "text-white font-semibold text-base mb-4 pb-2 border-b border-stone-700";

    return (
        <footer className="bg-stone-900 mt-8">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                    {/* Brand / Locations */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🪑</span>
                            <span className="text-white font-bold text-lg">QU<span className="text-amber-500">Furniture</span></span>
                        </div>
                        <p className="text-stone-400 text-xs leading-relaxed mb-4">
                            Premium quality furniture for your home and office. Crafted with care, delivered with love.
                        </p>
                        <h4 className={headingClass}>Locations</h4>
                        <ul className="space-y-1">
                            <li className={linkClass}><GiIndiaGate size={14} /> India</li>
                            <li className={linkClass}><GiJapaneseBridge size={14} /> Japan</li>
                            <li className={linkClass}><LuRussianRuble size={14} /> Russia</li>
                            <li className={linkClass}><GiUsaFlag size={14} /> USA</li>
                            <li className={linkClass}><SiIledefrancemobilites size={14} /> France</li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={headingClass}>Quick Links</h4>
                        <ul className="space-y-1">
                            <li><Link to="/Product" className={linkClass}><MdOutlineSell size={14} /> Buy Products</Link></li>
                            <li><Link to="/wishList" className={linkClass}><GiRoyalLove size={14} /> Wishlist</Link></li>
                            <li><Link to="/Cart" className={linkClass}><FaShoppingCart size={13} /> Cart</Link></li>
                            <li><Link to="/Myorder" className={linkClass}><IoMdReorder size={14} /> My Orders</Link></li>
                            <li>
                                <a href="https://quality-furnitureadminpanel.vercel.app/" target="_blank" rel="noreferrer" className={linkClass}>
                                    <RiAdminFill size={14} /> Admin Panel
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className={headingClass}>Contact Info</h4>
                        <ul className="space-y-2">
                            <li className={linkClass}><CiHeadphones size={16} /> +123-456-7890</li>
                            <li className={linkClass}><CiHeadphones size={16} /> +111-222-3333</li>
                            <li className="flex items-start gap-2 text-stone-400 text-sm py-0.5">
                                <MdEmail size={15} className="mt-0.5 flex-shrink-0" />
                                <span>biswajit2329@gmail.com</span>
                            </li>
                            <li className="flex items-start gap-2 text-stone-400 text-sm py-0.5">
                                <MdEmail size={15} className="mt-0.5 flex-shrink-0" />
                                <span>biswajit@riktamtech.com</span>
                            </li>
                            <li className="flex items-start gap-2 text-stone-400 text-sm py-0.5">
                                <FaLocationDot size={14} className="mt-0.5 flex-shrink-0 text-amber-500" />
                                <span>Hyderabad, India - 500016</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className={headingClass}>Follow Us</h4>
                        <ul className="space-y-1">
                            {[
                                { Icon: FaFacebook, label: 'Facebook', color: 'hover:text-blue-400' },
                                { Icon: FaTwitter, label: 'Twitter', color: 'hover:text-sky-400' },
                                { Icon: FaInstagram, label: 'Instagram', color: 'hover:text-pink-400' },
                                { Icon: FaLinkedinIn, label: 'LinkedIn', color: 'hover:text-blue-300' },
                                { Icon: FaYoutube, label: 'YouTube', color: 'hover:text-red-400' },
                            ].map(({ Icon, label, color }) => (
                                <li key={label}>
                                    <a href="/" className={`flex items-center gap-2 text-stone-400 ${color} transition-colors text-sm py-0.5`}>
                                        <Icon size={14} /> {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-stone-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-stone-500 text-xs">
                        © 2024 QUFurniture. All rights reserved.
                    </p>
                    <p className="text-stone-500 text-xs">
                        Made with ❤️ by <span className="text-amber-400 font-semibold">Mr. Biswajit Ghosh</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer