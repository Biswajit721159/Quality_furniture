import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import swal from "sweetalert";
import { PulseLoader } from 'react-spinners';
import {MdOutlineDarkMode} from 'react-icons/md';
import '../css/Myorder.css'
const api = process.env.REACT_APP_API
export default function Myorder() {

    const userinfo=JSON.parse(localStorage.getItem('user'));
    const [data,setdata]=useState([])
    const history=useNavigate()
    const [load,setload]=useState(true)
    const [colormode,setcolormode]=useState(localStorage.getItem('colormode'));

    let [low,setlow]=useState(0);
    let [high,sethigh]=useState(5);
    let [prev,setprev]=useState(false);
    let [next,setnext]=useState(false);
 
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
       loadproduct(0,5);
    }
  },[])


  function HandalError(order)
  {
    if(order.statusCode==201)
    {
        let n=order.data.length;
        setdata(order.data.slice(0,n-1));
        setprev(order.data[n-1].prev);
        setnext(order.data[n-1].next);
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

  function loadproduct(low,high)
  {
        setload(true)
        fetch(`${api}/order/getorderByLimit/${low}/${high}/${userinfo.user.email}`,{
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

  function PrevPage()
  {
    loadproduct(low-5,high-5);
    setlow(low-5);
    sethigh(high-5);
  }

  function NextPage()
  {
    loadproduct(low+5,high+5);
    setlow(low+5);
    sethigh(high+5);
  }
  
  return (
    <>
        {
            load==true?
            <div className="Loaderitem">
                  <PulseLoader color="#16A085"  />
            </div>
             :
            data!=undefined && data.length!=0 ?
            <>   
                {/* {
                    colormode=='white'?<button className='btn btn-light rounded-circle mx-2'onClick={changecolor}><MdOutlineDarkMode/></button>
                    :<button className='btn btn-dark rounded-circle mx-2'onClick={changecolor}><MdOutlineDarkMode/></button>
                } */}
                <table className="table" style={{backgroundColor:colormode}}>
                    <thead>
                        <tr>
                            <th className='text-center' scope="col">Product Name</th>
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
                                        <td className='text-center'>
                                            <div className="card1234">
                                                {/* <Link to={`/Product/${item.product_id}`}>
                                                    <img className="card-img-top1" src={item.newImage[0]} alt="Card image cap"/>
                                                </Link> */}
                                                <Link to={`/Product/${item.product_id}`} style={{textDecoration:'none'}}>
                                                    <p className='text-center mt-1'>{item.product_name} X {item.product_count}</p>
                                                </Link>
                                            </div>
                                        </td>
                                        <td className='text-center'>₹{item.Total_rupess}</td>
                                        <td className='text-center'>{item.Date}</td>
                                        <td className='text-center' onClick={()=>{showaddress(item.address)}}>
                                            <button type="button" className="btn btn-default btn-sm text-center">Show Address</button>
                                        </td>
                                        {
                                        item.isfeedback?
                                            <td className='text-center'>
                                                <Link to={`/${item.id}/${item.product_id}/Reviews`}>
                                                    <button className='btn btn-warning btn-sm text-center' disabled>Already Given</button>
                                                </Link>
                                            </td>
                                            :
                                            <td className='text-center'>
                                                <Link to={`/${item.id}/${item.product_id}/Reviews`}>
                                                    <button className='btn btn-primary btn-sm text-center'>Give Feedback</button>
                                                </Link>
                                            </td>
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    }
                </table>
                <div className='PrevNext mt-4 mb-4'>
                    <button className='btn btn-primary btn-sm' disabled={!prev} onClick={PrevPage}>Prev</button>
                    <button className='btn btn-primary btn-sm mx-2' disabled={!next} onClick={NextPage}>Next</button>
                </div>
            </>    
            :
            <div className='loader-container'>
                <Link to={'/Product'}><button className='btn btn-info'><h4>ORDER PRODUCTS</h4></button></Link>
            </div>
        }    
    </>
  )
}
