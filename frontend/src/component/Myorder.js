import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import swal from "sweetalert";
import loader from "../images/loader.gif"
import { PulseLoader } from 'react-spinners';
import {MdOutlineDarkMode} from 'react-icons/md';
const api = process.env.REACT_APP_API


export default function Myorder() {

  const userinfo=JSON.parse(localStorage.getItem('user'));
//   const cart=JSON.parse(localStorage.getItem('cart'));
  const [data,setdata]=useState([])
  const history=useNavigate()
  const [load,setload]=useState(true)
  const [colormode,setcolormode]=useState(localStorage.getItem('colormode'));
 
  useEffect(()=>{
    if(colormode==null)
    {
        setcolormode('white');
        localStorage.setItem('colormode','white');
    }
    if(userinfo==null)
    {
        history('/Register')
    }
    else
    {
       loadproduct()
    }
  },[])


  function HandalError(order)
  {
    if(order.statusCode==201)
    {
        setdata(order.data)
    }
    else if(order.statusCode==498)
    {
        localStorage.removeItem('user');
        history('/Login')
    }
    else if(order.statusCode==404)
    {
        setdata([])
    }
    else if(order.statusCode==500)
    {
        history('*');
    }
    else
    {
        history("*")
    }
    setload(false)
  }

  function loadproduct()
    {
        setload(true)
        fetch(`${api}/order/getByEmail/${userinfo.user.email}`,{
            headers:{
                Authorization:`Bearer ${userinfo.accessToken}`
            }
        }).then(responce=>responce.json()).then((order)=>{
            try{
                HandalError(order)
            }
            catch{
                history('*')
            }
        })
  }

  function showaddress(data)
  {
    swal(data)
  }

  function changecolor(){
     if(colormode=='white')
     {
        setcolormode('#BFC9CA')
        localStorage.setItem('colormode','#BFC9CA');
     }
     else
     {
        setcolormode('white');
        localStorage.setItem('colormode','white');
     }
  }
  
  return (
    <>
        {
            data!=undefined && data.length!=0 ?
                <div className='container'>
                            <table className="table" style={{backgroundColor:colormode}}>
                                <thead>
                                    <tr>
                                        <th className='text-center' scope="col">#</th>
                                        <th className='text-center' scope="col">Product Name</th>
                                        <th className='text-center' scope="col">Product Count</th>
                                        <th className='text-center' scope="col">Payment Method</th>
                                        <th className='text-center' scope="col">Total_rupess</th>
                                        <th className='text-center' scope="col">Date</th>
                                        <th className='text-center' scope="col">Address</th>
                                        <th className='text-center' scope="col">
                                          Feedback
                                          {
                                            colormode=='white'?<button className='btn btn-light rounded-circle mx-2' onClick={changecolor}><MdOutlineDarkMode/></button>
                                            :<button className='btn btn-dark rounded-circle mx-2' onClick={changecolor}><MdOutlineDarkMode/></button>
                                          }
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    <tbody>
                                        {
                                            data.map((item,ind)=>(
                                                <tr key={ind}>
                                                    <th className='text-center' scope="row">{ind}</th>
                                                    <td className='text-center'>
                                                    <div className="card" style={{width: "5rem",height:"5rem"}}>
                                                        <Link to={`/Product/${item.product_id}`}>
                                                            <img className="card-img-top" src={item.newImage[0]} style={{height:'70px',width:'70px'}} alt="Card image cap"/>
                                                        </Link>
                                                    </div>
                                                    </td>
                                                    <td className='text-center'>{item.product_name} X {item.product_count}</td>
                                                    <td className='text-center'>{item.payment_method}</td>
                                                    <td className='text-center'>{item.Total_rupess}</td>
                                                    <td className='text-center'>{item.Date}</td>
                                                    <td onClick={()=>{showaddress(item.address)}}><button type="button" className="btn btn-default">Show Address</button></td>
                                                    {item.isfeedback?<td><Link to={`/${item.id}/${item.product_id}/Reviews`}><button className='btn btn-warning' disabled>Already Given</button></Link></td>:
                                                    <td><Link to={`/${item.id}/${item.product_id}/Reviews`}><button className='btn btn-primary'>Give Feedback</button></Link></td>}
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                }
                            </table>

                </div>
            :load?<div className="Loaderitem">
                <PulseLoader color="#16A085"  />
            </div>:
            <div className='loader-container'>
                <Link to={'/Product'}><button className='btn btn-info'>  <h4>ORDER PRODUCTS</h4>  </button></Link>
            </div>
        }    
    </>
  )
}
