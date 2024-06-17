import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import swal from "sweetalert";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Myorder.css'
import Loader from './Loader';
import { LoadOrder } from '../redux/OrderSlice';
import Loading from './Loading';
export default function Myorder() {

    const dispatch = useDispatch()
    const userinfo = useSelector((state) => state.user)?.user
    const { Order, loadingOrder, LowerLimit, next, UpperLimit } = useSelector((state) => state?.Order)

    useEffect(() => {
        if (Order?.length === 0) loadproduct();
    }, [])

    function loadproduct() {
        dispatch(LoadOrder({ userinfo, LowerLimit, UpperLimit }))
    }

    function showaddress(data) {
        swal(data)
    }

    return (
        <>
            {
                loadingOrder === true && Order?.length === 0 ?
                    <Loader />
                    :
                    Order?.length != 0 ?
                        <>
                            <table className="table table-borderless" >
                                <thead>
                                    <tr>
                                        <th className='text-center' scope="col">Product Name</th>
                                        <th className='text-center' scope="col">Booking Date</th>
                                        <th className='text-center' scope="col">Address</th>
                                        <th className='text-center' scope='col'>Status</th>
                                        <th className='text-center' scope="col">Feedback</th>
                                    </tr>
                                </thead>
                                {
                                    <tbody>
                                        {
                                            Order?.map((item, ind) => (
                                                <tr key={ind}>
                                                    <td className='text-center'>
                                                        <div className="card1234">
                                                            <Link to={`/Product/${item.product_id}`}>
                                                                <img className="card-img-top1" src={item.newImage[0]} alt="Card image cap" />
                                                            </Link>
                                                            <Link to={`/Product/${item.product_id}`} style={{ textDecoration: 'none' }}>
                                                                <p className='product_name text-center mt-1' style={{ color: 'black' }}>{item?.product_name} X {item?.product_count}=₹{item?.Total_rupess}</p>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>{item?.Date}</td>
                                                    <td className='text-center' onClick={() => { showaddress(item?.address) }}>
                                                        <Button variant="contained" size="small" color="info">Address</Button>
                                                    </td>
                                                    <td className='text-center'><Button variant="contained" size="small" disabled={true}>{item?.status}</Button></td>
                                                    {
                                                        item.isfeedback ?
                                                            <td className='text-center'>
                                                                <Button variant="contained" size="small" color="success" disabled>Feedback</Button>
                                                            </td>
                                                            :
                                                            <td className='text-center'>
                                                                <Link to={`/${item?.id}/${item?.product_id}/Reviews`}>
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
                            <div className='PrevNext mb-4'>
                                {
                                    loadingOrder ? <Loading /> : next && <Button variant='contained' onClick={loadproduct} color='warning'>Load More</Button>
                                }
                            </div>
                        </>
                        :
                        <div className='loader-container'>
                            <Link to={'/Product'}><Button size='small' variant="contained" color='success'>ORDER PRODUCTS</Button></Link>
                        </div>
            }
        </>
    )
}
