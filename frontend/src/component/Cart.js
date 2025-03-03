import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BeatLoader, ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { GrAdd } from "react-icons/gr";
import { GrSubtract } from "react-icons/gr";
import Button from '@mui/material/Button';
import '../css/cart.css'
import Loader from './Loader'
import { LoadCart, AddToCartDB, RemoveToDB } from '../redux/CartSlice'
import { Ordermethod } from '../redux/OrderSlice';
import { toast } from 'react-toastify'
const api = process.env.REACT_APP_API
export default function Cart() {

    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state.user)?.user
    let { product, loadingcart, product_Price, loadingcartcount } = useSelector((state) => state.cartdata);
    const [address, setaddress] = useState()
    const [button, setbutton] = useState("PLACE ORDER")
    const [disabled, setdisabled] = useState(false)

    const history = useNavigate()

    useEffect(() => {
        if (userinfo === null) {
            history('/Signin')
        }
        else {
            setaddress(userinfo?.user?.address)
            if (userinfo?.user?.email && userinfo?.accessToken && Object?.keys(product)?.length === 0) {
                dispatch(LoadCart(userinfo))
            }
        }
    }, [])

    function Add_TO_CART() {
        if (product?.product_count >= product?.total_number_of_product) {
            toast.warn(`Sorry, in our stock, ${product?.total_number_of_product} products are Available.`)
        }
        else if (product?.product_count >= 5) {
            toast.warn("Sorry, your cart already has 5 products.")
        }
        else {
            dispatch(AddToCartDB({ userinfo: userinfo, product_id: product?.product_id, product_count: product?.product_count + 1, product: product }))
        }
    }

    function SUB_TO_CART() {
        if (product?.product_count <= 0) {
            toast.warn("If you want to remove the product, there is a 'Remove' button available .")
        }
        else {
            dispatch(AddToCartDB({ userinfo: userinfo, product_id: product?.product_id, product_count: product?.product_count - 1, product: product }))
        }
    }

    function submit() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        if (product?.product_count == 0) {
            toast.warn("Please Select Atleast One Product .")
            return;
        }
        setdisabled(true)
        setbutton(<BeatLoader color="#36d7b7" />)

        fetch(`${api}/order`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.accessToken}`
            },
            body: JSON.stringify({
                email: userinfo.user.email,
                address: address,
                product_id: product?.product_id,
                product_count: product?.product_count,
                payment_method: "Cash on Delivary",
                Total_rupess: product_Price,
                Date: currentDate,
            })
        }).then(responce => responce.json())
            .then((res) => {
                if (res.statusCode == 201) {
                    dispatch(Ordermethod.clearOrder())
                    setbutton("Order SuccessFull")
                    let message = (res.message, '', "success");
                    toast.success(message);
                    history('/Myorder')
                    removeTocart()
                }
                else if (res.statusCode == 498) {
                    localStorage.removeItem('user');
                    history('/Login')
                }
                else {
                    toast.warn(res.message)
                    setdisabled(false)
                    setbutton("PLACE ORDER")
                }
            }).catch((error) => {
                history('*')
            })
    }

    function removeTocart() {
        dispatch(RemoveToDB({ userinfo: userinfo, product_id: product?.product_id, product_count: product?.product_count, product: product }))
    }



    return (
        <>
            {
                loadingcart == true ?
                    <Loader /> :
                    Object?.keys(product)?.length !== 0 ?
                        <>
                            <h6 className='pricedetail mt-3' style={{ textAlign: 'center', color: "red" }}>*If You Want to Change Your Address Go to <Link to={'/Profile'}><strong style={{ color: 'blue', cursor: 'pointer' }}>Your Profile Section </strong></Link></h6>
                            <div className='cartitem mt-4'>

                                <div className='item1'>
                                    <div className='insideritem'>
                                        <Link to={`/Product/${product?._id}`}><img className='styleimage' src={product?.newImage?.[0]} alt='Error' /></Link>
                                    </div>
                                    <div className='col2 mt-3'>
                                        <button className='btn btn-rounded-info btn-sm' disabled={product?.product_count <= 0 ? true : false} style={{ borderRadius: '40%', outline: 'none' }} onClick={SUB_TO_CART}><GrSubtract /></button>
                                        <h4 className='cartcount'>
                                            {
                                                loadingcartcount == true ? <ClipLoader size={'12px'} color='green' /> : product?.product_count
                                            }
                                        </h4>
                                        <button className='btn btn-rounded-info btn-sm' disabled={product?.product_count >= 5 ? true : false} style={{ borderRadius: '40%', outline: 'none' }} onClick={Add_TO_CART}><GrAdd /></button>
                                    </div>
                                </div>

                                <div className='item1item2'>
                                    <h5 className='pricedetailmain' >{product?.product_name}</h5>
                                    <p className='pricedetail' style={{ color: "#D68910" }}>{product?.offer}%OFF ({product.total_number_of_product} left)</p>
                                    <h6 className='pricedetail' style={{ color: 'gray' }}>Original - <s>₹{product?.price}</s></h6>
                                    <h5 className='pricedetailmain' style={{ color: 'tomato' }}>Price - ₹{(product?.price - ((product?.price * product?.offer) / 100)).toFixed(2)}</h5>
                                    <button className='btn btn-secondary btn-sm removebutton' onClick={removeTocart}>Remove To Cart</button>
                                </div>


                                <div className='item2'>
                                    <h4 className='pricedetailmain' style={{ textAlign: 'center' }}>PRICE DETAILS</h4>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className='pricedetail'>Price ({product?.product_count} item)</td>
                                                <td className='pricedetail'>₹{product?.price * product?.product_count}</td>
                                            </tr>
                                            <tr>
                                                <td className='pricedetail'>Discount</td>
                                                <td className='pricedetail'>-₹{product?.price * product?.product_count - product_Price}</td>
                                            </tr>
                                            <tr>
                                                <td className='pricedetail'>Delivery Charges</td>
                                                <td className='pricedetail'><s>80</s> Free</td>
                                            </tr>
                                            <tr>
                                                <td className='pricedetailmain'>Total Amount</td>
                                                <td className='pricedetail'>₹{product_Price}</td>
                                            </tr>
                                            <tr>
                                                <td className='pricedetail' style={{ color: 'green' }}>You will save ₹{product?.price * product?.product_count - product_Price} on this order</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div className='buttonitem'>
                                <button className='btn btn-danger submitbutton' disabled={disabled} onClick={submit} >{button}</button>
                            </div>
                        </>
                        : <div className='loader-container'>
                            <Link to={'/Product'}><Button variant="contained" size="small" color="info">  <h4>ADD PRODUCTS</h4>  </Button></Link>
                        </div>
            }
        </>
    )
}
