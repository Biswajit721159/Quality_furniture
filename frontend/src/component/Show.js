import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, useLocation, useParams, useSearchParams, useAsyncError } from 'react-router-dom';
import '../css/Main_page.css'
import {AiFillStar } from "react-icons/ai";
import {FaHeart, FaSketch} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import {useDispatch,useSelector} from 'react-redux'
import {cartmethod} from '../redux/CartSlice'
export default function Show() {

const dispatch=useDispatch()
const history =useNavigate()     
const [data,setdata]=useState([])
let [cart,setcart]=useState(JSON.parse(localStorage.getItem('cart')))
const [product,setproduct]=useState([])
let userinfo=JSON.parse(localStorage.getItem('user'))
let wishlist=JSON.parse(localStorage.getItem('Wishlist'))
let [load,setload]=useState(true)
const [Catagory,setCatagoty]=useState()

const [queryParameters] = useSearchParams()

const [pricerange0to1000,setpricerange0to1000]=useState(false)
const [pricerange1000to2000,setpricerange1000to2000]=useState(false)
const [pricerange2000to3000,setpricerange2000to3000]=useState(false)
const [pricerange3000to4000,setpricerange3000to4000]=useState(false)
const [pricerange4000toUp,setpricerange4000toUp]=useState(false)

const [ALL,setALL]=useState(false)

const [lowprice,setlowprice]=useState(0)
const [highprice,sethighprice]=useState(10000000)
const [selectcatagory,setselectcatagory]=useState('ALL')
const [searchproduct,setsearchproduct]=useState("none")

const [priceLowTOHigh,setpriceLowTOHigh]=useState(false)
const [priceHighTOLow,setpriceHighTOLow]=useState(false)
const [SortOnRating,setSortOnRating]=useState(false)
const [SortOffer,setSortOffer]=useState(false)

const api = process.env.REACT_APP_API

 

useEffect(()=>{
    loadCatagory();
    let lowprice=queryParameters.get('lowprice');
    let highprice=queryParameters.get('highprice');
    let selectcatagory=queryParameters.get('selectcatagory');
    let searchproduct=queryParameters.get('product_name');
    // console.log(lowprice,highprice,selectcatagory,searchproduct);
    if(userinfo==null)
    {
        history('/Register')
    }
    else 
    {
        findsearchData(lowprice,highprice,selectcatagory,searchproduct);
    }
},[])


function findsearchData(lowprice,highprice,selectcatagory,searchproduct)
{
    if(lowprice==null) lowprice=0;
    if(highprice==null) highprice=1000000;
    if(selectcatagory==null) selectcatagory="ALL";
    if(searchproduct==null) searchproduct="";
    markvisited(lowprice,highprice,selectcatagory,searchproduct)
    if(searchproduct==null || searchproduct.length==0) searchproduct="none";
    setload(true);
    fetch(`${api}/product/getproductUponPriceProductTypeAndProductName/${lowprice}/${highprice}/${selectcatagory}/${searchproduct}`,{
        headers:{
            Authorization:`Bearer ${userinfo.accessToken}` 
        }
    }).then(response=>response.json()).then((data)=>{
        if(data.statusCode==201)
        {
            setproduct(data.data);
            setToproduct(data.data,cart);
            setload(false);
        }
        else if(data.statusCode==498)
        {
            localStorage.removeItem('user');
            history('/Signin');
        }
        else
        {
            history('*');
        }
       },(error)=>{        
        history('*')
       })
}

function loadCatagory()
{
    fetch(`${api}/product/Catagory/getallCatagory`,{
        headers:{
            Authorization:`Bearer ${userinfo.accessToken}`
        }
    }).then(response=>response.json()).then((data)=>{
        if(data.statusCode==201)
        {
            setCatagoty(data.data)
        }
        else if(data.statusCode==498)
        {
            localStorage.removeItem('user');
            history('/Signin');
        }
        else
        {
            history('*')
        }
    },(error)=>{
        history('*')
    })
}

function setToproduct(data,res)
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

// data handeling part 

function clearallfilter()
{
    setdata(product);
    setToproduct(product,cart)
    setpriceLowTOHigh(false);
    setpriceHighTOLow(false);
    setSortOnRating(false);
    setSortOffer(false);
}

function PriceLowToHighfunction()
{
    setpriceLowTOHigh(true);
    setpriceHighTOLow(false);
    setSortOnRating(false);
    setSortOffer(false);
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

function PriceHighToLowfunction()
{
    setpriceLowTOHigh(false);
    setpriceHighTOLow(true);
    setSortOnRating(false);
    setSortOffer(false);
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

function SortOnRatingfunction()
{
    setpriceLowTOHigh(false);
    setpriceHighTOLow(false);
    setSortOnRating(true);
    setSortOffer(false);
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

function SortOnOfferfunction()
{
    setpriceLowTOHigh(false);
    setpriceHighTOLow(false);
    setSortOnRating(false);
    setSortOffer(true);
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

function search(searchproduct)
{ 
    setsearchproduct(searchproduct)
    history(`?lowprice=${lowprice}&highprice=${highprice}&selectcatagory=${selectcatagory}&product_name=${searchproduct}`)
    findsearchData(lowprice,highprice,selectcatagory,searchproduct)
}

function clearsearch()
{
    setsearchproduct("");
    history(`?lowprice=${lowprice}&highprice=${highprice}&selectcatagory=${selectcatagory}&product_name=${''}`)
    findsearchData(lowprice,highprice,selectcatagory,'')
}

function cametocheck(lowprice,highprice)
{
    history(`?lowprice=${lowprice}&highprice=${highprice}&selectcatagory=${selectcatagory}&product_name=${searchproduct}`)
    findsearchData(lowprice,highprice,selectcatagory,searchproduct)
}

function cametocatagory(selectcatagory)
{
    history(`?lowprice=${lowprice}&highprice=${highprice}&selectcatagory=${selectcatagory}&product_name=${searchproduct}`)
    findsearchData(lowprice,highprice,selectcatagory,searchproduct)
}

function markvisited(lowprice,highprice,selectcatagory,searchproduct)
{
    setlowprice(lowprice);
    sethighprice(highprice);
    setselectcatagory(selectcatagory)
    setsearchproduct(searchproduct)

    setpriceLowTOHigh(false);
    setpriceHighTOLow(false);
    setSortOnRating(false);
    setSortOffer(false);

    if(selectcatagory=="ALL")
    {
        setALL(true)
    }
    if(lowprice>=0 && highprice<=1000)
    {
        setpricerange0to1000(true)
        setpricerange1000to2000(false)
        setpricerange2000to3000(false)
        setpricerange3000to4000(false)
        setpricerange4000toUp(false)
    }
    else if(lowprice>=1000 && highprice<=2000)
    {
        setpricerange0to1000(false)
        setpricerange1000to2000(true)
        setpricerange2000to3000(false)
        setpricerange3000to4000(false)
        setpricerange4000toUp(false)
    }
    else if(lowprice>=2000 && highprice<=3000)
    {
        setpricerange0to1000(false)
        setpricerange1000to2000(false)
        setpricerange2000to3000(true)
        setpricerange3000to4000(false)
        setpricerange4000toUp(false)
    }
    else if(lowprice>=3000 && highprice<=4000)
    {
        setpricerange0to1000(false)
        setpricerange1000to2000(false)
        setpricerange2000to3000(false)
        setpricerange3000to4000(true)
        setpricerange4000toUp(false)
    }
    else if(lowprice>=4000 && highprice<=10000000)
    {
        setpricerange0to1000(false)
        setpricerange1000to2000(false)
        setpricerange2000to3000(false)
        setpricerange3000to4000(false)
        setpricerange4000toUp(true)
    }
    else
    {
        setpricerange0to1000(false)
        setpricerange1000to2000(false)
        setpricerange2000to3000(false)
        setpricerange3000to4000(false)
        setpricerange4000toUp(false)
    }
}

function clearPrice()
{
    history(`?lowprice=${0}&highprice=${1000000}&selectcatagory=${selectcatagory}&product_name=${searchproduct}`)
    findsearchData(0,1000000,selectcatagory,searchproduct)
}

function clearcatagory()
{
    history(`?lowprice=${lowprice}&highprice=${highprice}&selectcatagory=${'ALL'}&product_name=${searchproduct}`)
    findsearchData(lowprice,highprice,'ALL',searchproduct)
}

function backTOHome()
{
    history(`?lowprice=${0}&highprice=${1000000}&selectcatagory=${'ALL'}&product_name=${''}`)
    findsearchData(0,1000000,'ALL','')
}

function AddToCart(product_id)
{
    dispatch(cartmethod.ADD_TO_CART(product_id))
    history('/Cart')
}


  return (
    <>
    {  load==true?
            <div className="Loaderitem">
                <PulseLoader color="#16A085"  />
            </div>
        :
        data.length!=0?
            <>
                <div className='allproduct'> 

                    <div  className='subproduct'>
                        <div className='subproductone'>
                            <input className="form-control" style={{width:"180px"}} value={searchproduct} name='search' onChange={(e)=>{setsearchproduct(e.target.value)}}  type="search" placeholder="Search product" aria-label="Search"/>
                            <div className='subproductform'>
                               <button className="btn btn-success btn-sm mt-2" onClick={()=>search(searchproduct)} type="submit">Search</button>
                               {
                                 searchproduct.length==0?<button className="btn btn-secondary btn-sm mt-2"  disabled={true} type="submit">Clear</button>
                                 :<button className="btn btn-secondary btn-sm mt-2" onClick={clearsearch}  type="submit">Clear</button>
                               }
                            </div>
                        </div>
                        <div className='subproductone'>
                            <div className='subproductform'>
                                <h6>Price</h6>
                                <h6>
                                    {pricerange0to1000|| pricerange1000to2000|| pricerange2000to3000||pricerange3000to4000||pricerange4000toUp? <p onClick={clearPrice} style={{color:"#48C9B0",cursor:'pointer'}}>Clear</p>:<p>Clear</p>}
                                </h6>
                            </div>
                           <div className="form-check">
                                <input className="form-check-input" onClick={()=>cametocheck(0,1000)} checked={pricerange0to1000} onChange={(e)=>setpricerange0to1000(e.target.checked)} type="radio"  />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Under ₹ 1000
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" onClick={()=>cametocheck(1000,2000)} checked={pricerange1000to2000} onChange={(e)=>setpricerange1000to2000(e.target.checked)}   type="radio"  />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                ₹ 1000 - ₹ 2000
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" onClick={()=>cametocheck(2000,3000)} checked={pricerange2000to3000} onChange={(e)=>setpricerange2000to3000(e.target.checked)}  type="radio"  />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                ₹ 2000 - ₹ 3000
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" onClick={()=>cametocheck(3000,4000)} checked={pricerange3000to4000} onChange={(e)=>setpricerange3000to4000(e.target.checked)}  type="radio"  />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                ₹ 3000 - ₹ 4000
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" onClick={()=>cametocheck(4000,1000000)} checked={pricerange4000toUp} onChange={(e)=>setpricerange4000toUp(e.target.checked)}  type="radio"  />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Over ₹ 4000
                                </label>
                            </div>
                        </div>
                        <div className='subproductone mt-3'>
                           <div className='subproductform'>
                                <h6>Sorting</h6>
                                <h6>
                                {
                                    priceLowTOHigh||priceHighTOLow||SortOnRating||SortOffer ? <p onClick={clearallfilter} style={{color:"#48C9B0",cursor:'pointer'}}>Clear</p>:<p>Clear</p>
                                }
                                </h6>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" onClick={PriceLowToHighfunction} checked={priceLowTOHigh}  type="radio"  />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Price Low To High
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" onClick={PriceHighToLowfunction} checked={priceHighTOLow}  type="radio"  />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Price High To Low
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" onClick={SortOnRatingfunction} checked={SortOnRating} type="radio"  />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Sort On Rating
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" onClick={SortOnOfferfunction} checked={SortOffer}  type="radio"  />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Sort Offer
                                </label>
                            </div>
                        </div>
                        <div className='subproductone mt-3'>
                           <div className='subproductform'>
                                <h6>Catagory</h6>
                                {
                                    selectcatagory!="ALL" ? <h6><p onClick={clearcatagory} style={{color:"#48C9B0",cursor:'pointer'}}>Clear</p></h6>:<h6><p>Clear</p></h6>
                                }
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" onClick={()=>cametocatagory('ALL')} checked={ALL} onChange={(e)=>setALL(e.target.checked)} type="radio"  />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                 ALL
                                </label>
                            </div>
                            {
                                Catagory&&Catagory.map((item,ind)=>(
                                    <div className="form-check mt-2" key={ind}>
                                        {
                                            item==selectcatagory?<input className="form-check-input" onClick={()=>cametocatagory(item)} checked={true} type="radio" />
                                            :<input className="form-check-input" onClick={()=>cametocatagory(item)} type="radio"  />
                                        }
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            {item}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>   

                    <div className='product'>
                    {
                       data && data.map((item,ind)=>(
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
                                                <div className='col'>
                                                    <button className="btn btn-primary rounded-pill btn-sm mt-0" onClick={()=>AddToCart(item._id)} >
                                                        ADD TO CART
                                                    </button>
                                                </div>
                                            }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </>
        :
        <div className='loader-container'>
            <h4>Product Not Found</h4>
            <button className='btn btn-primary mx-3' onClick={backTOHome}>Back</button>
        </div>
        
        }
    </>
  )
}
