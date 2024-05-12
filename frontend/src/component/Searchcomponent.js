import React, { useState } from 'react'
import '../css/Searchcomponent.css'
import { useDispatch, useSelector } from "react-redux";
import { productmethod } from '../redux/ProductSlice'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
const Searchcomponent = () => {

    const dispatch = useDispatch();
    let { allproduct, searchproduct } = useSelector((state) => state.product)
    const [search, setsearch] = useState(searchproduct);
    const history = useNavigate()
    const location = useLocation();

    function changesearch(e) {
        if (location.pathname != '/Product') history('/Product')
        dispatch(productmethod.Addsearch({ searchinput: e.target.value, allproduct }));
        setsearch(e.target.value)
    }

    return (
        <div className='Searchcomponent mt-1'>
            <div className='searchfrom'>
                <div className="form-inline my-2 my-lg-0 mr-3">
                    <input className="form-control1 mr-sm-2"
                        spellCheck='false' type="search"
                        placeholder="Search Furniture"
                        value={search}
                        onChange={(e) => changesearch(e)}
                        aria-label="Search" />
                </div>
            </div>
        </div>
    )
}

export default Searchcomponent