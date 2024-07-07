import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/Main_page.css'
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../component/Footer'
import Slider from './Slider';
import { loadProduct, AddToWishList, RemoveToWishList } from '../redux/ProductSlice'
import { productmethod } from '../redux/ProductSlice'
import { AddToCartDB, RemoveToDB } from '../redux/CartSlice'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Loader from './Loader';
import Loading from './Loading';
import GoodToSee from './GoodToSee';
import GoToMainPage from './GoToMainPage';
import { SetRating } from '../constant/Rating'

export default function Show() {

    const dispatch = useDispatch()
    const history = useNavigate()
    const userinfo = useSelector((state) => state?.user)?.user
    const [wishlistid, setwishlistid] = useState(0)

    let cartproduct = useSelector((state) => state?.cartdata?.product)
    let searchInput = useSelector((state) => state?.product?.searchproduct)

    let { product, lowerLimit, higherLimit, lowprice, highprice, selectcatagory, loadingproduct, next_page, wishlistloader } = useSelector((state) => state?.product)

    useEffect(() => {
        if (product?.length === 0) {
            dispatch(loadProduct({ lowprice, highprice, selectcatagory, searchInput, lowerLimit, higherLimit, userinfo }))
        }
    }, [])

    function addToWishlist(product_id) {
        if (checkLogin()) {
            history('/Signin')
            return;
        }
        setwishlistid(product_id)
        dispatch(AddToWishList({ userinfo, product_id }))
    }

    function removeToWishlist(product_id) {
        if (checkLogin()) {
            history('/Signin')
            return;
        }
        setwishlistid(product_id)
        dispatch(RemoveToWishList({ userinfo, product_id }))
    }

    function AddToCart(product_id) {
        if (checkLogin()) {
            history('/Signin')
            return;
        }
        if (cartproduct?.product_id === product_id) {
            dispatch(AddToCartDB({ userinfo: userinfo, product_id: product?.product_id, product_count: product?.product_count + 1, product: cartproduct }))
        }
        else {
            dispatch(AddToCartDB({ userinfo: userinfo, product_id: product_id, product_count: 1, product: cartproduct }))
        }
    }

    function removeTocart() {
        if (checkLogin()) {
            history('/Signin')
            return;
        }
        dispatch(RemoveToDB({ userinfo: userinfo, product_id: cartproduct?.product_id, product_count: cartproduct?.product_count, product: cartproduct }))
    }

    function NextPage() {
        lowerLimit += 15
        higherLimit += 15
        dispatch(productmethod.AddEveryThing({ lowerLimit: lowerLimit, higherLimit: higherLimit }))
        dispatch(loadProduct({ lowprice, highprice, selectcatagory, searchInput, lowerLimit, higherLimit, userinfo }))
    }
    const [takeid, settakeid] = useState(0)

    function handleMouseOver(product_id) {
        settakeid(product_id)
    }

    function handleMouseLeave() {
        settakeid(0)
    }

    function checkLogin() {
        if (userinfo?.accessToken) {
            return false;
        } else {
            return true;
        }
    }


    return (
        <>
            {loadingproduct === true && product?.length === 0 ?
                <Loader />
                :
                product?.length !== 0 ?
                    <>
                        {
                            loadingproduct === true ? <Loading /> :
                                <GoodToSee />
                        }
                        <div className='allproduct'>
                            <div className='product'>
                                {
                                    product && product?.map((item, ind) => (
                                        <Card key={ind} sx={{ width: 240 }} className='carditem ' >
                                            {
                                                takeid === item._id ?
                                                    <Link to={`/Product/${item._id}`} onMouseLeave={handleMouseLeave} onMouseOver={() => handleMouseOver(item._id)}>
                                                        <Slider data={item.newImage} />
                                                    </Link> :
                                                    <Link to={`/Product/${item._id}`} onMouseOver={() => handleMouseOver(item._id)}>
                                                        <CardMedia
                                                            component="img"
                                                            height="194"
                                                            image={item?.newImage[0]}
                                                            alt="wait"
                                                            style={{ marginTop: '2px' }}
                                                        />
                                                    </Link>
                                            }
                                            <div className="card-body">
                                                <p className="card-title">{item.product_name}</p>
                                                <div className="row">
                                                    <div className="container col">
                                                        <p className="card-text" style={{ color: '#D68910 ' }}>{item.offer}% OFF</p>
                                                    </div>
                                                    <div className="container col">
                                                        <p className="card-text" style={{ color: 'gray' }}><s>₹{item.price}</s></p>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <SetRating rating={item.rating} />
                                                    </div>
                                                    <div className=" col">
                                                        <h6 className="card-text" style={{ color: 'tomato' }}>₹{(item.price - ((item.price * item.offer) / 100)).toFixed(2)}</h6>
                                                    </div>
                                                </div>
                                                {
                                                    item.total_number_of_product == 0 ?
                                                        <div className=" row">
                                                            <div className="col">
                                                                <p className="card-text" style={{ color: 'tomato' }}>closed</p>
                                                            </div>
                                                            <div className='col'>
                                                                <p className="card-text">{item.total_number_of_product} left</p>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="row">
                                                            <div className=" col">
                                                                <p className="card-text" style={{ color: 'green' }}>Instock</p>
                                                            </div>
                                                            <div className='col'>
                                                                {
                                                                    item.total_number_of_product != 0 ? <p className="card-text">{item.total_number_of_product} left</p> : <p className="card-text" style={{ color: "#E2E2F4" }}>{item.total_number_of_product} left</p>
                                                                }
                                                            </div>
                                                        </div>
                                                }
                                                <CardActions disableSpacing>
                                                    {
                                                        wishlistloader === true && wishlistid === item._id ? <ClipLoader color="#16A085" size={'20px'} /> :
                                                            item.islove == false ? <FavoriteIcon sx={{ color: 'gray' }} onClick={() => addToWishlist(item._id)} /> :
                                                                <FavoriteIcon sx={{ color: 'red' }} onClick={() => removeToWishlist(item._id)} />
                                                    }
                                                    <div className='col'>
                                                        {
                                                            item.total_number_of_product == 0 ?
                                                                <div className='col'>
                                                                    <Button variant="contained" size="small" disabled>
                                                                        ADD TO CART
                                                                    </Button>
                                                                </div>
                                                                :
                                                                item?._id === cartproduct?.product_id ?
                                                                    < div className='col'>
                                                                        <Button variant="contained" size="small" color="error" onClick={() => removeTocart(item._id)} >
                                                                            Remove cart
                                                                        </Button>
                                                                    </div>
                                                                    :
                                                                    < div className='col'>
                                                                        <Button variant="contained" size="small" onClick={() => AddToCart(item._id)} >
                                                                            ADD TO CART
                                                                        </Button>
                                                                    </div>
                                                        }
                                                    </div>
                                                </CardActions>
                                            </div>
                                        </Card>
                                    ))
                                }
                            </div>
                        </div >
                        {
                            loadingproduct === true ?
                                <Loading /> :
                                next_page &&
                                <div className='PrevNext mb-4'>
                                    <Button sx={{ mt: 2 }} onClick={NextPage} variant="contained" size="small" color="warning">Load more</Button>
                                </div>
                        }
                        <hr />
                        <Footer />
                    </> :
                    <GoToMainPage />
            }
        </>
    )
}
