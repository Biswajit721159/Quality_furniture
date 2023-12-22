import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/Main_page.css'
import {AiFillStar } from "react-icons/ai";
import {FaHeart} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import loader from "../images/loader.gif"
import Footer from './Footer';
import {useSelector} from 'react-redux'
export default function Show() {

const history =useNavigate()    
const [dropdown,setdropdown]=useState("Search In Catagory")   
const [data,setdata]=useState([])
let [cart,setcart]=useState(JSON.parse(localStorage.getItem('cart')))
const [product,setproduct]=useState([])
const [searchproduct,setsearchproduct]=useState("")
let userinfo=JSON.parse(localStorage.getItem('user'))
let wishlist=JSON.parse(localStorage.getItem('Wishlist'))
let [load,setload]=useState(true)
let [priceRange,setpriceRange]=useState("Price Range")
let searchvalue=useSelector((state)=>state.Search_Name.search_Name)

const api = process.env.REACT_APP_API



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
    search(searchvalue)
},[searchvalue])


function loadproduct()
{
    setload(true)
    fetch(`${api}/product`,{
        headers:{
            Authorization:`Bearer ${userinfo.accessToken}`
        }
    }).then(response=>response.json()).then((data)=>{
       if(data!=undefined)
       {
            setproduct(data.data)
            setToproduct(data.data,cart)
            setload(false);
       }
    })
}

function setToproduct(data,res)// data mean product and res mean cart
{
    if(data==undefined) return
    else
    {
        res=JSON.parse(localStorage.getItem('cart'))
        wishlist=JSON.parse(localStorage.getItem('Wishlist'))
        let ans=[]
        for(let i=0;i<data.length;i++)
        {
            let obj={
                _id:data[i]._id,
                product_name:data[i].product_name,
                rating:data[i].rating,
                newImage:data[i].newImage,
                price:data[i].price,
                offer:data[i].offer,
                product_type:data[i].product_type,
                total_number_of_product:data[i].total_number_of_product,
                number_of_people_give_rating:data[i].number_of_people_give_rating,
                product_count:0,
                islove:false, 
                isdeleted:false,
            }
            
            if(res && res.length!=0 && res.product_id==obj._id)
            {
                obj.product_count=res.product_count;
            }
            for(let j=0; wishlist!=null && j<wishlist.length;j++)
            {
                if(wishlist[j]==obj._id)
                {
                    obj.islove=true;
                }
            }
            ans.push(obj)
        }
        setdata([...ans])
    }
}

function checkIdPresent(nums,id)
{
    for(let i=0;i<nums.length;i++)
    {
        if(nums[i]==id)
        {
            return i;
        }
    }
    return -1;
}

function addToWishlist(id)
{
    let arr=[]
    let itemsList = JSON.parse(localStorage.getItem('Wishlist'))
    if(itemsList)
    {
        let a=checkIdPresent(itemsList,id);
        if(a!=-1)
        {
            itemsList.splice(a,1);
            localStorage.setItem('Wishlist', JSON.stringify(itemsList));
        }
        else
        {
            itemsList.push(id)
            localStorage.setItem('Wishlist', JSON.stringify(itemsList));
        }
    }
    else
    {
        arr.push(id)
        localStorage.setItem('Wishlist',JSON.stringify(arr))
    }
    cart=JSON.parse(localStorage.getItem('cart'));
    setToproduct(data,cart)
}

function search(searchproduct)
{  
    setdropdown("Search In Catagory")
    setpriceRange("Price Range")  
    setload(true)
    if(searchproduct.length==0)
    {
        loadproduct()
    }
    else
    {
        fetch(`${api}/product/search/${searchproduct}`,{
            headers:{
                Authorization:`Bearer ${userinfo.accessToken}`
            }
        }).then(response=>response.json()).then((res)=>{
            if(res!=undefined)
            {
                setproduct(res.data)
                setToproduct(res.data,cart)
                setload(false)
            }
        })
    }
}

function PriceLowToHigh()
{
    setdropdown("Price Low To High")
    data.sort((a, b) => {
        let fa = parseInt(a.price-((a.price*a.offer)/100))
        let fb = parseInt(b.price-((b.price*b.offer)/100))
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    setdata([...data])
}

function clearallfilter()
{
    setdropdown("Search In Catagory")
    setpriceRange("Price Range")
    loadproduct()
}

function PriceHighToLow()
{
    setdropdown("Price High To Low")
    data.sort((a, b) => {
        let fa = parseInt(a.price-((a.price*a.offer)/100))
        let fb = parseInt(b.price-((b.price*b.offer)/100))
    
        if (fa > fb) {
            return -1;
        }
        if (fa < fb) {
            return 1;
        }
        return 0;
    });
    setdata([...data])
}

function SortOnRating()
{
    setdropdown("Sort On Rating")
    data.sort((a, b) => {
        let fa = parseFloat(a.rating),
            fb = parseFloat(b.rating);
    
        if (fa > fb) {
            return -1;
        }
        if (fa < fb) {
            return 1;
        }
        return 0;
    });
    setdata([...data])
}

function SortOnOffer()
{
    setdropdown("Sort On Offer")
    data.sort((a, b) => {
        let fa = parseInt(a.offer),
            fb = parseInt(b.offer);
    
        if (fa > fb) {
            return -1;
        }
        if (fa < fb) {
            return 1;
        }
        return 0;
    });
    setdata([...data])
}

function findPriceRange(low,high)
{
    if(low==0)
    {
        setpriceRange(`UNDER ₹ ${high}`)
    }
    else if(high==Math.pow(2,31))
    {
        setpriceRange(`Over ₹ ${low}`)
    }
    else
    {
        setpriceRange(`₹ ${low} - ₹ ${high}`)
    }
    let ans=[]
    for(let i=0;i<data.length;i++)
    {
        let price=parseInt(data[i].price-((data[i].price*data[i].offer)/100));
        if(price>=low && price<=high)
        {
            ans.push(data[i]);
        }
    }
    setdata([...ans])
}

  return (
    <>
    {load==false && data!=undefined && data && data.length!=0?
        <>
        <div className='container d-flex justify-content-center'>
            <div className='col'>
                <div className="dropdown mt-1">
                    <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {dropdown}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" onClick={PriceLowToHigh}>Price Low To High</Link>
                        <Link className="dropdown-item" onClick={PriceHighToLow} >Price High To Low</Link>
                        <Link className="dropdown-item" onClick={SortOnRating} >Sort On Rating</Link>
                        <Link className="dropdown-item" onClick={SortOnOffer} >Sort Offer</Link>
                        <Link className="dropdown-item" onClick={clearallfilter} >Clear Filter</Link>
                    </div>
                </div>
            </div>
            <div className='col'>
                <div className="dropdown mt-1">
                    <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     {priceRange}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" onClick={()=>{findPriceRange(0,1000)}}>UNDER ₹ 1000</Link>
                        <Link className="dropdown-item" onClick={()=>{findPriceRange(1000,2000)}} >₹ 1000 - ₹ 2000</Link>
                        <Link className="dropdown-item" onClick={()=>{findPriceRange(2000,3000)}} >₹ 2000 - ₹ 3000</Link>
                        <Link className="dropdown-item" onClick={()=>{findPriceRange(3000,4000)}} >₹ 3000 - ₹ 4000</Link>
                        <Link className="dropdown-item" onClick={()=>{findPriceRange(4000,Math.pow(2,31))}} >Over ₹ 4000</Link>
                        <Link className="dropdown-item" onClick={clearallfilter} >Clear Filter</Link>
                    </div>
                </div>
            </div>
        </div>

        <div className='product'>        
          {   data && data.map((item,ind)=>(
                <div key={ind} className=" mx-2 mt-2" style={{width: "15.7rem", height:"auto",backgroundColor:"#D6DBDF"}}>
                    <Link to={`/Product/${item._id}`}>
                        <img className="card-img-top" src={item.newImage[0]} style={{height:"150px",width:"250px"}} alt="Card image cap"/>
                    </Link>
                    <div className="card-body">
                        <div className='row'>
                            <div className='col'>
                                <h6 className="card-title d-flex">{item.product_name}</h6>
                            </div>
                            <div className='col'>
                                {
                                item.islove==false?<button className='btn btn-light btn-sm' onClick={()=>addToWishlist(item._id)}> <FaHeart /></button>
                                :<button className='btn btn-danger btn-sm' onClick={()=>addToWishlist(item._id)}> <FaHeart /></button>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="container col">
                                <h6 className="card-text" style={{color:'orange'}}>{item.offer}% OFF</h6>
                            </div>
                            <div className="container col">
                                <h6 className="card-text" style={{color:'gray'}}><s>₹{item.price}</s></h6> 
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                {
                                    parseInt(item.rating)==0?<div style={{color:"black"}}>{item.rating}<AiFillStar /></div>
                                    :
                                    parseInt(item.rating)==1?<div style={{color:"tomato"}}>{item.rating}<AiFillStar /></div>
                                    :
                                    parseInt(item.rating)==2?<div style={{color:"red"}}>{item.rating}<AiFillStar /></div>
                                    :
                                    parseInt(item.rating)==3?<div style={{color:"#DC7633"}}>{item.rating}<AiFillStar /></div>
                                    :
                                    parseInt(item.rating)==4?<div style={{color:"#28B463"}}>{item.rating}<AiFillStar /></div>
                                    :
                                    parseInt(item.rating)==5?<div style={{color:"green"}}>{item.rating}<AiFillStar /></div>
                                    :""
                                }
                            </div>
                            <div className=" col">
                                    <h5 className="card-text" style={{color:'tomato'}}>₹{(item.price-((item.price*item.offer)/100)).toFixed(2)}</h5>
                            </div>
                        </div>
                        {
                            item.total_number_of_product==0?
                            <div className=" row">
                                <div className="col">
                                    <h6 className="card-text" style={{color:'tomato'}}>Closed</h6>
                                </div>
                                <div className='col'>
                                    <label>{item.total_number_of_product} Left</label>
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className=" col">
                                    <h6 className="card-text" style={{color:'green'}}>Available</h6>
                                </div>
                                <div className='col'>
                                    {
                                    item.total_number_of_product!=0?<label>{item.total_number_of_product} Left</label>:<label style={{color:"#E2E2F4"}}>{item.total_number_of_product} Left</label>
                                    }
                                </div>
                            </div>
                        }
                        <div className='row'>
                                {
                                    item.total_number_of_product==0?
                                        <div className='col'>
                                            <button className="btn btn-primary rounded-pill btn-sm mt-0" disabled>
                                                ADD TO CART
                                            </button>
                                        </div>
                                    :
                                    <Link to={`/product/${item._id}`}>
                                        <div className='col'>
                                            <button className="btn btn-primary rounded-pill btn-sm mt-0" >
                                                ADD TO CART
                                            </button>
                                        </div>
                                    </Link>
                                }
                        </div>
                    </div>
                </div>
            ))
          }
        </div>
        <Footer/>
        </>
        :load?<div className="Loaderitem">
                <PulseLoader color="#16A085"  />
              </div>
        :<div className='loader-container'>
            <h4>Product Not Found</h4>
            <button className='btn btn-primary mx-3' onClick={()=>search("")} >Get Product</button>
        </div>
        
        }
    </>
  )
}
