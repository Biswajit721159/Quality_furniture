import React, { useEffect, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import { PulseLoader ,BeatLoader ,ClipLoader} from 'react-spinners';
import {cartmethod} from '../redux/CartSlice'
import {useDispatch,useSelector} from 'react-redux'
import { GrAdd } from "react-icons/gr";
import { GrSubtract } from "react-icons/gr";
import swal from 'sweetalert'
import '../css/cart.css'
const api = process.env.REACT_APP_API
export default function Cart() {

const dispatch=useDispatch();
const userinfo=JSON.parse(localStorage.getItem('user'))
let cartdata = useSelector((state) => state.cartdata.product_count);
const [data,setdata]=useState([])
const [cart,setcart]=useState(null)
const [cost,setcost]=useState(0)
const [address,setaddress]=useState()
const [button,setbutton]=useState("PLACE ORDER")
const [disabled,setdisabled]=useState(false)
const [load,setload]=useState(false)
const [product,setproduct]=useState(null)
const [loadercart,setloadercart]=useState(false)

const history=useNavigate()

 useEffect(()=>{
    if(userinfo==null)
    {
        history('/Signin')
    }
    else 
    {
        setaddress(userinfo.user.address)
        loadcart()
    }
 },[])


 useEffect(()=>{
    findCost(data);
 },[cartdata])

 function loadcart()
 {
    setload(true)
    fetch(`${api}/cart/GetCart/${userinfo.user.email}`,{
        headers:{
            Authorization:`Bearer ${userinfo.accessToken}`
        }
    }).then(responce=>responce.json())
    .then((res)=>{
        if(res.statusCode==200)
        {
            dispatch(cartmethod.ADD_TO_CART(res.data))
            setcart(res.data)
            loadproduct(res.data)
        }
        else if(res.statusCode==404)
        {
            setload(false)
            setproduct(null)
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
 
 function findCost(ans)
 {
    if(ans==undefined || ans.length==0)
    {
        setcost(0);
        return;
    }
    let x=((ans[0].price-((ans[0].price*ans[0].offer)/100))*(cartdata)).toFixed(2);
    setcost(x)
 }

 function loadproduct(cartdata)
 {
    setload(true)
    fetch(`${api}/product/${cartdata.product_id}`,{
        headers:{
            Authorization:`Bearer ${userinfo.accessToken}`
        }
    }).then(responce=>responce.json())
    .then((res)=>{
        if(res.statusCode==201)
        {
            setToproduct(res.data,cartdata)
            setload(false)
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

 function setToproduct(data,res)
 {
    if(data==undefined || res==null) return
    let ans=[]
    
    let obj={
        _id:data._id,
        product_name:data.product_name,
        rating:data.rating,
        newImage:data.newImage,
        price:data.price,
        offer:data.offer,
        product_type:data.product_type,
        total_number_of_product:data.total_number_of_product,
        number_of_people_give_rating:data.number_of_people_give_rating,
        product_count:0,
        isdeleted:false,
    }
    if(res && res.length!=0 && res.product_id==obj._id)
    {
        obj.product_count=res.product_count;
    }
    ans.push(obj)
    
    if(ans.length==0)
    {
        return 
    }
    setdata([...ans])
    findCost(ans)
    if(ans.length)setproduct(ans[0])
 }

 function DataBaseSaveADDTOCART(email,product_id,product_count)
 {
    setloadercart(true)
    fetch(`${api}/cart/Add_To_Cart`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${userinfo.accessToken}`
        },
        body:JSON.stringify({
            email:email,
            product_id:product_id,
            product_count:product_count
        })
    }).then((responce)=>responce.json())
    .then((res)=>{
        if(res.statusCode==200)
        {
            dispatch(cartmethod.ADD_TO_CART(res.data))
            setcart(res.data)
            setloadercart(false)
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

 function Add_TO_CART()
 {
    if(cartdata>=product.total_number_of_product){
        swal(`Sorry, in our stock, ${product.total_number_of_product} products are Available.`)
    }
    else if(cartdata>=5){
        swal("Sorry, your cart already has 5 products.")
    } 
    else{
        DataBaseSaveADDTOCART(userinfo.user.email,cart.product_id,cart.product_count+1)
    }
 }

 function SUB_TO_CART()
 {
    console.log(cart.product_count-1)
    if(cartdata<=0){
        swal("If you want to remove the product, there is a 'Remove' button available .")
    } 
    else if(cartdata==1){
        removeTocart()
    }
    else{
        DataBaseSaveADDTOCART(userinfo.user.email,cart.product_id,cart.product_count-1)
    }
 }

 function removeTocart()
 {
    setproduct(null)
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
        if(res.statusCode==200){
            dispatch(cartmethod.Remove_To_Cart())
        }
        else if(res.statusCode==498){
            localStorage.removeItem('user');
            history('/Signin');
        }
        else{
            history('*');
        }
    })
 }

 function submit()
 {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    if(cartdata==0)
    {
      swal("Please Select Atleast One Product .")
      return ;
    }
    setdisabled(true)
    setbutton(<BeatLoader color="#36d7b7" />)

    fetch(`${api}/order`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${userinfo.accessToken}`
        },
        body:JSON.stringify({
          email:userinfo.user.email,
          address:address,
          product_id:cart.product_id,
          product_count:cartdata,
          payment_method:"Cash on Delivary",
          Total_rupess:cost,
          Date:currentDate,
        })
    }).then(responce=>responce.json())
    .then((res)=>{
        if(res.statusCode==201){
            setbutton("Order SuccessFull")
            let id=swal(res.message, '', "success");
            id.then((res)=>{
                if(res==true){
                    history('/Myorder')
                }
            })
        }
        else if(res.statusCode==498){
            localStorage.removeItem('user');
            history('/Login')
        }
        else{
            swal(res.message)
            setdisabled(false)
            setbutton("PLACE ORDER")
        }
    }).catch((error)=>{
        history('*')
    })
 }



  return (
    <>
    {
        load==true?
        <div className="Loaderitem">
            <PulseLoader color="#16A085"  />
        </div>:
         product!=null?
         <>
            <h6 className='pricedetail mt-3' style={{textAlign:'center',fontFamily:'monospace',color:"red"}}>*If You Want to Change Your Address Go to Your Profile Section </h6>
            <div className='cartitem mt-4'>

                <div className='item1'>
                    <div className='insideritem'>
                        <Link to={`/Product/${product._id}`}><img className='styleimage' src={product.newImage[0]}  alt='Error'/></Link>
                    </div>
                    <div className='col2'>
                        <button style={{borderRadius:'30%', border:'2px solid #D0D3D4'}} onClick={SUB_TO_CART}><GrSubtract /></button>
                        <h4 className='cartcount'>
                            {
                                loadercart==true?<ClipLoader size={'15px'} />:cartdata
                            }
                        </h4>
                        <button style={{borderRadius:'30%' ,border:'2px solid #D0D3D4'}} onClick={Add_TO_CART}><GrAdd /></button>
                    </div>
                </div>

                <div className='item1item2'>
                    <h5 className='pricedetailmain' >{product.product_name}</h5>
                    <p className='pricedetail' style={{color:"#D68910"}}>{product.offer}%OFF ({product.total_number_of_product} left)</p>
                    <h6 className='pricedetail' style={{color:'gray'}}>Original - <s>₹{product.price}</s></h6> 
                    <h5 className='pricedetailmain' style={{color:'tomato'}}>Price - ₹{(product.price-((product.price*product.offer)/100)).toFixed(2)}</h5>
                    <button className='btn btn-secondary btn-sm removebutton' onClick={removeTocart}>Remove To Cart</button>
                </div>

                
                <div className='item2'>
                   <h4 className='pricedetailmain' style={{textAlign:'center'}}>PRICE DETAILS</h4>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td className='pricedetail'>Price ({cartdata} item)</td>
                                <td className='pricedetail'>₹{product.price*cartdata}</td>
                            </tr>
                            <tr>
                                <td className='pricedetail'>Discount</td>
                                <td className='pricedetail'>-₹{product.price*cartdata-cost}</td>
                            </tr>
                            <tr>
                                <td className='pricedetail'>Delivery Charges</td>
                                <td className='pricedetail'><s>80</s> Free</td>
                            </tr>
                            <tr>
                                <td className='pricedetailmain'>Total Amount</td>
                                <td className='pricedetail'>₹{cost}</td>
                            </tr>
                            <tr>
                                <td className='pricedetail' style={{color:'green'}}>You will save ₹{product.price*cartdata-cost} on this order</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div className='buttonitem'>
                <button className='btn btn-danger submitbutton' disabled={disabled}onClick={submit} >{button}</button>
            </div>
        </>    
        :<div className='loader-container'>
             <Link to={'/Product'}><button className='btn btn-info'>  <h4>ADD PRODUCTS</h4>  </button></Link>
        </div>
    }
    </>
  )
}
