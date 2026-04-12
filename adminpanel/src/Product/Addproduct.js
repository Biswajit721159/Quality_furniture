import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { Package, Upload, AlertCircle, ArrowLeft } from 'lucide-react';
const api = process.env.REACT_APP_API

export default function Addproduct() {
  const history = useNavigate();
  const [product_name, setproduct_name]                     = useState("")
  const [price, setprice]                                   = useState("")
  const [offer, setoffer]                                   = useState("")
  const [product_type, setproduct_type]                     = useState("")
  const [total_number_of_product, settotal_number_of_product] = useState("")
  const userinfo = JSON.parse(localStorage.getItem('user'))

  const [file1, setfile1] = useState(null)
  const [file2, setfile2] = useState(null)
  const [file3, setfile3] = useState(null)
  const [preview1, setpreview1] = useState(null)
  const [preview2, setpreview2] = useState(null)
  const [preview3, setpreview3] = useState(null)

  const [errorproduct_name, seterrorproduct_name]           = useState(false)
  const [errorproduct_namemess, seterrorproduct_namemess]   = useState("")
  const [errorprice, seterrorprice]                         = useState(false)
  const [errorpricemess, seterrorpricemess]                 = useState("")
  const [erroroffer, seterroroffer]                         = useState(false)
  const [erroroffermess, seterroroffermess]                 = useState("")
  const [errorNumberOfProduct, seterrorNumberOfProduct]     = useState(false)
  const [errorNumberOfProductmess, seterrorNumberOfProductmess] = useState("")
  const [Description, setDescription] = useState('')
  const [button, setbutton]   = useState("Add Product")
  const [disable, setdisable] = useState(false);
  const [arr, setarr]         = useState([])

  useEffect(() => {
    if (userinfo == null) history('/Signin')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function forproduct_name(s) {
    if (s.length < 3) { seterrorproduct_name(true); seterrorproduct_namemess("Invalid Product Name"); return false }
    return true
  }
  function forproduct_type(s) {
    if (s.length < 3) { return false }
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

  const handleFileChange = (setter, previewSetter) => (e) => {
    const file = e.target.files[0];
    setter(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => previewSetter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );
      const res = await response.json();
      arr.push(res.secure_url)
      if (arr.length === 3) submitproductdetail(arr)
      setarr([...arr])
    } catch (error) { return null }
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
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${userinfo.accessToken}` },
        body: JSON.stringify({ arr, product_name, price, offer, product_type, total_number_of_product, rating: 0, number_of_people_give_rating: 0, isdeleted: false, Description })
      }).then(r => r.json()).then((res) => {
        if (res.statusCode === 201) {
          toast.success(res.message);
          history(-1);
        } else if (res.statusCode === 498) {
          localStorage.removeItem('user'); history('/Signin');
        } else { history('*') }
      }).catch(() => history('*'))
    }
  }

  const createPost = async () => {
    setdisable(true)
    setbutton(<ClipLoader size={'15px'} color="#fff" />)
    await uploadImage(file1)
    await uploadImage(file2)
    await uploadImage(file3)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost()
  }

  const productTypes = ['Chair', 'Window', 'Table', 'Almari', 'Door', 'Other'];

  const ImageUpload = ({ preview, onChange, label, required }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-blue-300 transition-all overflow-hidden">
        {preview ? (
          <img src={preview} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center text-slate-400">
            <Upload size={24} />
            <p className="text-xs mt-2 font-medium">Click to upload</p>
            <p className="text-xs text-slate-300">PNG, JPG, JPEG</p>
          </div>
        )}
        <input type="file" hidden accept=".jpeg,.png,.jpg" required={required} onChange={onChange} />
      </label>
    </div>
  );

  const Field = ({ label, value, onChange, error, errorMsg, type = 'text', required }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2.5 border rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
          ${error ? 'border-red-300' : 'border-slate-200'}`}
      />
      {error && (
        <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
          <AlertCircle size={11} /> {errorMsg}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
          <Package size={18} className="text-emerald-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Add New Product</h1>
          <p className="text-slate-500 text-xs">Fill in the details to add a product to the catalog</p>
        </div>
      </div>

      <button
        onClick={() => history(-1)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <form onSubmit={handleSubmit}>
        {/* Images */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-card p-6 mb-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Product Images</h2>
          <div className="grid grid-cols-3 gap-4">
            <ImageUpload preview={preview1} onChange={handleFileChange(setfile1, setpreview1)} label="Image 1" required />
            <ImageUpload preview={preview2} onChange={handleFileChange(setfile2, setpreview2)} label="Image 2" />
            <ImageUpload preview={preview3} onChange={handleFileChange(setfile3, setpreview3)} label="Image 3" />
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-card p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-700">Product Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Product Name" value={product_name} required
              onChange={(e) => setproduct_name(e.target.value)}
              error={errorproduct_name} errorMsg={errorproduct_namemess}
            />
            <Field
              label="Price (₹)" type="number" value={price} required
              onChange={(e) => setprice(e.target.value)}
              error={errorprice} errorMsg={errorpricemess}
            />
            <Field
              label="Offer (%)" type="number" value={offer} required
              onChange={(e) => setoffer(e.target.value)}
              error={erroroffer} errorMsg={erroroffermess}
            />
            <Field
              label="Stock Quantity" type="number" value={total_number_of_product} required
              onChange={(e) => settotal_number_of_product(e.target.value)}
              error={errorNumberOfProduct} errorMsg={errorNumberOfProductmess}
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Product Type <span className="text-red-500">*</span>
            </label>
            <select
              value={product_type}
              onChange={(e) => setproduct_type(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select a type...</option>
              {productTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Enter product description..."
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={disable}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-md shadow-blue-600/20"
            >
              {button}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
