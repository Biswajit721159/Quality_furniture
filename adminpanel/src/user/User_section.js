import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Usershow from "./Usershow";
import { loadUser } from "../redux/AllUserSlice";
import { TextField, Container, Button } from '@mui/material';
import _ from 'lodash';
import { Allusermethod } from "../redux/AllUserSlice";
import Loading from "../component/Loading";
import { IoMdRefresh } from "react-icons/io";

const User_Section = () => {
    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state?.user?.user);
    const { Alluser, userLoading, LowerLimit, UpperLimit, searchvalue } = useSelector((state) => state?.Alluser);
    const [searchValue, setsearchValue] = useState(searchvalue);

    useEffect(() => {
        if (Alluser?.length === 0) loaduser()
    }, [])

    function loaduser() {
        dispatch(loadUser({ LowerLimit: 0, UpperLimit: 10, userinfo }))
    }

    const handleInputChange = (e) => {
        setsearchValue(e.target.value);
        dispatch(Allusermethod.setSearchValue(e.target.value))
    };

    const debouncedSearch = useCallback(
        _.debounce(async (searchValue) => {
            if (searchValue) {
                dispatch(Allusermethod.SetLowerLimitHighLimit({ LowerLimit: 0, UpperLimit: 10 }))
                dispatch(loadUser({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: searchValue }))
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
        dispatch(Allusermethod.Reset({ Alluser: [], LowerLimit: 0, UpperLimit: 10, prev: false, next: false, searchvalue: '', userLoading: false }))
        dispatch(loadUser({ LowerLimit: 0, UpperLimit: 10, userinfo, searchvalue: '' }))
    }
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
                    placeholder="Enter Email or Name"
                    size="small"
                    style={{ marginTop: '5px' }}
                    spellCheck='false'
                />
            </Container>
            {
                userLoading === true && Alluser?.length === 0 ?
                    <Loading />
                    : <Usershow />
            }
        </>
    )
}

export default User_Section