import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Usershow from "./Ordershow";
import Loading from '../component/Loading'
import { loadOrder } from '../redux/OrderSlice'
import { TextField, Container, Button } from '@mui/material';
import { Link } from "react-router-dom";
import _ from 'lodash';
import { IoMdRefresh } from "react-icons/io";
import { ordermethod } from "../redux/OrderSlice"
const Order_Section = () => {

    const dispatch = useDispatch()
    const userinfo = useSelector((state) => state?.user?.user);
    const { orderLoading, LowerLimit, UpperLimit, searchvalue, Order } = useSelector((state) => state.Order);
    let [searchValue, setsearchValue] = useState(searchvalue);

    useEffect(() => {
        if (Order?.length === 0) dispatch(loadOrder({ LowerLimit, UpperLimit, searchvalue, userinfo }));
    }, [])

    const debouncedSearch = useCallback(
        _.debounce(async (searchValue) => {
            if (searchValue) {
                dispatch(ordermethod.SetLowerLimitHighLimit({ LowerLimit: 0, UpperLimit: 10 }))
                dispatch(loadOrder({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: searchValue }))
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
        dispatch(ordermethod.Reset({ Order: [], LowerLimit: 0, UpperLimit: 10, prev: false, next: false, searchvalue: '', orderLoading: false }))
        dispatch(loadOrder({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: '' }))
    }

    const handleInputChange = (e) => {
        setsearchValue(e.target.value);
        dispatch(ordermethod.ADD_SEARCH_VALUE(e.target.value));
    };

    return (
        <>
            <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <Link style={{ marginTop: '5px', marginLeft: '20px' }} onClick={() => reset()}>
                    <Button variant="contained" color="warning" startIcon={<IoMdRefresh size={'20px'} />}>
                        Refresh
                    </Button>
                </Link>
                <TextField
                    variant="outlined"
                    value={searchValue}
                    onChange={handleInputChange}
                    placeholder="Enter Email.."
                    size="small"
                    style={{ marginTop: '5px' }}
                    spellCheck='false'
                />
            </Container >
            {
                orderLoading === true && Order?.length === 0 ?
                    <Loading />
                    : <Usershow />
            }
        </>
    )
}

export default Order_Section