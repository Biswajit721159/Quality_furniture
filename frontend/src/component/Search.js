import React, { useState } from "react";
import '../css/Search.css'
import { useDispatch,useSelector } from "react-redux";
import {searchmethod} from '../redux/SearchSlice'
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
const Search=()=>{
    const [search,setsearch]=useState('');
    const dispatch=useDispatch();
    let value=useSelector((state)=>state.Search_Name.search_Name)
    const history=useNavigate()
    const location = useLocation();
    function changesearch(e)
    {
        if(location.pathname!='/Product') history('/Product')
        dispatch(searchmethod.SET_SEARCH(e.target.value));
        setsearch(e.target.value)
    }
    function Submit()
    {
        history('/Product')
        dispatch(searchmethod.SET_SEARCH(search));
    }
    return(
        <>
            <div class="form-inline my-2 my-lg-0 mr-3">
                <input class="form-control1 mr-sm-2" type="search" placeholder="Search Product" value={value} onChange={(e)=>changesearch(e)}  aria-label="Search"/>
                <button class="btn btn-outline-success btn-sm my-2 my-sm-0" onClick={Submit} type="submit">Search</button>
            </div>
        </>
    )
}
export default Search