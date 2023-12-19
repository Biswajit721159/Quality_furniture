import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import swal from "sweetalert";
import loader from "../images/loader.gif"
import {MdOutlineDarkMode} from 'react-icons/md';
const api='http://localhost:5000'

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
        fetch(`${api}/order/getByEmail/${userinfo.user.email}`,{
            headers:{
                Authorization:`Bearer ${userinfo.accessToken}`
            }
        }).then(responce=>responce.json()).then((order)=>{
           setdata(order.data)
        })
    }
  },[])

//   function setToproduct(order,product,Reviews)
//   {
//     if(product==undefined ||order ==undefined || Reviews==undefined) return
//     else
//     {
//         let ans=[]
//         for(let i=0;i<order.length;i++)
//         {
//             let obj={
//                 id:order[i]._id,
//                 address:order[i].address,
//                 product_id:order[i].product_id,
//                 product_count:order[i].product_count,
//                 payment_method:order[i].payment_method,
//                 Total_rupess:order[i].Total_rupess,
//                 Date:order[i].Date,
//                 product_name:"",
//                 newImage:[],
//                 isfeedback:false,
//             }
//             for(let j=0;j<product.length;j++)
//             {
//                 if(product[j]._id==obj.product_id)
//                 {
//                     obj.newImage=product[j].newImage
//                     obj.product_name=product[j].product_name
//                 }
//             }
//             for(let j=0;j<Reviews.length;j++)
//             {
//                 if(Reviews[j].email==userinfo.user.email && Reviews[j].order_id==order[i]._id)
//                 {
//                     obj.isfeedback=true
//                 }
//             }
//             ans.push(obj)
//         }
//         let arr=ans.reverse()
//         setdata([...arr])
//     }
//   }

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
                            {userinfo?<h4>Your order {userinfo.user.name}</h4>:""}
                            <table className="table table-bordered" style={{backgroundColor:colormode}}>
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
                                                <div className="card" style={{width: "10rem",backgroundColor:"#D6DBDF"}}>
                                                <Link to={`/Product/${item.product_id}`}>
                                                    <img className="card-img-top" src={item.newImage[0]} alt="Card image cap"/>
                                                </Link>
                                                        <div className="card-body">
                                                            <p className="card-text">{item.product_name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-center'>{item.product_count}</td>
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
            :load?<div className='loader-container'><img src={loader} /></div>:
            <div className='loader-container'>
                <Link to={'/Product'}><button className='btn btn-info'>  <h4>ORDER PRODUCTS</h4>  </button></Link>
            </div>
        }    
    </>
  )
}
