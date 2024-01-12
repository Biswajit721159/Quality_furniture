import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {AiFillStar } from "react-icons/ai";
import { PulseLoader ,BarLoader,BeatLoader} from 'react-spinners';
import '../css/Product_view.css'
import {useDispatch,useSelector} from 'react-redux'
import {cartmethod} from '../redux/CartSlice'
import Carousel from "./Carousel";
import Product_Review from './Product_Review';
import Footer from '../component/Footer'
const api = process.env.REACT_APP_API


export default function Product_view() {

  const [product,setproduct]=useState(null)
  const _id=useParams()._id
  const history=useNavigate()
  const dispatch=useDispatch();

  let userinfo=JSON.parse(localStorage.getItem('user'))

  let [load,setload]=useState(true)
  let cart= useSelector((state) => state.cartdata);
  const [relatedProduct,setrelatedProduct]=useState(null)
  const [removebutton,setremovebutton]=useState(false)

  useEffect(()=>{
    if(userinfo==null)
    {
        history('/Register')
    }
    else
    {
        loadproduct();
    }
  },[])

  useEffect(()=>{
    if(userinfo==null)
    {
        history('/Register')
    }
    else
    {
        loadproduct();
    }
  },[_id])

  function loadproduct()
  {
    setload(true)
    fetch(`${api}/product/${_id}`,{
        headers:
        {
            Authorization:`Bearer ${userinfo.accessToken}`
        }
    }).then(response=>response.json()).
    then((data)=>{
        if(data.statusCode==201)
        {
            setproduct(data.data)
            findrelatedproduct(data.data);
            setload(false)
        }
        else if(data.statusCode==498)
        {
            localStorage.removeItem('user')
            history('/Signin')
        }
        else
        {
            history('*')
        }
    })

  }

  function findrelatedproduct(product)
  {
    if(product==null || product.product_type==null) return;
    else
    {
        fetch(`${api}/product/getproductByType/${product.product_type}`).
        then(response=>response.json()).then((data)=>{
            if(data.statusCode==201)
            {
                setrelatedProduct(data.data)
            }
        })
    }
  }

  function Add_TO_CART()
  {
    setload(true)
    fetch(`${api}/cart/Add_To_Cart`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${userinfo.accessToken}`
        },
        body:JSON.stringify({
            email:userinfo.user.email,
            product_id:product._id,
            product_count:1
        })
    }).then((responce)=>responce.json())
    .then((res)=>{
        if(res.statusCode==200)
        {
            dispatch(cartmethod.ADD_TO_CART(res.data))
            setload(false)
            history('/cart')
        }
        else if(res.statusCode==498)
        {
            localStorage.removeItem('user');
            history('/Signin');
        }
        else
        {
            history('*');
        }
    })
  }

  function removeTocart()
  {
    setremovebutton(true)
    fetch(`${api}/cart/Remove_To_Cart`,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${userinfo.accessToken}`
        },
        body:JSON.stringify({
            email:userinfo.user.email,
        })
    }).then((responce)=>responce.json())
    .then((res)=>{
        if(res.statusCode==200)
        {
            setremovebutton(false)
            dispatch(cartmethod.Remove_To_Cart())
        }
        else if(res.statusCode==498)
        {
            localStorage.removeItem('user');
            history('/Signin');
        }
        else
        {
            history('*');
        }
    })
  }


  
  return (
    <>
    {
       load==true?  
        <div className="Loaderitem">
           <PulseLoader color="#16A085"  />
        </div>
        :
        product!=null ?
        <>
          <div className='container mt-3'>

                <div className='item'>
                    <div className='col1'>
                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner" style={{border:'2px solid green' ,borderRadius:10}}>
                            <div class="carousel-item active">
                                <img class="d-block" src={product.newImage[0]} className='image'  alt="First slide"/>
                            </div>
                            <div class="carousel-item">
                                <img class="d-block" src={product.newImage[1]} className='image'  alt="Second slide"/>
                            </div>
                            <div class="carousel-item">
                                <img class="d-block" src={product.newImage[2]} className='image'  alt="Third slide"/>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" style={{backgroundColor:"black",borderRadius:"10px"}}  aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" style={{backgroundColor:"black",borderRadius:"10px"}}  aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    </div>
                    <div className='col3'>
                        <div class="card123" >
                            <div class="card-body">
                                <h5 class="card-title">{product.product_name}</h5>
                                <p class="card-text" style={{color:"#D68910"}}>{product.offer}%OFF</p>
                                <h6 className="card-text" style={{color:'gray'}}><s>₹{product.price}</s></h6> 
                                <h5 className="card-text" style={{color:'tomato'}}>Price - ₹{(product.price-((product.price*product.offer)/100)).toFixed(2)}</h5>
                                <h5 class="card-title">{product.total_number_of_product} Left Only </h5>
                            </div>
                        </div>
                    </div>
                    <div className='col2'>
                       {cart && cart.product_id==_id ?
                       <button id='button' className='btn btn-danger btn-sm' onClick={removeTocart}>
                        {
                            removebutton==true?<BeatLoader color="#36d7b7" />:"Remove To Cart"
                        }
                         </button>
                       :<button id='button' className='btn btn-primary  btn-sm' disabled={!product.total_number_of_product} onClick={Add_TO_CART} >Add To Cart </button>}
                    </div>
                </div>
                
                <hr/>
               <div className='item'>
                    <Product_Review _id={_id}/>
               </div>
               <hr/>
               <div>
                     {relatedProduct && <Carousel data={relatedProduct} message='Related Product'/>}
               </div>
          </div>
          <hr/>
          <Footer/>
          </> 
            :
            <div className='loader-container'>
                <h4>Product Not Found</h4>
            </div>
    }
    </>
  )
}
