import { Link, json, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css';
import swal from 'sweetalert'
import { PulseLoader, BeatLoader, ClipLoader } from 'react-spinners';
const api = process.env.REACT_APP_API
export default function Addproduct() {

  const history = useNavigate();
  const [product_name, setproduct_name] = useState("")
  const [price, setprice] = useState("")
  const [offer, setoffer] = useState("")
  const [product_type, setproduct_type] = useState("")
  const [total_number_of_product, settotal_number_of_product] = useState()
  const userinfo = JSON.parse(localStorage.getItem('user'))

  const [file1, setfile1] = useState(null)
  const [file2, setfile2] = useState(null)
  const [file3, setfile3] = useState(null)

  //validation part ----
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
  const [Description, setDescription] = useState('')
  const [button, setbutton] = useState("Submit")
  const [disable, setdisable] = useState(false);
  const [arr, setarr] = useState([])



  useEffect(() => {
    if (userinfo == null) {
      history('/Signin')
    }
  }, [])

  function forproduct_name(s) {
    if (s.length < 3) {
      seterrorproduct_name(true)
      seterrorproduct_namemess("Invalid Product Name");
      return false
    }
    else {
      return true
    }
  }

  function forproduct_type(s) {
    if (s.length < 3) {
      seterrorproduct_type(true)
      seterrorproduct_typemess("Invalid Product Type");
      return false
    }
    else {
      return true
    }
  }

  function forprice(s) {
    if (s <= 0) {
      seterrorprice(true)
      seterrorpricemess("Invalid Price")
      return false;
    }
    return true
  }

  function foroffer(s) {
    if (s <= 0 || s >= 99) {
      seterroroffer(true)
      seterroroffermess("Invalid offer")
      return false;
    }
    return true
  }

  function forTotalNoProduct(s) {
    if (s <= 0) {
      seterrorNumberOfProduct(false)
      seterrorNumberOfProductmess("Invalid Total Number Product ")
      return false;
    }
    return true;
  }

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data,
      }
      );
      const res = await response.json();
      arr.push(res.secure_url)
      if (arr.length == 3) {
        submitproductdetail(arr)
      }
      setarr([...arr])
    } catch (error) {
      return null
    }
  };

  const submitproductdetail = async (arr) => {

    let a = forproduct_name(product_name)
    let b = forproduct_type(product_type)
    let c = forprice(price)
    let d = foroffer(offer)
    let e = forTotalNoProduct(total_number_of_product)
    if (a && b && c && d && e) {
      fetch(`${api}/product/uploads`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userinfo.accessToken}`
        },
        body: JSON.stringify({
          'arr': arr,
          'product_name': product_name,
          'price': price,
          'offer': offer,
          'product_type': product_type,
          'total_number_of_product': total_number_of_product,
          'rating': 0,
          'number_of_people_give_rating': 0,
          'isdeleted': false,
          'Description': Description
        })
      }).then(responce => responce.json()).then((res) => {
        if (res.statusCode == 201) {
          let data = swal(res.message)
          data.then((result) => {
            history('/Product')
          }).catch((error) => {
            history('*')
          })
        }
        else if (res.statusCode == 498) {
          localStorage.removeItem('user');
          history('/Signin');
        }
        else {
          history('*')
        }
      }).catch((error) => {
        history('*')
      })
    }
  }

  const createPost = async () => {
    setdisable(true)
    setbutton(<ClipLoader size={'15px'} />)
    await uploadImage(file1)
    await uploadImage(file2)
    await uploadImage(file3)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost()
  }

  const handleFileUpload1 = async (e) => {
    let data = e.target.files[0];
    setfile1(data)
  }

  const handleFileUpload2 = async (e) => {
    let data = e.target.files[0];
    setfile2(data)
  }

  const handleFileUpload3 = async (e) => {
    let data = e.target.files[0];
    setfile3(data)
  }


  return (
    <div className='App' style={{ display:'flex',justifyContent:'center' }}>
      <form onSubmit={handleSubmit} className='grid' >

        <div className="col mt-3">
          <label htmlFor="formFile" className="form-label">First Image</label>
          <input type="file" className="form-control" name="myFile" accept='.jpeg, .png, .jpg' required onChange={(e) => handleFileUpload1(e)} />
        </div>
        <div className="col mt-3">
          <label htmlFor="formFile" className="form-label">Second Image</label>
          <input type="file" className="form-control" name="myFile" accept='.jpeg, .png, .jpg' onChange={(e) => handleFileUpload2(e)} />
        </div>
        <div className="col mt-3">
          <label htmlFor="formFile" className="form-label">Third Image</label>
          <input type="file" className="form-control" name="myFile" accept='.jpeg, .png, .jpg' onChange={(e) => handleFileUpload3(e)} />
        </div>
        <div className="col mt-3">
          <div className="form-group">
            <input type="text" value={product_name} onChange={(e) => { setproduct_name(e.target.value) }} name="product_name" className="form-control" placeholder="Enter Product Name" required />
            {errorproduct_name ? <label style={{ color: "red" }}>{errorproduct_namemess}</label> : ""}
          </div>
        </div>
        <div className="col mt-3">
          <div className="form-group">
            <input type="number" value={price} onChange={(e) => { setprice(e.target.value) }} name="Price" className="form-control" placeholder="Enter Price" required />
            {errorprice ? <label style={{ color: "red" }}>{errorpricemess}</label> : ""}
          </div>
        </div>
        <div className="col mt-3">
          <div className="form-group">
            <input type="number" value={offer} onChange={(e) => { setoffer(e.target.value) }} name="Offer" className="form-control" placeholder="Enter Offer" required />
            {erroroffer ? <label style={{ color: "red" }}>{erroroffermess}</label> : ""}
          </div>
        </div>
        <div className="col mt-3">
          <select className="form-select" value={product_type} onChange={(e) => { setproduct_type(e.target.value) }} name="product_Type" id="inputGroupSelect01">
            <option >....</option>
            <option >Chair</option>
            <option >Window</option>
            <option >Table</option>
            <option >Almari</option>
            <option >Door</option>
            <option >Other</option>
          </select>
        </div>
        <div className="col mt-3">
          <div className="form-group">
            <input type="number" value={total_number_of_product} onChange={(e) => { settotal_number_of_product(e.target.value) }} name="product_name" className="form-control" placeholder="Total Number Of Product" required />
            {errorNumberOfProduct ? <label style={{ color: "red" }}>{errorNumberOfProductmess}</label> : ""}
          </div>
        </div>
        <div className="col mt-3">
          <div className='form-group'>
            <textarea className="form-control" placeholder='Product Description' onChange={(e) => { setDescription(e.target.value) }} id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        </div>
        <div className="col mt-3 my-4"><button type='submit' disabled={disable} className='btn btn-primary'>{button}</button></div>
      </form>
    </div>
  )
}
