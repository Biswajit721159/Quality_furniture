import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/Main_page.css'
import {AiFillStar } from "react-icons/ai";
import {FaHeart} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import loader from "../images/loader.gif"

export default function Show() {

const history =useNavigate()    
const [dropdown,setdropdown]=useState("Search In Catagory")   
const [data,setdata]=useState([])
const [cart,setcart]=useState(JSON.parse(localStorage.getItem('cart')))
const [product,setproduct]=useState([])
const [searchproduct,setsearchproduct]=useState("")
let userinfo=JSON.parse(localStorage.getItem('user'))
let wishlist=JSON.parse(localStorage.getItem('Wishlist'))
let [load,setload]=useState(true)

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


function loadproduct()
{
    setload(true)
    fetch('https://quality-furniture.vercel.app/product',{
        headers:{
            auth:`bearer ${userinfo.auth}`
        }
    }).then(response=>response.json()).then((data)=>{
       if(data!=undefined)
       {
            setproduct(data)
            setToproduct(data,cart)
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
    let data=[]
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
        data.push(id)
        localStorage.setItem('Wishlist',JSON.stringify(data))
    }
    setToproduct(product,cart)
}

function search(searchproduct)
{    
    setload(true)
    if(searchproduct.length==0)
    {
        loadproduct()
    }
    else
    {
        fetch(`https://quality-furniture.vercel.app/product/search/${searchproduct}`,{
            headers:{
                auth:`bearer ${userinfo.auth}`
            }
        }).then(response=>response.json()).then((res)=>{
            if(res!=undefined)
            {
                setproduct(res)
                setToproduct(res,cart)
                setload(false)
            }
        })
    }
}

function PriceLowToHigh()
{
    setdropdown("Price Low To High")
    data.sort((a, b) => {
        let fa = parseInt(a.price),
            fb = parseInt(b.price);
    
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
    loadproduct()
}

function PriceHighToLow()
{
    setdropdown("Price High To Low")
    data.sort((a, b) => {
        let fa = parseInt(a.price),
            fb = parseInt(b.price);
    
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

function ADD_TO_DECREMENT(id)
{
    let obj=cart
    if(cart==null || cart.length==0)
    {
        alert("Sorry You are not allow !")
    }
    else
    {
        if(cart.product_id==id && cart.product_count==0)
        {
            alert("Sorry You are not allow !")
        }
        else if(cart.product_id==id)
        {
            obj={product_id:id,product_count:cart.product_count-1}
        }
        else
        { 
            alert("Sorry You are not allow !")
        }
    }
    localStorage.setItem('cart',JSON.stringify(obj))
    setcart(JSON.parse(localStorage.getItem('cart')))
    setToproduct(product,cart)
}

function checkTheProductCount(id)
{
    if(data==undefined) return 0;
    for(let i=0;i<data.length;i++)
    {
        if(data[i]._id==id)
        {
            return (data[i].total_number_of_product)
        }
    }
    return 0;
}

function ADD_TO_INCREMENT(id)
{
    let obj=cart
    if(cart==null || cart.length==0)
    {
        obj={product_id:id,product_count:1}
    }
    else
    {
        if(cart.product_id==id)
        {
            let x=checkTheProductCount(id);
            if(x<=cart.product_count)
            {
                alert("You are Not Allow ! ")
            }
            else
            {
                obj={product_id:id,product_count:1+cart.product_count}
            }
        }
        else
        { 
            if(window.confirm('Are you sure to replace this product ?'))
            {
                obj={product_id:id,product_count:1}
            }
        }
    }
    localStorage.setItem('cart',JSON.stringify(obj))
    setcart(JSON.parse(localStorage.getItem('cart')))
    setToproduct(product,cart)
}


  return (
    <>
    {load==false && data && data.length!=0?
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
        
            <div className='col mt-1'>
                <div className="form-inline mt-1 my-2 my-lg-0">
                    <input className="form-control mr-sm-2" value={searchproduct} name='search' onChange={(e)=>{setsearchproduct(e.target.value)}}  type="search" placeholder="Search product" aria-label="Search"/>
                    <button className="btn btn-success my-2 my-sm-0" onClick={()=>search(searchproduct)} type="submit">Search</button>
                </div>
            </div>
        </div>

        <div className='container align-items-center  mx-5 row'>
        { data.map((item,ind)=>(
                <div key={ind} className="card mx-4 mt-4" style={{width: "18rem", height:"auto"}}>
                    <Link to={`/Product/${item._id}`}>
                        <img className="card-img-top" src={item.newImage[0]} style={{height:"200px",width:"287px"}} alt="Card image cap"/>
                    </Link>
                    <div className="card-body">
                        <div className='row'>
                            <div className='col'>
                                <h6 className="card-title d-flex">{item.product_name}</h6>
                            </div>
                            <div className='col'>
                                {
                                item.islove==false?<button className='btn btn-secondary btn-sm' onClick={()=>addToWishlist(item._id)}> <FaHeart /></button>
                                :<button className='btn btn-danger btn-sm' onClick={()=>addToWishlist(item._id)}> <FaHeart /></button>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="container col">
                                <h5 className="card-text" style={{color:'orange'}}>{item.offer}% OFF</h5>
                            </div>
                            <div className="container col">
                                <h5 className="card-text" style={{color:'gray'}}><s>₹{item.price}</s></h5> 
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                {
                                    parseInt(item.rating)==0?<button className='btn btn-secondary btn-sm '>{item.rating}  <AiFillStar /></button>
                                    :
                                    parseInt(item.rating)==1?<button className='btn btn-danger btn-sm '>{item.rating}  <AiFillStar /></button>
                                    :
                                    parseInt(item.rating)==2?<button className='btn btn-info btn-sm '>{item.rating}  <AiFillStar /></button>
                                    :
                                    parseInt(item.rating)==3?<button className='btn btn-warning btn-sm '>{item.rating}  <AiFillStar /></button>
                                    :
                                    parseInt(item.rating)==4?<button className='btn btn-primary btn-sm '>{item.rating}  <AiFillStar /></button>
                                    :
                                    parseInt(item.rating)==5?<button className='btn btn-success btn-sm '>{item.rating}  <AiFillStar /></button>
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
                                    <h5 className="card-text" style={{color:'lightgray'}}>Closed</h5>
                                </div>
                                <div className='col'>
                                    {
                                        item.total_number_of_product!=0?<strong>{item.total_number_of_product} Left</strong>:<strong style={{color:"#E2E2F4"}}>{item.total_number_of_product} Left</strong>
                                    }
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className=" col">
                                    <h5 className="card-text" style={{color:'green'}}>Available</h5>
                                </div>
                                <div className='col'>
                                    {
                                    item.total_number_of_product!=0?<strong>{item.total_number_of_product} Left</strong>:<strong style={{color:"#E2E2F4"}}>{item.total_number_of_product} Left</strong>
                                    }
                                </div>
                            </div>
                        }
                        <div className="card-body">
                            <div className='row'>
                                <div className='col'>
                                    {
                                        item.product_count==0
                                        ?
                                        item.total_number_of_product==0?
                                        <button className="btn btn-primary rounded-pill btn-sm mt-2" disabled>
                                            <button className="btn btn-primary rounded-circle btn-sm mx-3" disabled onClick={()=>ADD_TO_DECREMENT(item._id)}> - </button>
                                                ADD
                                            <button className="btn btn-primary rounded-circle btn-sm mx-3" disabled onClick={()=>ADD_TO_INCREMENT(item._id)}> + </button>
                                       </button>:
                                        <button className="btn btn-primary rounded-pill btn-sm mt-2" >
                                            <button className="btn btn-primary rounded-circle btn-sm mx-3" onClick={()=>ADD_TO_DECREMENT(item._id)}> - </button>
                                                ADD
                                            <button className="btn btn-primary rounded-circle btn-sm mx-3" onClick={()=>ADD_TO_INCREMENT(item._id)}> + </button>
                                        </button>
                                        :
                                        item.total_number_of_product==0?
                                        <div className='row'>
                                            <div className='col'>
                                                <button className="btn btn-primary rounded-pill btn-sm mt-2" disabled>
                                                    <button className="btn btn-primary rounded-circle btn-sm mx-3"disabled onClick={()=>ADD_TO_DECREMENT(item._id)}> - </button>
                                                        {item.product_count}
                                                    <button className="btn btn-primary rounded-circle btn-sm mx-3"disabled onClick={()=>ADD_TO_INCREMENT(item._id)}> + </button>
                                                    <Link to={'/Cart'}><button className='btn btn-info btn-sm' disabled>Cart</button></Link>
                                                </button>
                                            </div>
                                       </div>:
                                        <div className='row'>
                                            <div className='col'>
                                                <button className="btn btn-primary rounded-pill btn-sm mt-2" >
                                                    <button className="btn btn-primary rounded-circle btn-sm mx-3" onClick={()=>ADD_TO_DECREMENT(item._id)}> - </button>
                                                        {item.product_count}
                                                    <button className="btn btn-primary rounded-circle btn-sm mx-3" onClick={()=>ADD_TO_INCREMENT(item._id)}> + </button>
                                                    <Link to={'/Cart'}><button className='btn btn-info btn-sm'>Cart</button></Link>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
          </div>
        </>
        :load?<div className='loader-container'><img src={loader} /></div>
        :<div className='loader-container'>
            <h4>Product Not Found</h4>
            <button className='btn btn-primary mx-3' onClick={()=>search("")} >Go Product</button>
        </div>}
    </>
  )
}
