import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { usermethod } from '../redux/userslice'
import { selectProductmethod } from '../redux/selectProduct'
import { PulseLoader, BeatLoader } from 'react-spinners';
import swal from 'sweetalert'
import { ArrowLeft, Upload, Loader2, ImageIcon } from 'lucide-react';
const api = process.env.REACT_APP_API

const Product_View = () => {
  const dispatch = useDispatch();
  const _id      = useParams()._id
  const userinfo = useSelector((state) => state.user.user)
  const product  = useSelector((state) => state.selectProduct.selectproduct)
  const [load, setload] = useState(false)

  const [product_name, setproduct_name]                     = useState("")
  const [price, setprice]                                   = useState("")
  const [offer, setoffer]                                   = useState("")
  const [product_type, setproduct_type]                     = useState("")
  const [total_number_of_product, settotal_number_of_product] = useState()
  const [number_of_people_give_rating, setnumber_of_people_give_rating] = useState()
  const [rating, setrating]                                 = useState()
  const [Description, setDescription]                       = useState('')
  const [isdeleted, setisdeleted]                           = useState()

  const [file1, setfile1] = useState(null)
  const [file2, setfile2] = useState(null)
  const [file3, setfile3] = useState(null)

  const [errorproduct_name, seterrorproduct_name]           = useState(false)
  const [errorproduct_namemess, seterrorproduct_namemess]   = useState("")
  const [errorprice, seterrorprice]                         = useState(false)
  const [errorpricemess, seterrorpricemess]                 = useState("")
  const [erroroffer, seterroroffer]                         = useState(false)
  const [erroroffermess, seterroroffermess]                 = useState("")
  const [errorproduct_type, seterrorproduct_type]           = useState(false)
  const [errorproduct_typemess, seterrorproduct_typemess]   = useState("")
  const [errorNumberOfProduct, seterrorNumberOfProduct]     = useState(false)
  const [errorNumberOfProductmess, seterrorNumberOfProductmess] = useState("")
  const [button, setbutton]   = useState("Save Changes")
  const [disable, setdisable] = useState(false);
  let [arr, setarr] = useState([])

  const [image1, setimage1] = useState('')
  const [image2, setimage2] = useState('')
  const [image3, setimage3] = useState('')
  let count = 0

  const history = useNavigate()

  useEffect(() => { loadproduct(); }, [])

  function loadproduct() {
    setload(true)
    fetch(`${api}/product/${_id}`, {
      headers: { Authorization: `Bearer ${userinfo.accessToken}` }
    }).then(r => r.json()).then((data) => {
      if (data.statusCode == 201) {
        arr = data.data.newImage
        setarr([...arr])
        dispatch(selectProductmethod.ADD_PRODUCT(data.data))
        setProduct(data.data)
        setload(false)
      } else if (data.statusCode == 498) {
        dispatch(usermethod.LOGOUT())
        history('/')
      } else {
        history('*')
      }
    }).catch(() => history('*'))
  }

  function setProduct(p) {
    setproduct_name(p.product_name)
    setproduct_type(p.product_type)
    setprice(p.price)
    setoffer(p.offer)
    settotal_number_of_product(p.total_number_of_product)
    setrating(p.rating)
    setnumber_of_people_give_rating(p.number_of_people_give_rating)
    setDescription(p.Description)
    setisdeleted(p.isdeleted)
  }

  const handleFileUpload = (setter, imageSetter) => (e) => {
    const data = e.target.files[0];
    setter(data)
    if (data) {
      const reader = new FileReader();
      reader.onloadend = () => imageSetter(reader.result);
      reader.readAsDataURL(data);
    }
  }

  function forproduct_name(s) {
    if (s.length < 3) { seterrorproduct_name(true); seterrorproduct_namemess("Invalid Product Name"); return false }
    return true
  }
  function forproduct_type(s) {
    if (s.length < 3) { seterrorproduct_type(true); seterrorproduct_typemess("Invalid Product Type"); return false }
    return true
  }
  function forprice(s) {
    if (s <= 0) { seterrorprice(true); seterrorpricemess("Invalid Price"); return false }
    return true
  }
  function foroffer(s) {
    if (s <= 0 || s >= 99) { seterroroffer(true); seterroroffermess("Invalid offer"); return false }
    return true
  }
  function forTotalNoProduct(s) {
    if (s <= 0) { seterrorNumberOfProduct(false); seterrorNumberOfProductmess("Invalid Total Number Product"); return false }
    return true
  }

  const uploadImage = async (file, index) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");
    try {
      fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST", body: data,
      }).then(r => r.json()).then((res) => {
        count++;
        arr[index] = res.secure_url
        setarr([...arr])
        if (count == 3) FinalUpdate(arr)
      })
    } catch (error) { return null }
  };

  const FinalUpdate = async (arr) => {
    fetch(`${api}/product/ProductUpdate/${_id}`, {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${userinfo.accessToken}` },
      body: JSON.stringify({ arr, product_name, price, offer, product_type, total_number_of_product, rating, number_of_people_give_rating, isdeleted, Description })
    }).then(r => r.json()).then((res) => {
      if (res.statusCode == 200) {
        setdisable(false)
        setbutton("Save Changes")
        swal(res.message).then(() => loadproduct()).catch(() => history('*'))
      } else if (res.statusCode == 498) {
        localStorage.removeItem('user'); history('/Signin');
      } else { history('*') }
    }).catch(() => history('*'))
  }

  const Update = async () => {
    let a = forproduct_name(product_name)
    let b = forproduct_type(product_type)
    let c = forprice(price)
    let d = foroffer(offer)
    let e = forTotalNoProduct(total_number_of_product)
    if (a && b && c && d && e) {
      setdisable(true)
      setbutton(<BeatLoader color="#fff" size={'8px'} />)
      if (file1 != null) { await uploadImage(file1, 0) } else { count++ }
      if (file2 != null) { await uploadImage(file2, 1) } else { count++ }
      if (file3 != null) { await uploadImage(file3, 2) } else { count++ }
      if (file1 == null && file2 == null && file3 == null) FinalUpdate(arr)
    } else {
      setdisable(false)
      setbutton("Save Changes")
    }
  }

  const productTypes = ['Chair', 'Window', 'Table', 'Almari', 'Door', 'Other'];

  const InputField = ({ label, value, onChange, error, errorMsg, type = 'text', readOnly = false, disabled = false }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        className={`w-full px-3 py-2.5 border rounded-lg text-sm text-slate-800 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
          ${error ? 'border-red-300 focus:ring-red-400' : 'border-slate-200'}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>}
    </div>
  );

  const ImageUploadCard = ({ src, preview, onFileChange, label }) => (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 group">
        {src ? (
          <img src={src} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <ImageIcon size={32} />
            <p className="text-xs mt-2">No image</p>
          </div>
        )}
        <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <div className="flex flex-col items-center text-white">
            <Upload size={20} />
            <span className="text-xs mt-1">Change</span>
          </div>
          <input type="file" hidden accept=".jpeg,.png,.jpg" onChange={onFileChange} />
        </label>
      </div>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
    </div>
  );

  if (load) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <PulseLoader size={10} color="#3b82f6" />
          <p className="text-slate-500 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Edit Product</h1>
          <p className="text-slate-500 text-sm mt-1 font-mono">{_id}</p>
        </div>
        <button
          onClick={() => history('/Product')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
        >
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Product Images</h2>
        <div className="grid grid-cols-3 gap-4">
          <ImageUploadCard
            src={file1 ? image1 : product.newImage[0]}
            onFileChange={handleFileUpload(setfile1, setimage1)}
            label="Image 1"
          />
          <ImageUploadCard
            src={file2 ? image2 : product.newImage[1]}
            onFileChange={handleFileUpload(setfile2, setimage2)}
            label="Image 2"
          />
          <ImageUploadCard
            src={file3 ? image3 : product.newImage[2]}
            onFileChange={handleFileUpload(setfile3, setimage3)}
            label="Image 3"
          />
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card p-6 space-y-5">
        <h2 className="text-sm font-semibold text-slate-700">Product Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="Product ID" value={product._id} disabled />
          <InputField
            label="Product Name"
            value={product_name}
            onChange={(e) => setproduct_name(e.target.value)}
            error={errorproduct_name}
            errorMsg={errorproduct_namemess}
          />

          {/* Product Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Product Type</label>
            <select
              value={product_type}
              onChange={(e) => setproduct_type(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {productTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <InputField
            label="Price (₹)"
            type="number"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            error={errorprice}
            errorMsg={errorpricemess}
          />
          <InputField
            label="Offer (%)"
            type="number"
            value={offer}
            onChange={(e) => setoffer(e.target.value)}
            error={erroroffer}
            errorMsg={erroroffermess}
          />
          <InputField
            label="Stock Quantity"
            type="number"
            value={total_number_of_product}
            onChange={(e) => settotal_number_of_product(e.target.value)}
            error={errorNumberOfProduct}
            errorMsg={errorNumberOfProductmess}
          />
          <InputField label="Rating" value={rating} readOnly />
          <InputField label="Total Ratings" value={number_of_people_give_rating} readOnly />

          {/* Is Deleted */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Product Deleted</label>
            <select
              value={isdeleted}
              onChange={(e) => setisdeleted(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value={false}>No (Active)</option>
              <option value={true}>Yes (Deleted)</option>
            </select>
          </div>
        </div>

        {/* Timestamps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Created At" value={product.createdAt} disabled />
          <InputField label="Last Updated" value={product.updatedAt} disabled />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Product description..."
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            onClick={Update}
            disabled={disable}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-md shadow-blue-600/20"
          >
            {disable ? (
              <><Loader2 size={15} className="animate-spin" /> Saving...</>
            ) : button}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product_View;
