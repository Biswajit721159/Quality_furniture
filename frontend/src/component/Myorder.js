import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import swal from "sweetalert";
import loader from "../images/loader.gif"


export default function Myorder() {

  const userinfo=JSON.parse(localStorage.getItem('user'));
  const cart=JSON.parse(localStorage.getItem('cart'));
  const [data,setdata]=useState([])
  const history=useNavigate()
  const [load,setload]=useState(true)

  useEffect(()=>{
    if(userinfo==null)
    {
        history('/Register')
    }
    else
    {
        fetch(`https://quality-furniture.vercel.app/order/${userinfo.user.email}`,{
            headers:{
                auth:`bearer ${userinfo.auth}`
            }
        }).then(responce=>responce.json()).then((order)=>{
            fetch('https://quality-furniture.vercel.app/product',{
                headers:{
                    auth:`bearer ${userinfo.auth}`
                }
            }).then(responce=>responce.json()).then((product)=>{
                fetch('https://quality-furniture.vercel.app/Reviews',{
                    headers:{
                        auth:`bearer ${userinfo.auth}`
                    }
                }).then(responce=>responce.json()).then((Reviews)=>{
                    if(order!=undefined && product!=undefined && Reviews!=undefined)
                    {
                        setload(false)
                    }
                    setToproduct(order,product,Reviews)
                })
            })
        })
    }
  },[])

  function setToproduct(order,product,Reviews)
  {
    if(product==undefined ||order ==undefined || Reviews==undefined) return
    else
    {
        let ans=[]
        for(let i=0;i<order.length;i++)
        {
            let obj={
                id:order[i]._id,
                address:order[i].address,
                product_id:order[i].product_id,
                product_count:order[i].product_count,
                payment_method:order[i].payment_method,
                Total_rupess:order[i].Total_rupess,
                Date:order[i].Date,
                product_name:"",
                newImage:[],
                isfeedback:false,
            }
            for(let j=0;j<product.length;j++)
            {
                if(product[j]._id==obj.product_id)
                {
                    obj.newImage=product[j].newImage
                    obj.product_name=product[j].product_name
                }
            }
            for(let j=0;j<Reviews.length;j++)
            {
                if(Reviews[j].email==userinfo.user.email && Reviews[j].order_id==order[i]._id)
                {
                    obj.isfeedback=true
                }
            }
            ans.push(obj)
        }
        let arr=ans.reverse()
        setdata([...arr])
    }
  }

  function showaddress(data)
  {
    swal(data)
  }
  
  return (
    <div className='container'>
        {
            data!=undefined && data.length!=0 ?
            <>
                {userinfo?<h4>Your order {userinfo.user.name}</h4>:""}
                <table className="table table-striped shadow-lg p-0 mb-2 bg-white rounded">
                    <thead>
                        <tr>
                            <th className='text-center' scope="col">#</th>
                            <th className='text-center' scope="col">Product Name</th>
                            <th className='text-center' scope="col">Product Count</th>
                            <th className='text-center' scope="col">Payment Method</th>
                            <th className='text-center' scope="col">Total_rupess</th>
                            <th className='text-center' scope="col">Date</th>
                            <th className='text-center' scope="col">Address</th>
                            <th className='text-center' scope="col">Feedback</th>
                        </tr>
                    </thead>
                    {
                        
                        <tbody>
                            {
                            data.map((item,ind)=>(
                                <tr key={ind}>
                                    <th className='text-center' scope="row">{ind}</th>
                                    <td className='text-center'>
                                    <div className="card" style={{width: "18rem"}}>
                                        <img className="card-img-top" src={item.newImage[0]} alt="Card image cap"/>
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
                </>
                :load?<div className='loader-container'><img src={loader} /></div>:<h5>Product Not Found</h5>
            }
    </div>
  )
}
