import React, { Profiler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { usermethod } from '../redux/userslice'
import { selectProductmethod } from '../redux/selectProduct'
import { PulseLoader, BeatLoader, ClipLoader } from 'react-spinners';
import { MdOutlineStarPurple500 } from "react-icons/md";
import './Product_view.css'
import swal from 'sweetalert'
const api = process.env.REACT_APP_API
const Product_View = () => {
    const dispatch = useDispatch();
    const _id = useParams()._id
    const userinfo = useSelector((state) => state.user.user)
    const product = useSelector((state) => state.selectProduct.selectproduct)
    const [load, setload] = useState(false)

    const [product_name, setproduct_name] = useState("")
    const [price, setprice] = useState("")
    const [offer, setoffer] = useState("")
    const [product_type, setproduct_type] = useState("")
    const [total_number_of_product, settotal_number_of_product] = useState()
    const [number_of_people_give_rating,setnumber_of_people_give_rating]=useState()
    const [rating,setrating]=useState()
    const [Description, setDescription] = useState('')
    const [isdeleted,setisdeleted]=useState()

    const [file1, setfile1] = useState(null)
    const [file2, setfile2] = useState(null)
    const [file3, setfile3] = useState(null)

    const [errorproduct_name, seterrorproduct_name] = useState(false)
    const [errorproduct_namemess, seterrorproduct_namemess] = useState("")
    const [errorprice, seterrorprice] = useState(false)
    const [errorpricemess, seterrorpricemess] = useState("")
    const [erroroffer, seterroroffer] = useState(false)
    const [erroroffermess, seterroroffermess] = useState("")
    const [errorproduct_type, seterrorproduct_type] = useState(false)
    const [errorproduct_typemess, seterrorproduct_typemess] = useState("")
    const [errorNumberOfProduct, seterrorNumberOfProduct] = useState(false)
    const [errorNumberOfProductmess, seterrorNumberOfProductmess] = useState("")
    const [button, setbutton] = useState("Final Update")
    const [disable, setdisable] = useState(false);
    let [arr, setarr] = useState([])

    const [image1, setimage1] = useState('')
    const [image2, setimage2] = useState('')
    const [image3, setimage3] = useState('')
    let count=0

    const history = useNavigate()

    useEffect(() => {
        loadproduct();
    }, [])

    function loadproduct() {
        setload(true)
        fetch(`${api}/product/${_id}`, {
            headers: {
                Authorization: `Bearer ${userinfo.accessToken}`
            }
        }).then((res) => res.json()).then((data) => {
            if (data.statusCode == 201) {
                arr=(data.data.newImage)
                setarr([...arr])
                dispatch(selectProductmethod.ADD_PRODUCT(data.data))
                setProduct(data.data)
                setload(false)
            }
            else if (data.statusCode == 498) {
                dispatch(usermethod.LOGOUT())
                history('/')
            }
            else {
                history('*');
            }
        })
        .catch((error) => {
            history('*')
        })
    }

    function setProduct(product)
    {
        setproduct_name(product.product_name)
        setproduct_type(product.product_type)
        setprice(product.price)
        setoffer(product.offer)
        settotal_number_of_product(product.total_number_of_product)
        setrating(product.rating)
        setnumber_of_people_give_rating(product.number_of_people_give_rating)
        setDescription(product.Description)
        setisdeleted(product.isdeleted)
    }

    const handleFileUpload1 = async (e) => {
        let data = e.target.files[0];
        setfile1(data)
        if (data) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setimage1(reader.result);
            };
            reader.readAsDataURL(data);
        }
    }

    const handleFileUpload2 = async (e) => {
        let data = e.target.files[0];
        setfile2(data)
        if (data) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setimage2(reader.result);
            };
            reader.readAsDataURL(data);
        }
    }

    const handleFileUpload3 = async (e) => {
        let data = e.target.files[0];
        setfile3(data)
        if (data) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setimage3(reader.result);
            };
            reader.readAsDataURL(data);
        }
    }

    //operation---

    function forproduct_name(s)
    {
      if(s.length<3)
      {
        seterrorproduct_name(true)
        seterrorproduct_namemess("Invalid Product Name");
        return false
      }
      else
      {
        return true
      }
    }
  
    function forproduct_type(s)
    {
      if(s.length<3)
      {
        seterrorproduct_type(true)
        seterrorproduct_typemess("Invalid Product Type");
        return false
      }
      else
      {
        return true
      }
    }
  
    function forprice(s)
    {
      if(s<=0)
      {
        seterrorprice(true)
        seterrorpricemess("Invalid Price")
        return false;
      }
      return true
    }
  
    function foroffer(s)
    {
      if(s<=0 || s>=99)
      {
        seterroroffer(true)
        seterroroffermess("Invalid offer")
        return false;
      }
      return true
    }
  
    function forTotalNoProduct(s)
    {
      if(s<=0)
      {
        seterrorNumberOfProduct(false)
        seterrorNumberOfProductmess("Invalid Total Number Product ")
        return false;
      }
      return true;
    }

    //update section --

    const uploadImage = async (file, index) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
        data.append("folder", "Cloudinary-React");
        try {
            fetch(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: data,
            }).then((responce=>responce.json())).then((res)=>{
                count++;
                arr[index] = res.secure_url
                setarr([...arr])
                if (count==3) {
                    FinalUpdate(arr)
                }
            })
            // .catch((error)=>{
            //     history('*')
            // });
        } catch (error) {
            return null
        }
    };

    const FinalUpdate = async (arr) => {
        fetch(`${api}/product/ProductUpdate/${_id}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                Authorization:`Bearer ${userinfo.accessToken}`
            },
            body:JSON.stringify({
                'arr':arr,
                'product_name':product_name,
                'price':price,
                'offer':offer,
                'product_type':product_type,
                'total_number_of_product':total_number_of_product,
                'rating':rating,
                'number_of_people_give_rating':number_of_people_give_rating,
                'isdeleted':isdeleted,
                'Description':Description
            })
        }).then(responce=>responce.json()).then((res)=>{
            if(res.statusCode==200){
                setdisable(false)
                setbutton("Final Submit")
                let data=swal(res.message)
                data.then((result)=>{
                    loadproduct()
                }).catch((error)=>{
                    history('*')
                })
            }
            else if(res.statusCode==498){
                localStorage.removeItem('user');
                history('/Signin');
            }
            else{
                history('*')
            }
        }).catch((error)=>{
            history('*')
        })
    }

    const Update = async () => {
        let a=forproduct_name(product_name)
        let b=forproduct_type(product_type)
        let c=forprice(price)
        let d=foroffer(offer)
        let e=forTotalNoProduct(total_number_of_product)
        if(a && b && c && d && e)
        {
            setdisable(true)
            setbutton(<BeatLoader color="#36d7b7" size={'8px'} />)
            if (file1 != null) {
                await uploadImage(file1, 0)
            }else{count++}
            if (file2 != null) {
                await uploadImage(file2, 1)
            }else{count++}
            if (file3 != null) {
                await uploadImage(file3, 2)
            }else{count++}
            if(file1==null && file2==null && file3==null){
                FinalUpdate(arr)
            }
        }else{
            setdisable(false)
            setbutton("Final Update")
       }
    }


    return (
        <>
            {
                load == true ?
                    <div className="Loaderitem">
                        <PulseLoader color="#16A085" />
                    </div>
                    : product != null &&
                    <>
                        <div className='imagedata'>
                            <div className='imagedata1'>
                                {file1 ? <img src={image1} style={{ width: '300px', height: '300px' }} /> :
                                    <Link to={`${product.newImage[0]}`} target="_blank"><img src={product.newImage[0]} style={{ width: '300px', height: '300px' }} alt='Error to Load' /></Link>
                                }
                                <input type="file" className="form-control" placeholder='Update Image' onChange={(e) => handleFileUpload1(e)} />
                            </div>
                            <div className='imagedata1'>
                                {file2 ? <img src={image2} style={{ width: '300px', height: '300px' }} /> :
                                    <Link to={`${product.newImage[0]}`} target="_blank"><img src={product.newImage[1]} style={{ width: '300px', height: '300px' }} alt='Error to Load' /></Link>
                                }
                                <input type="file" className="form-control" placeholder='Update Image' onChange={(e) => handleFileUpload2(e)} />
                            </div>
                            <div className='imagedata1'>
                                {file3 ? <img src={image3} style={{ width: '300px', height: '300px' }} /> :
                                    <Link to={`${product.newImage[0]}`} target="_blank"><img src={product.newImage[2]} style={{ width: '300px', height: '300px' }} alt='Error to Load' /></Link>
                                }
                                <input type="file" className="form-control" placeholder='Update Image' onChange={(e) => handleFileUpload3(e)} />
                            </div>
                        </div>

                        <div className='imagedata mt-5'>
                            <div className='imagedata1'>
                                <label>Id</label>
                                <input className="form-control"  value={product._id} disabled={true} />
                            </div>
                            <div className='imagedata1'>
                                <label>Product Name</label>
                                <input className="form-control"  value={product_name} onChange={(e)=>setproduct_name(e.target.value)}/>
                                {errorproduct_name?<label  style={{color:"red"}}>{errorproduct_namemess}</label>:""}
                            </div>
                            <div className='imagedata1'>
                                <label>Product Type</label>
                                <select className="form-select" value={product_type} onChange={(e)=>{setproduct_type(e.target.value)}} name="product_Type" id="inputGroupSelect01">
                                    <option >Chair</option>
                                    <option >Window</option>
                                    <option >Table</option>
                                    <option >Almari</option>
                                    <option >Door</option>
                                    <option >Other</option>
                                </select>
                            </div>
                            <div className='imagedata1'>
                                <label>Rating <MdOutlineStarPurple500 /></label>
                                <input className="form-control" value={rating} onChange={(e)=>setrating(e.target.value)} disabled={true}/>
                            </div>
                        </div>

                        <div className='imagedata mt-4'>
                            <div className='imagedata1'>
                                <label>Number Of people Given Rating</label>
                                <input className="form-control" type='number' value={number_of_people_give_rating}  onChange={(e)=>setnumber_of_people_give_rating(e.target.value)} disabled={true}/>
                            </div>
                            <div className='imagedata1'>
                                <label>Offer</label>
                                <input className="form-control" type='number' value={offer} onChange={(e)=>setoffer(e.target.value)}/>
                                {erroroffer?<label  style={{color:"red"}}>{erroroffermess}</label>:""}
                            </div>
                            <div className='imagedata1'>
                                <label>Price</label>
                                <input className="form-control" type='number' value={price} onChange={(e)=>setprice(e.target.value)} />
                                {errorprice?<label  style={{color:"red"}}>{errorpricemess}</label>:""}
                            </div>
                            <div className='imagedata1'>
                                <label>Number of Aviliable Product</label>
                                <input className="form-control" type='number' value={total_number_of_product} onChange={(e)=>settotal_number_of_product(e.target.value)} />
                                {errorNumberOfProduct?<label  style={{color:"red"}}>{errorNumberOfProductmess}</label>:""}
                            </div>
                        </div>

                        <div className='imagedata mt-4'>
                            <div className='imagedata1'>
                                <label>CreatedAt</label>
                                <input className="form-control" value={product.createdAt} disabled={true} />
                            </div>
                            <div className='imagedata1'>
                                <label>Last Updated At</label>
                                <input className="form-control" value={product.updatedAt} disabled={true} />
                            </div>
                            <div className='imagedata1'>
                                <label>Product Deleted</label>
                                <select className="form-select" value={isdeleted} onChange={(e)=>setisdeleted(e.target.value)} name="isdeleted" id="inputGroupSelect01">
                                    <option >false</option>
                                    <option >true</option>
                                </select>
                            </div>
                            <div className='imagedata1'>
                                <label>Description</label>
                                <textarea className="form-control" value={Description} onChange={(e)=>setDescription(e.target.value)} />
                            </div>
                        </div>

                        <div className='imagedata mx-5 mt-4'>
                            <button className='btn btn-primary btn-sm' disabled={disable} onClick={Update}>{button}</button>
                        </div>
                    </>
            }
        </>
    )
}
export default Product_View