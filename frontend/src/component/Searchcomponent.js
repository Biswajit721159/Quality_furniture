import React, { useEffect, useState, useCallback } from 'react'
import '../css/Searchcomponent.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { searchProduct } from '../redux/ProductSlice'
import { productmethod } from '../redux/ProductSlice';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import _ from 'lodash';
const api = process.env.REACT_APP_API;
const Searchcomponent = () => {

    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state?.user)?.user
    const history = useNavigate()
    const location = useLocation();
    let { lowerLimit, higherLimit, lowprice, searchproduct, highprice, selectcatagory } = useSelector((state) => state?.product)
    const [search, setsearch] = useState(searchproduct);
    const [productNames, setProductNames] = useState([]);

    // console.log("searchproduct is ", searchproduct);

    useEffect(() => {
        FetchProductName();
    }, [])

    useEffect(() => {
        debouncedSearch(search);
        return () => {
            debouncedSearch.cancel();
        };
    }, [search])

    const FetchProductName = async () => {
        let productDetail = await fetch(`${api}/product/getProductName`);
        let data = await productDetail.json();
        setProductNames(data?.data);
    }

    function searchItem(e) {
        e.preventDefault();
        dispatch(productmethod.AddEveryThing({ lowerLimit: 0, higherLimit: 15 }))
        dispatch(searchProduct({ lowprice, highprice, selectcatagory, searchInput: searchproduct, lowerLimit: 0, higherLimit: 15, userinfo }))
    }

    function changesearch(e, newInputValue) {
        if (location.pathname != '/Product') history('/Product')
        dispatch(productmethod.setSearchProduct({ searchproduct: newInputValue }))
        setsearch(newInputValue)
    }

    const debouncedSearch = useCallback(
        _.debounce(async (searchTerm) => {
            if (searchTerm) {
                dispatch(productmethod.AddEveryThing({ lowerLimit: 0, higherLimit: 15 }))
                dispatch(searchProduct({ lowprice, highprice, selectcatagory, searchInput: searchTerm, lowerLimit: 0, higherLimit: 15, userinfo }))
            }
        }, 500),
        []
    );

    return (
        <>
            <form onSubmit={(e) => searchItem(e)}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    inputValue={searchproduct}
                    onInputChange={changesearch}
                    options={productNames}
                    sx={{
                        width: 250,
                        backgroundColor: 'white',
                        borderRadius: 1,
                        marginRight: 2
                    }}
                    size="small"
                    getOptionLabel={(option) => option.product_name}
                    renderOption={(props, option) => (
                        <li {...props} style={{ fontSize: 10 }}>
                            <img src={option.photo} alt={option.product_name.substring(0, 30)} style={{ marginRight: 10, height: 20, width: 20 }} />
                            {option.product_name}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Search Furniture" />}
                />
            </form>

            {/* <div className='Searchcomponent mt-1'>
                <div className='searchfrom'>
                    <div className="form-inline my-2 my-lg-0 mr-3">
                        <form onSubmit={(e) => searchItem(e)}>
                            <input className="form-control1 mr-sm-2"
                                spellCheck='false' type="search"
                                placeholder="Search Furniture"
                                value={searchproduct}
                                onChange={(e) => changesearch(e)}
                                aria-label="Search" />
                        </form>
                    </div>
                </div>
            </div> */}

        </>
    )
}


export default Searchcomponent