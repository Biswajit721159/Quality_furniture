import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { usermethod } from '../redux/userslice'
import { selectProductmethod } from '../redux/selectProduct'
import { PulseLoader, BeatLoader } from 'react-spinners';
import swal from 'sweetalert'
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { IoMdArrowBack } from "react-icons/io";
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
    const [number_of_people_give_rating, setnumber_of_people_give_rating] = useState()
    const [rating, setrating] = useState()
    const [Description, setDescription] = useState('')
    const [isdeleted, setisdeleted] = useState()

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
    let count = 0

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
                arr = (data.data.newImage)
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

    function setProduct(product) {
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
            }).then((responce => responce.json())).then((res) => {
                count++;
                arr[index] = res.secure_url
                setarr([...arr])
                if (count == 3) {
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
        fetch(`${api}/product/ProductUpdate/${_id}`, {
            method: 'PUT',
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
                'rating': rating,
                'number_of_people_give_rating': number_of_people_give_rating,
                'isdeleted': isdeleted,
                'Description': Description
            })
        }).then(responce => responce.json()).then((res) => {
            if (res.statusCode == 200) {
                setdisable(false)
                setbutton("Final Submit")
                let data = swal(res.message)
                data.then((result) => {
                    loadproduct()
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

    const Update = async () => {
        let a = forproduct_name(product_name)
        let b = forproduct_type(product_type)
        let c = forprice(price)
        let d = foroffer(offer)
        let e = forTotalNoProduct(total_number_of_product)
        if (a && b && c && d && e) {
            setdisable(true)
            setbutton(<BeatLoader color="#36d7b7" size={'8px'} />)
            if (file1 != null) {
                await uploadImage(file1, 0)
            } else { count++ }
            if (file2 != null) {
                await uploadImage(file2, 1)
            } else { count++ }
            if (file3 != null) {
                await uploadImage(file3, 2)
            } else { count++ }
            if (file1 == null && file2 == null && file3 == null) {
                FinalUpdate(arr)
            }
        } else {
            setdisable(false)
            setbutton("Final Update")
        }
    }

    const Back = () => {
        history('/Product')
    }
    return (
        <>
            {
                load === true ?
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <PulseLoader size={'10px'} color="#16A085" />
                    </Box>
                    : product != null &&
                    <>
                        <Button size="small" type="submit" variant="contained" onClick={Back} color="info" sx={{ textAlign: 'center', mt: 1, mx: 5 }}>
                            <IoMdArrowBack /> Back
                        </Button>
                        <Box display="flex" justifyContent="space-around" flexWrap="wrap" marginBottom={5} marginTop={1}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <img src={file1 ? image1 : product.newImage[0]} alt='Error to Load' style={{ width: '300px', height: '300px', borderRadius: '10px' }} />
                                <Button variant="contained" size='small' color='success' component="label">
                                    Update Image
                                    <input type="file" hidden onChange={handleFileUpload1} />
                                </Button>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <img src={file2 ? image2 : product.newImage[1]} alt='Error to Load' style={{ width: '300px', height: '300px', borderRadius: '10px' }} />
                                <Button variant="contained" size='small' color='success' component="label">
                                    Update Image
                                    <input type="file" hidden onChange={handleFileUpload2} />
                                </Button>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <img src={file3 ? image3 : product.newImage[2]} alt='Error to Load' style={{ width: '300px', height: '300px', borderRadius: '10px' }} />
                                <Button variant="contained" size='small' color='success' component="label">
                                    Update Image
                                    <input type="file" hidden onChange={handleFileUpload3} />
                                </Button>
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="space-around" flexWrap="wrap">
                            <Box display="flex" flexDirection="column" margin={1} width="250px">
                                <TextField label="Id" value={product._id} disabled fullWidth margin="normal" />
                                <TextField label="Product Name" value={product_name} onChange={(e) => setproduct_name(e.target.value)} error={errorproduct_name} helperText={errorproduct_name ? errorproduct_namemess : ''} fullWidth margin="normal" />
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Product Type</InputLabel>
                                    <Select value={product_type} onChange={(e) => setproduct_type(e.target.value)}>
                                        <MenuItem value="Chair">Chair</MenuItem>
                                        <MenuItem value="Window">Window</MenuItem>
                                        <MenuItem value="Table">Table</MenuItem>
                                        <MenuItem value="Almari">Almari</MenuItem>
                                        <MenuItem value="Door">Door</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField label="Rating" value={rating} onChange={(e) => setrating(e.target.value)} InputProps={{ readOnly: true }} fullWidth margin="normal" />
                            </Box>

                            <Box display="flex" flexDirection="column" margin={1} width="250px">
                                <TextField label="Number Of People Given Rating" value={number_of_people_give_rating} onChange={(e) => setnumber_of_people_give_rating(e.target.value)} InputProps={{ readOnly: true }} fullWidth margin="normal" />
                                <TextField label="Offer" type="number" value={offer} onChange={(e) => setoffer(e.target.value)} error={erroroffer} helperText={erroroffer ? erroroffermess : ''} fullWidth margin="normal" />
                                <TextField label="Price" type="number" value={price} onChange={(e) => setprice(e.target.value)} error={errorprice} helperText={errorprice ? errorpricemess : ''} fullWidth margin="normal" />
                                <TextField label="Number of Available Products" type="number" value={total_number_of_product} onChange={(e) => settotal_number_of_product(e.target.value)} error={errorNumberOfProduct} helperText={errorNumberOfProduct ? errorNumberOfProductmess : ''} fullWidth margin="normal" />
                            </Box>

                            <Box display="flex" flexDirection="column" margin={1} width="250px">
                                <TextField label="Created At" value={product.createdAt} disabled fullWidth margin="normal" />
                                <TextField label="Last Updated At" value={product.updatedAt} disabled fullWidth margin="normal" />
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Product Deleted</InputLabel>
                                    <Select value={isdeleted} onChange={(e) => setisdeleted(e.target.value)}>
                                        <MenuItem value={false}>false</MenuItem>
                                        <MenuItem value={true}>true</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField label="Description" value={Description} onChange={(e) => setDescription(e.target.value)} multiline rows={4} fullWidth margin="normal" />
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="center" marginTop={3} marginBottom={4}>
                            <Button variant="contained" color="warning" disabled={disable} onClick={Update}>
                                {disable ? <CircularProgress size={24} /> : button}
                            </Button>
                        </Box>
                    </>
            }
        </>
    )
}

export default Product_View;
