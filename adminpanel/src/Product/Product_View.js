import React, { Profiler, useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {usermethod} from '../redux/userslice'
import {selectProductmethod} from '../redux/selectProduct'
import { PulseLoader ,BeatLoader ,ClipLoader} from 'react-spinners';
import './Product_view.css'
const api=process.env.REACT_APP_API
const Product_View=()=>{
    const dispatch=useDispatch();
    const _id=useParams()._id
    const userinfo=useSelector((state)=>state.user.user)
    const product=useSelector((state)=>state.selectProduct.selectproduct)
    console.log(product)
    const [load,setload]=useState(false)

    const history=useNavigate()

    useEffect(()=>{
        loadproduct();
    },[])

    function loadproduct()
    {
        setload(true)
        fetch(`${api}/product/${_id}`,{
            headers:{
                Authorization:`Bearer ${userinfo.accessToken}`
            }
        }).then((res)=>res.json()).then((data)=>{
            if(data.statusCode==201)
            {
                dispatch(selectProductmethod.ADD_PRODUCT(data.data))
                setload(false)
            }
            else if(data.statusCode==498)
            {
                dispatch(usermethod.LOGOUT())
                history('/')
            }
            else
            {
                history('*');
            }
        }).catch((error)=>{
            history('*')
        })
    }

    return(
        <>
        {
            load==true?
            <div className="Loaderitem">
               <PulseLoader color="#16A085"  />
            </div>
            :product!=null &&
            <>
                <div className='imagedata'>
                    <div className='imagedata1'>
                        <Link to={`${product.newImage[0]}`} target="_blank"><img src={product.newImage[0]}  style={{width:'300px' ,height:'300px'}} alt='Error to Load'/></Link>
                        <input type="file" placeholder='Update Image' />
                    </div>
                    <div className='imagedata1'>
                        <Link to={`${product.newImage[0]}`} target="_blank"><img src={product.newImage[1]}  style={{width:'300px' ,height:'300px'}} alt='Error to Load'/></Link>
                        <Link>Update</Link>
                    </div>
                    <div className='imagedata1'>
                        <Link to={`${product.newImage[0]}`} target="_blank"><img src={product.newImage[2]}  style={{width:'300px' ,height:'300px'}} alt='Error to Load'/></Link>
                        <Link>Update</Link>
                    </div>
                </div>
                <div className='imagedata mt-5'>
                    <div className='imagedata1'>
                        <label>Id</label>
                         <input value={product._id} disabled={true}/>
                    </div>
                    <div className='imagedata1'>
                        <label>Product Name</label>
                        <input value={product.product_name}/>
                    </div>
                    <div className='imagedata1'>
                        <label>Product Type</label>
                        <input value={product.product_type}/>
                    </div>
                    <div className='imagedata1'>
                        <label>Rating</label>
                        <input value={product.rating}/>
                    </div>
                </div>
                <div className='imagedata mt-3'>
                    <div className='imagedata1'>
                        <label>Number Of Peopel Given Rating</label>
                         <input value={product.number_of_people_give_rating}/>
                    </div>
                    <div className='imagedata1'>
                        <label>Offer</label>
                         <input value={product.offer}/>
                    </div>
                    <div className='imagedata1'>
                        <label>Price</label>
                        <input value={product.price}/>
                    </div>
                    <div className='imagedata1'>
                        <label>Number of Aviliable Product</label>
                        <input value={product.total_number_of_product}/>
                    </div>
                </div>
                <div className='imagedata mt-3'>
                   <div className='imagedata1'>
                      <label>CreatedAt</label>
                       <input value={product.createdAt} disabled={true} />
                   </div>
                   <div className='imagedata1'>
                       <label>Last Updated At</label>
                       <input value={product.updatedAt} disabled={true} />
                   </div>
                   <div className='imagedata1'>
                       <label>Product Deleted</label>
                       <input value={product.isdeleted}  />
                   </div>
                   <div className='imagedata1'>
                      <label>Description</label>
                      <textarea value={product.Description}/>
                   </div>
                </div>
                <div className='imagedata mx-5 mt-4'>
                    <button className='btn btn-primary btn-sm'>Final Update</button>
                </div>
            </>
        }
        </>
    )
}
export default Product_View