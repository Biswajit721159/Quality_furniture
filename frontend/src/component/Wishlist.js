import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from 'react-redux'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { RemoveToWishList } from '../redux/ProductSlice'
import { useSelector } from 'react-redux';
import { AddToCartDB } from '../redux/CartSlice'
import { usermethod } from '../redux/UserSlice';
import Loader from './Loader';
import { toast } from 'react-toastify'

const api = process.env.REACT_APP_API
export default function WishList() {

  const dispatch = useDispatch()
  const userinfo = useSelector((state) => state.user)?.user
  const [data, setdata] = useState([])
  const history = useNavigate()
  const [load, setload] = useState(false)
  let cartproduct = useSelector((state) => state?.cartdata?.product)

  function loadproduct() {
    setload(true)
    fetch(`${api}/wishlist/GetFavouriteByemail/${userinfo?.user?.email}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo?.accessToken}`
      },
    }).then(responce => responce.json()).then((res) => {
      try {
        if (res.statusCode === 200 || res.statusCode === 404) {
          setdata(res.data);
        }
        else if (res.statusCode === 498) {
          dispatch(usermethod.Logout_User())
          history('/Signin')
        }
        else {
          history('*');
        }
        setload(false)
      }
      catch {
        toast.warn("we are find Some Error")
      }
    })
  }

  useEffect(() => {
    if (userinfo === null) {
      history('/Signin')
    }
    else {
      loadproduct();
    }
  }, [])

  function removeToWishlist(product_id) {
    dispatch(RemoveToWishList({ userinfo, product_id }))
    let product = data.filter((item) => { return item?._id !== product_id })
    setdata(product)
  }

  function AddToCart(product_id) {
    dispatch(AddToCartDB({ userinfo: userinfo, product_id: product_id, product_count: 1, product: cartproduct }))
  }


  return (
    <>
      {
        load === true ?
          <Loader />
          :
          (data && data?.length !== 0) ?
            <div className='product'>
              {data?.map((item, ind) => (
                <Card key={ind} sx={{ width: 250 }} className='carditem'>
                  <Link to={`/Product/${item?._id}`}>
                    <CardMedia
                      component="img"
                      height="194"
                      image={item?.newImage?.[0]}
                      alt="wait"
                    />
                  </Link>
                  <div className="card-body">
                    <p className="card-title">{item?.product_name}</p>
                    <div className="row">
                      <div className="container col">
                        <h6 className="card-text" style={{ color: 'orange' }}>{item?.offer}% OFF</h6>
                      </div>
                      <div className="container col">
                        <h6 className="card-text" style={{ color: 'gray' }}><s>₹{item?.price}</s></h6>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        {
                          parseInt(item.rating) === 0 ? <div className="card-text" style={{ color: "black" }}>{item.rating}<AiFillStar /></div>
                            :
                            parseInt(item.rating) === 1 ? <div className="card-text" style={{ color: "tomato" }}>{item.rating}<AiFillStar /></div>
                              :
                              parseInt(item.rating) === 2 ? <div className="card-text" style={{ color: "red" }}>{item.rating}<AiFillStar /></div>
                                :
                                parseInt(item.rating) === 3 ? <div className="card-text" style={{ color: "#DC7633" }}>{item.rating}<AiFillStar /></div>
                                  :
                                  parseInt(item.rating) === 4 ? <div className="card-text" style={{ color: "#28B463" }}>{item.rating}<AiFillStar /></div>
                                    :
                                    parseInt(item.rating) === 5 ? <div className="card-text" style={{ color: "green" }}>{item.rating}<AiFillStar /></div>
                                      : ""
                        }
                      </div>
                      <div className=" col">
                        <h6 className="card-text" style={{ color: 'tomato' }}>₹{(item?.price - ((item?.price * item?.offer) / 100)).toFixed(2)}</h6>
                      </div>
                    </div>
                    {
                      item?.total_number_of_product === 0 ?
                        <div className=" row">
                          <div className="col">
                            <h6 className="card-text" style={{ color: 'tomato' }}>closed</h6>
                          </div>
                          <div className='col'>
                            <h6 className="card-text">{item?.total_number_of_product} left</h6>
                          </div>
                        </div>
                        :
                        <div className="row">
                          <div className=" col">
                            <h6 className="card-text" style={{ color: 'green' }}>Available</h6>
                          </div>
                          <div className='col'>
                            {
                              item?.total_number_of_product !== 0 ? <h6 className="card-text">{item?.total_number_of_product} left</h6> : <h6 className="card-text" style={{ color: "#E2E2F4" }}>{item.total_number_of_product} left</h6>
                            }
                          </div>
                        </div>
                    }
                    <div className='row'>
                      <div className='col'><Button variant="contained" size="small" color="error" onClick={() => removeToWishlist(item._id)}>Delete</Button></div>
                      <div className='col'><Button variant="contained" size="small" disabled={!item?.total_number_of_product} onClick={() => AddToCart(item._id)} >Add</Button></div>
                    </div>
                  </div>
                </Card>
              ))
              }
            </div>
            :
            <div className='loader-container'>
              <Link to={'/Product'}><Button variant="contained" size="small" color="info">  <h4>ADD PRODUCTS</h4>  </Button></Link>
            </div>
      }
    </>
  )
}
