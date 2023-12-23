import React, { useEffect, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import {AiFillStar } from "react-icons/ai";
import {FaHeart} from 'react-icons/fa';
import { PulseLoader ,BeatLoader } from 'react-spinners';
import Error from '../component/Error'
import {cartmethod} from '../redux/CartSlice'
import {useDispatch,useSelector} from 'react-redux'
import { GrAdd } from "react-icons/gr";
import { GrSubtract } from "react-icons/gr";
import '../css/cart.css'
const api = process.env.REACT_APP_API
export default function Cart() {

const dispatch=useDispatch();
const userinfo=JSON.parse(localStorage.getItem('user'))
let cartdata = useSelector((state) => state.cartdata.product_count);
const [data,setdata]=useState([])
const [cart,setcart]=useState(JSON.parse(localStorage.getItem('cart')))
const [cost,setcost]=useState(0)
const [address,setaddress]=useState()
const [wrongaddress,setwrongaddress]=useState(false)
const [messaddress,setmessaddress]=useState("")
const [button,setbutton]=useState("PLACE ORDER")
const [disabled,setdisabled]=useState(false)
const [load,setload]=useState(false)
const [product,setproduct]=useState(null)
const [model,setmodel]=useState()

const history=useNavigate()

 useEffect(()=>{
    if(userinfo==null)
    {
        history('/Register')
    }
    else if(cart)
    {
        setaddress(userinfo.user.address)
        loadproduct()
    }
 },[])

 function loadproduct()
 {
    setload(true)
    fetch(`${api}/product/${cart.product_id}`,{
        headers:{
            Authorization:`Bearer ${userinfo.accessToken}`
        }
    }).then(responce=>responce.json())
    .then((res)=>{
        let arr=[]
        if(res.data && res.data.length!=0)
        {
            arr.push(res.data)
        }
        setToproduct(arr,cart)
        setload(false)
    })
 }

 function setToproduct(data,res)// data mean product and res mean cart
 {
     res=JSON.parse(localStorage.getItem('cart'))
     if(data==undefined || res==null) return
     let ans=[]
    for(let i=0;i<data.length;i++)
    {
        let obj={
            _id:data[0]._id,
            product_name:data[0].product_name,
            rating:data[0].rating,
            newImage:data[0].newImage,
            price:data[0].price,
            offer:data[0].offer,
            product_type:data[0].product_type,
            total_number_of_product:data[0].total_number_of_product,
            number_of_people_give_rating:data[0].number_of_people_give_rating,
            product_count:0,
            isdeleted:false,
        }
        if(res && res.length!=0 && res.product_id==obj._id)
        {
            obj.product_count=res.product_count;
        }
        ans.push(obj)
    }
    if(ans.length==0)
    {
        return 
    }
    setdata([...ans])
    let x=((ans[0].price-((ans[0].price*ans[0].offer)/100))*(res.product_count)).toFixed(2);
    setcost(x)
    if(ans.length)setproduct(ans[0])
 }

 function Add_TO_CART()
 {
   dispatch(cartmethod.ADD_TO_CART(product._id))
 }

 function SUB_TO_CART()
 {
   dispatch(cartmethod.SUB_TO_CART(product._id))
 }

 function submit_order()
 {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
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
          product_count:cart.product_count,
          payment_method:"Cash on Delivary",
          Total_rupess:cost,
          Date:currentDate,
        })
      }).then(responce=>responce.json())
      .then((res)=>{
        console.log(res)
        history('/Myorder')
      })
 }

 function submit_in_product(product_data)
 {
    fetch(`${api}/product/total_number_of_product/${cart.product_id}`,{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${userinfo.accessToken}`
        },
        body:JSON.stringify({
          product_id:cart.product_id,
          product_count:product_data.total_number_of_product-cart.product_count
        })
      }).then(responce=>responce.json()).then((data)=>{
          submit_order()
      })
 }

 function submit()
  {
    if(cart !=null && cart.product_count==0)
    {
      alert("Please Select Atleast One Product .")
      return ;
    }
    setdisabled(true)
    setbutton(<BeatLoader color="#36d7b7" />)

    fetch(`${api}/product/${cart.product_id}`,{
      headers:{
        Authorization:`Bearer ${userinfo.accessToken}`
    }
    }).then(responce=>responce.json()).then((result)=>{
      let product_data=result.data
      if(product_data!=undefined && product_data.length!=0)
      {
          if(product_data.total_number_of_product>=cart.product_count)
          {
            submit_in_product(product_data)
          }
          else
          {
            alert(`Acctually We Have Total ${product_data.total_number_of_product} Product Available`)
            setbutton("PLACE ORDER")
            setdisabled(false)
          }
      }
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
            <h6 style={{textAlign:'center',fontFamily:'cursive',color:"red"}}>*If You Want to Change Your Address Go to Your Profile Section </h6>
            <div className='cartitem'>
                <div className='item1'>
                    <div className='insideritem'>
                        <Link to={`/Product/${product._id}`}><img src={product.newImage[0]} style={{height:280,widows:150,border:'2px solid green' ,borderRadius:10}} alt='Error'/></Link>
                    </div>
                </div>

                <div className='item1item2'>
                    <h5 >{product.product_name}</h5>
                    <p style={{color:"orange"}}>{product.offer}%OFF</p>
                    <h6 style={{color:'gray'}}>Original - <s>₹{product.price}</s></h6> 
                    <h5 style={{color:'tomato'}}>Price - ₹{(product.price-((product.price*product.offer)/100)).toFixed(2)}</h5>
                    {/* <h5>{product.total_number_of_product} Left Only </h5> */}
                </div>

                <div>
                    <div className='col2'>
                        <button style={{borderRadius:'40%'}} onClick={Add_TO_CART}><GrAdd /></button>
                        <h4 style={{marginLeft:20 ,marginRight:20,marginTop:5}}>{cartdata}</h4>
                        <button style={{borderRadius:'40%'}} onClick={SUB_TO_CART}><GrSubtract /></button>
                    </div>
                </div>
                
                <div className='item2'>
                <h4 style={{textAlign:'center'}}>PRICE DETAILS</h4>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Price ({product.product_count} item)</td>
                                <td>₹{product.price*product.product_count}</td>
                            </tr>
                            <tr>
                                <td>Discount</td>
                                <td>-₹{product.price*product.product_count-cost}</td>
                            </tr>
                            <tr>
                                <td>Delivery Charges</td>
                                <td><s>80</s> Free</td>
                            </tr>
                            <tr>
                                <td><h5>Total Amount</h5></td>
                                <td>₹{cost}</td>
                            </tr>
                            <tr>
                                <td style={{color:'green'}}>You will save ₹{product.price*product.product_count-cost} on this order</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='buttonitem'>
                <button className='btn btn-danger' disabled={disabled}onClick={submit} >{button}</button>
            </div>


        {/* model box */}

        {/* {
            userinfo && 
            <div>
                <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">GO</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div className="form-group">
                                    <input type="email" value={userinfo.user.email} disabled className="form-control" placeholder="Enter Email Id"  required/>
                                </div>
                                <div className="form-group">
                                    <input type="number" value={cost} disabled className="form-control"   required/>
                                </div>
                                <div className="form-group">
                                    <textarea type="text" value={address}  onChange={(e)=>{setaddress(e.target.value)}}  className="form-control" placeholder="Enter Full Address"  required/>
                                    {wrongaddress?<label  style={{color:"red"}}>{messaddress}</label>:""}
                                </div>
                                <div className="form-group">
                                    <select className="form-control" disabled aria-label="Default select example">
                                    <option selected>Cash on Delivary</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" disabled={disabled}  >{button}</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div> 
        }*/}

        </>    
        :<Error/>
    }
    </>
  )
}
