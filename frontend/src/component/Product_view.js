import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners';
import '../css/Product_view.css'
import { useDispatch, useSelector } from 'react-redux'
import Carousel from "./Carousel";
import Product_Review from './Product_Review';
import Footer from '../component/Footer'
import Loader from './Loader';
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { AddToCartDB, RemoveToDB } from '../redux/CartSlice'
const api = process.env.REACT_APP_API

export default function Product_view() {

    const [product, setproduct] = useState(null)
    const _id = useParams()?._id
    const history = useNavigate()
    const dispatch = useDispatch();

    const userinfo = useSelector((state) => state?.user)?.user

    let [load, setload] = useState(true)
    const [relatedProduct, setrelatedProduct] = useState(null)
    const [removebutton, setremovebutton] = useState(false)
    let cartproduct = useSelector((state) => state?.cartdata?.product)

    useEffect(() => {
        loadproduct();
    }, [_id])

    function loadproduct() {
        setload(true)
        fetch(`${api}/product/${_id}`).then(response => response.json()).
            then((data) => {
                if (data.statusCode === 201) {
                    setproduct(data?.data)
                    findrelatedproduct(data?.data);
                    setload(false)
                }
                else {
                    history('*')
                }
            })

    }

    function findrelatedproduct(product) {
        if (product == null || product.product_type == null) return;
        else {
            fetch(`${api}/product/getproductByType/${product.product_type}`).
                then(response => response.json()).then((data) => {
                    if (data.statusCode === 201) {
                        setrelatedProduct(data?.data)
                    }
                })
        }
    }

    function Add_TO_CART() {
        dispatch(AddToCartDB({ userinfo: userinfo, product_id: _id, product_count: 1, product: cartproduct }))
    }

    function removeTocart() {
        dispatch(RemoveToDB({ userinfo: userinfo, product_id: cartproduct?.product_id, product_count: cartproduct?.product_count, product: cartproduct }))
    }



    return (
        <>
            {
                load === true ?
                    <Loader />
                    :
                    product !== null ?
                        <>
                            <div className='container mt-3'>
                                <div className='item'>
                                    <div className='col12'>
                                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                            <div className="carousel-inner" style={{ border: '2px solid green', borderRadius: 10 }}>
                                                <div className="carousel-item active">
                                                    <img className="d-block image" src={product.newImage[0]} alt="First slide" />
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block image" src={product.newImage[1]} alt="Second slide" />
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block image" src={product.newImage[2]} alt="Third slide" />
                                                </div>
                                            </div>
                                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                                <FcPrevious style={{ backgroundColor: "black", borderRadius: "10px", fontSize: '15px', cursor: 'pointer' }} />
                                            </a>
                                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                                <FcNext style={{ backgroundColor: "black", borderRadius: "10px", fontSize: '15px', cursor: 'pointer' }} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className='col3'>
                                        <div className="card123" >
                                            <div className="card-body">
                                                <h5 className="card-title1">{product.product_name}</h5>
                                                <p className="card-text1" style={{ color: "#D68910" }}>{product.offer}%OFF</p>
                                                <h6 className="card-text1" style={{ color: 'gray' }}><s>₹{product.price}</s></h6>
                                                <h5 className="card-text1" style={{ color: 'tomato' }}>Price - ₹{(product.price - ((product.price * product.offer) / 100)).toFixed(2)}</h5>
                                                <h5 className="card-text1">{product.total_number_of_product} Left </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col2'>
                                        {cartproduct && cartproduct.product_id === _id ?
                                            <button id='button' className='btn btn-danger btn-sm' onClick={removeTocart}>
                                                {
                                                    removebutton == true ? <BeatLoader color="#36d7b7" /> : "Remove To Cart"
                                                }
                                            </button>
                                            : <button id='button' className='btn btn-primary  btn-sm' disabled={!product.total_number_of_product} onClick={Add_TO_CART} >Add To Cart </button>}
                                    </div>
                                </div>
                                <hr />
                                <Product_Review _id={_id} />
                                <div style={{ marginTop: '20px' }}>
                                    <hr />
                                    {relatedProduct && <Carousel data={relatedProduct} message='Related Product' />}
                                </div>
                            </div>
                            <hr />
                            <Footer />
                        </>
                        :
                        <div className='loader-container'>
                            <h4>Product Not Found</h4>
                        </div>
            }
        </>
    )
}
