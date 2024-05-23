import React, { useEffect, useState, useCallback } from 'react'
import '../css/Searchcomponent.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { loadProduct } from '../redux/ProductSlice'
import _ from 'lodash';
const Searchcomponent = () => {

    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state?.user)?.user
    const history = useNavigate()
    const location = useLocation();
    let { lowerLimit, higherLimit, lowprice, searchproduct, highprice, selectcatagory } = useSelector((state) => state?.product)
    const [search, setsearch] = useState(searchproduct);


    function changesearch(e) {
        if (location.pathname != '/Product') history('/Product')
        setsearch(e.target.value)
    }

    const debouncedSearch = useCallback(
        _.debounce(async (searchTerm) => {
            if (searchTerm) {
                dispatch(loadProduct({ lowprice, highprice, selectcatagory, searchInput: searchTerm, lowerLimit, higherLimit, userinfo }))
            }
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(search);
        return () => {
            debouncedSearch.cancel();
        };
    }, [search])

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