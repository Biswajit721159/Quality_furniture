
import { Link,useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import avatar from '../images/result.png';
import  '../App.css';
import axios from 'axios';
const url = "http://quality-furniture.vercel.app/uploads";


export default function Addproduct() {

  const history=useNavigate();
  const [postImage, setPostImage] = useState([])
  const [product_name,setproduct_name]=useState("")
  const [price,setprice]=useState()
  const [offer,setoffer]=useState()
  const [product_type,setproduct_type]=useState("")
  const [total_number_of_product,settotal_number_of_product]=useState()
  const userinfo=JSON.parse(localStorage.getItem('user'))


  //validation part ----
  const [errorproduct_name,seterrorproduct_name]=useState(false)
  const [errorproduct_namemess,seterrorproduct_namemess]=useState("")
  const [errorprice,seterrorprice]=useState(false)
  const [errorpricemess,seterrorpricemess]=useState("")
  const [erroroffer,seterroroffer]=useState(false)
  const [erroroffermess,seterroroffermess]=useState("")
  const [errorproduct_type,seterrorproduct_type]=useState(false)
  const [errorproduct_typemess,seterrorproduct_typemess]=useState("")
  const [errorNumberOfProduct,seterrorNumberOfProduct]=useState(false)
  const [errorNumberOfProductmess,seterrorNumberOfProductmess]=useState("")
  const [button,setbutton]=useState("Submit")
  const [disable,setdisable]=useState(false);

  useEffect(()=>{
    if(userinfo==null)
    {
      history('/Register')
    }
  },[])

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

  const createPost = async (postImage) => {
    if(postImage.length>3)
    {
      while(postImage.length>3)
      {
        postImage.pop()
      }
    }
    let a=forproduct_name(product_name)
    let b=forproduct_type(product_type)
    let c=forprice(price)
    let d=foroffer(offer)
    let e=forTotalNoProduct(total_number_of_product)
    if(a && b && c && d && e)
    {
      setbutton("Please wait....")
      setdisable(true)
      fetch('http://quality-furniture.vercel.app/uploads',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          auth:`bearer ${userinfo.auth}`
        },
        body:JSON.stringify({
          newImage:postImage,
          product_name:product_name,
          price:price,
          offer:offer,
          product_type:product_type,
          total_number_of_product:total_number_of_product,
          rating:0,
          number_of_people_give_rating:0,
          isdeleted:false
        })
      }).then(responce=>responce.json()).then((res)=>{
        history('/Product')
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    let length=(file.size/1024)
    postImage.push(base64);
    setPostImage([...postImage]);
  }

  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }


  return (
    <div className='container center'>
       <form onSubmit={handleSubmit}>
          {/* <div className="col mt-3">
            <img className='file' src={postImage.myFile || avatar} alt="" />
          </div> */}
          <div className="col-md-4 mt-3">
            <label htmlFor="formFile" className="form-label">Home Image</label>
            <input type="file" className="form-control"  name="myFile"  accept='.jpeg, .png, .jpg' required onChange={(e) => handleFileUpload(e)} />
          </div>
          <div className="col-md-4">
            <label htmlFor="formFile" className="form-label">First Image</label>
            <input type="file" className="form-control"  name="myFile"  accept='.jpeg, .png, .jpg' required onChange={(e) => handleFileUpload(e)} />
          </div>
          <div className="col-md-4">
          <label htmlFor="formFile" className="form-label">Second Image</label>
            <input className="form-control" type="file" name="myFile"  accept='.jpeg, .png, .jpg' required onChange={(e) => handleFileUpload(e)} />
          </div>
          
          <div className="col-md-4 mt-3">
              <div className="form-group">
                  <input type="text" value={product_name} onChange={(e)=>{setproduct_name(e.target.value)}} name="product_name" className="form-control" placeholder="Enter Product Name"  required/>
                  {errorproduct_name?<label  style={{color:"red"}}>{errorproduct_namemess}</label>:""}
              </div>
          </div>
          <div className="col-md-4">
              <div className="form-group">
                  <input type="number" value={price} onChange={(e)=>{setprice(e.target.value)}} name="Price" className="form-control" placeholder="Enter Price"  required/>
                  {errorprice?<label  style={{color:"red"}}>{errorpricemess}</label>:""}
              </div>
          </div>
          <div className="col-md-4">
              <div className="form-group">
                  <input type="number" value={offer} onChange={(e)=>{setoffer(e.target.value)}} name="Offer" className="form-control" placeholder="Enter Offer"  required/>
                  {erroroffer?<label  style={{color:"red"}}>{erroroffermess}</label>:""}
              </div>
          </div>
          <div className="col-md-4">
              <div className="form-group">
                  <input type="text"  value={product_type} onChange={(e)=>{setproduct_type(e.target.value)}} name="product_Type" className="form-control" placeholder="Enter Product Type"  required/>
                  {errorproduct_type?<label  style={{color:"red"}}>{errorproduct_typemess}</label>:""}
              </div>
          </div>
          <div className="col-md-4">
              <div className="form-group">
                  <input type="number" value={total_number_of_product} onChange={(e)=>{settotal_number_of_product(e.target.value)}} name="product_name" className="form-control" placeholder="Total Number Of Product"  required/>
                  {errorNumberOfProduct?<label  style={{color:"red"}}>{errorNumberOfProductmess}</label>:""}
              </div>
          </div> 
          <div className="col"><button type='submit' disabled={disable} className='btn btn-primary'>{button}</button></div>

        </form>
    </div>
  )
}
