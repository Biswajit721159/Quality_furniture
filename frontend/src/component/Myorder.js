import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from "sweetalert";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Myorder.css'
import Loader from './Loader';
import { usermethod } from '../redux/UserSlice'
const api = process.env.REACT_APP_API
export default function Myorder() {

    const dispatch = useDispatch()
    const userinfo = useSelector((state) => state.user)?.user
    const [data, setdata] = useState([])
    const history = useNavigate()
    const [load, setload] = useState(true)
    const [colormode, setcolormode] = useState(localStorage.getItem('colormode'));

    let [low, setlow] = useState(0);
    let [high, sethigh] = useState(5);
    let [prev, setprev] = useState(false);
    let [next, setnext] = useState(false);

    useEffect(() => {
        if (colormode == null) {
            setcolormode('white');
            localStorage.setItem('colormode', 'white');
        }
        if (userinfo === null) {
            dispatch(usermethod.Logout_User())
            history('/Signin')
        }
        else {
            loadproduct(0, 5);
        }
    }, [])


    function HandalError(order) {
        setload(false)
        if (order.statusCode == 201) {
            if (order.data.length == 0) return;
            let n = order.data.length;
            setdata(order.data.slice(0, n - 1));
            setprev(order.data[n - 1].prev);
            setnext(order.data[n - 1].next);
        }
        else if (order.statusCode === 498) {
            dispatch(usermethod.Logout_User())
            history('/Signin')
        }
        else if (order.statusCode === 404) {
            setdata([])
        }
        else {
            history("*")
        }
    }

    function loadproduct(low, high) {
        setload(true)
        fetch(`${api}/order/getorderByLimit/${low}/${high}/${userinfo?.user?.email}`, {
            headers: {
                Authorization: `Bearer ${userinfo?.accessToken}`
            }
        }).then(responce => responce.json()).then((order) => {
            try {
                HandalError(order)
            }
            catch {
                history('*')
            }
        })
    }

    function showaddress(data) {
        swal(data)
    }

    function PrevPage() {
        loadproduct(low - 5, high - 5);
        setlow(low - 5);
        sethigh(high - 5);
    }

    function NextPage() {
        loadproduct(low + 5, high + 5);
        setlow(low + 5);
        sethigh(high + 5);
    }

    return (
        <>
            {
                load == true ?
                    <Loader />
                    :
                    data != undefined && data.length != 0 ?
                        <>
                            <table className="table table-borderless" >
                                <thead>
                                    <tr>
                                        <th className='text-center' scope="col">Product Name</th>
                                        <th className='text-center' scope="col">Total_rupess</th>
                                        <th className='text-center' scope="col">Date</th>
                                        <th className='text-center' scope="col">Address</th>
                                        <th className='text-center' scope="col">Feedback</th>
                                    </tr>
                                </thead>
                                {
                                    <tbody>
                                        {
                                            data.map((item, ind) => (
                                                <tr key={ind}>
                                                    <td className='text-center'>
                                                        <div className="card1234">
                                                            <Link to={`/Product/${item.product_id}`}>
                                                                <img className="card-img-top1" src={item.newImage[0]} alt="Card image cap" />
                                                            </Link>
                                                            <Link to={`/Product/${item.product_id}`} style={{ textDecoration: 'none' }}>
                                                                <p className='text-center mt-1' style={{ color: 'black' }}>{item.product_name} X {item.product_count}</p>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>₹{item.Total_rupess}</td>
                                                    <td className='text-center'>{item.Date}</td>
                                                    <td className='text-center' onClick={() => { showaddress(item.address) }}>
                                                        <Button variant="contained" size="small" color="info">Address</Button>
                                                    </td>
                                                    {
                                                        item.isfeedback ?
                                                            <td className='text-center'>
                                                                <Button variant="contained" size="small" color="success" disabled>Feedback</Button>
                                                            </td>
                                                            :
                                                            <td className='text-center'>
                                                                <Link to={`/${item.id}/${item.product_id}/Reviews`}>
                                                                    <Button variant="contained" size="small" color="success">Feedback</Button>
                                                                </Link>
                                                            </td>
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                }
                            </table>
                            <div className='PrevNext mt-4 mb-4'>
                                <Button variant="contained" size="small" color="success" sx={{ m: 2 }} disabled={!prev} onClick={PrevPage}>Prev</Button>
                                <Button variant="contained" size="small" color="success" sx={{ m: 2 }} disabled={!next} onClick={NextPage}>Next</Button>
                            </div>
                        </>
                        :
                        <div className='loader-container'>
                            <Link to={'/Product'}><Button className='btn btn-info'><h4>ORDER PRODUCTS</h4></Button></Link>
                        </div>
            }
        </>
    )
}
