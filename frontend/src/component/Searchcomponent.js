import React,{useState} from 'react'
import '../css/Searchcomponent.css'
import { CiSearch } from "react-icons/ci";
import { useDispatch,useSelector } from "react-redux";
import {searchmethod} from '../redux/SearchSlice'
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
const Searchcomponent=()=>{

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
        <div className='Searchcomponent mt-1'>
           <div className='searchfrom'>
                <div class="form-inline my-2 my-lg-0 mr-3">
                    <input class="form-control1 mr-sm-2" type="search" placeholder="Search For Products" value={value} onChange={(e)=>changesearch(e)}    aria-label="Search"/>
                    <button class="btn btn-success my-sm-0" onClick={Submit}  type="submit"><CiSearch /></button>
                </div>
           </div>
        </div>
    )
}

export default Searchcomponent