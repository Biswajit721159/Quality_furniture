import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Product_show from "./Product_show";
import { TextField, Container } from '@mui/material';
import _ from 'lodash';
import { loadProduct } from "../redux/ProductSlice";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { FaPlus } from "react-icons/fa6";
import Loading from "../component/Loading";
import { productmethod } from "../redux/ProductSlice"
import { IoMdRefresh } from "react-icons/io";
const Product_Section = () => {

    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state?.user?.user);
    const { productLoading, LowerLimit, UpperLimit, product } = useSelector((state) => state?.product);
    let searchvalue = useSelector((state) => state?.product?.searchvalue);
    const [searchValue, setsearchValue] = useState(searchvalue);

    useEffect(() => {
        if (product?.length === 0) loadproduct()
    }, [])

    function loadproduct() {
        dispatch(loadProduct({ LowerLimit, UpperLimit, userinfo, searchvalue }))
    }

    const handleInputChange = (e) => {
        setsearchValue(e.target.value);
        dispatch(productmethod.ADD_SEARCH_VALUE(e.target.value));
    };

    const debouncedSearch = useCallback(
        _.debounce(async (searchValue) => {
            if (searchValue) {
                dispatch(productmethod.SetLowerLimitHighLimit({ LowerLimit: 0, UpperLimit: 10 }))
                dispatch(loadProduct({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: searchValue }))
            }
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(searchValue);
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchValue])

    function reset() {
        setsearchValue('')
        dispatch(productmethod.Reset({ product: [], LowerLimit: 0, UpperLimit: 10, prev: false, next: false, searchvalue: '', productLoading: false }))
        dispatch(loadProduct({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: '' }))
    }

    return (
        <>
            <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <Link to={'/Product/AddProduct'} style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', textDecoration: 'none' }}>
                    <Button variant="contained" style={{ marginTop: '5px' }} color="success" startIcon={<FaPlus />}>
                        Add
                    </Button>
                    <Link style={{ marginTop: '5px', marginLeft: '20px' }} onClick={() => reset()}>
                        <Button variant="contained" color="warning" startIcon={<IoMdRefresh size={'20px'} />}>
                            Refresh
                        </Button>
                    </Link>
                </Link>
                <TextField
                    variant="outlined"
                    value={searchValue}
                    onChange={handleInputChange}
                    placeholder="Enter Name or Type"
                    size="small"
                    style={{ marginTop: '5px' }}
                    spellCheck='false'
                />

            </Container >
            {
                productLoading === true && product?.length === 0 ?
                    <Loading />
                    : <Product_show />
            }
        </>
    )
}

export default Product_Section