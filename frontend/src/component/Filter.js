import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import '../css/Main_page.css'
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { cartmethod } from '../redux/CartSlice'
import Footer from '../component/Footer'
import { searchmethod } from '../redux/SearchSlice'
import Slider from './Slider';
import { loadProduct } from '../redux/ProductSlice'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';

const Filter = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const [data, setdata] = useState([])
    // const [product, setproduct] = useState([])
    let userinfo = JSON.parse(localStorage.getItem('user'))
    let wishlist = JSON.parse(localStorage.getItem('Wishlist'))
    let [load, setload] = useState(true)
    // const [Catagory, setCatagoty] = useState()

    const [queryParameters] = useSearchParams()

    const [pricerange0to1000, setpricerange0to1000] = useState(false)
    const [pricerange1000to2000, setpricerange1000to2000] = useState(false)
    const [pricerange2000to3000, setpricerange2000to3000] = useState(false)
    const [pricerange3000to4000, setpricerange3000to4000] = useState(false)
    const [pricerange4000toUp, setpricerange4000toUp] = useState(false)

    let searchInput = useSelector((state) => state.Search_Name.search_Name)
    const [ALL, setALL] = useState(false)

    // const [lowprice, setlowprice] = useState(0)
    // const [highprice, sethighprice] = useState(10000000)
    // const [selectcatagory, setselectcatagory] = useState('ALL')
    // const [searchproduct, setsearchproduct] = useState("none")

    const [priceLowTOHigh, setpriceLowTOHigh] = useState(false)
    const [priceHighTOLow, setpriceHighTOLow] = useState(false)
    const [SortOnRating, setSortOnRating] = useState(false)
    const [SortOffer, setSortOffer] = useState(false)


    let [low, setlow] = useState(0);
    let [high, sethigh] = useState(12);
    let [prev, setprev] = useState(false);
    let [next, setnext] = useState(false);

    const api = process.env.REACT_APP_API
    const { product, Catagory, lowerLimit, higherLimit, lowprice, highprice, selectcatagory, searchproduct, previous_page, next_page, loadingproduct } = useSelector((state) => state?.product)


    function clearallfilter() {
        setdata(product);
        //setToproduct(product)
        setpriceLowTOHigh(false);
        setpriceHighTOLow(false);
        setSortOnRating(false);
        setSortOffer(false);
    }

    function PriceLowToHighfunction() {
        setpriceLowTOHigh(true);
        setpriceHighTOLow(false);
        setSortOnRating(false);
        setSortOffer(false);
        data.sort((a, b) => {
            let fa = parseInt(a.price - ((a.price * a.offer) / 100))
            let fb = parseInt(b.price - ((b.price * b.offer) / 100))

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        setdata([...data])
    }

    function PriceHighToLowfunction() {
        setpriceLowTOHigh(false);
        setpriceHighTOLow(true);
        setSortOnRating(false);
        setSortOffer(false);
        data.sort((a, b) => {
            let fa = parseInt(a.price - ((a.price * a.offer) / 100))
            let fb = parseInt(b.price - ((b.price * b.offer) / 100))

            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        setdata([...data])
    }

    function SortOnRatingfunction() {
        setpriceLowTOHigh(false);
        setpriceHighTOLow(false);
        setSortOnRating(true);
        setSortOffer(false);
        data.sort((a, b) => {
            let fa = parseFloat(a.rating),
                fb = parseFloat(b.rating);

            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        setdata([...data])
    }

    function SortOnOfferfunction() {
        setpriceLowTOHigh(false);
        setpriceHighTOLow(false);
        setSortOnRating(false);
        setSortOffer(true);
        data.sort((a, b) => {
            let fa = parseInt(a.offer),
                fb = parseInt(b.offer);

            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        setdata([...data])
    }

 

    function markvisited(lowprice, highprice, selectcatagory, searchproduct) {
        setpriceLowTOHigh(false);
        setpriceHighTOLow(false);
        setSortOnRating(false);
        setSortOffer(false);

        if (selectcatagory == "ALL") {
            setALL(true)
        }
        else if (selectcatagory != "ALL") {
            setALL(false)
        }
        if (lowprice >= 0 && highprice <= 1000) {
            setpricerange0to1000(true)
            setpricerange1000to2000(false)
            setpricerange2000to3000(false)
            setpricerange3000to4000(false)
            setpricerange4000toUp(false)
        }
        else if (lowprice >= 1000 && highprice <= 2000) {
            setpricerange0to1000(false)
            setpricerange1000to2000(true)
            setpricerange2000to3000(false)
            setpricerange3000to4000(false)
            setpricerange4000toUp(false)
        }
        else if (lowprice >= 2000 && highprice <= 3000) {
            setpricerange0to1000(false)
            setpricerange1000to2000(false)
            setpricerange2000to3000(true)
            setpricerange3000to4000(false)
            setpricerange4000toUp(false)
        }
        else if (lowprice >= 3000 && highprice <= 4000) {
            setpricerange0to1000(false)
            setpricerange1000to2000(false)
            setpricerange2000to3000(false)
            setpricerange3000to4000(true)
            setpricerange4000toUp(false)
        }
        else if (lowprice >= 4000 && highprice <= 10000000) {
            setpricerange0to1000(false)
            setpricerange1000to2000(false)
            setpricerange2000to3000(false)
            setpricerange3000to4000(false)
            setpricerange4000toUp(true)
        }
        else {
            setpricerange0to1000(false)
            setpricerange1000to2000(false)
            setpricerange2000to3000(false)
            setpricerange3000to4000(false)
            setpricerange4000toUp(false)
        }
    }

    function ClearAllFilter() {
        dispatch(searchmethod.CLEAR_SEARCH(''))
        history(`?lowprice=${0}&highprice=${1000000}&selectcatagory=${'ALL'}&product_name=${''}`)
        //////findsearchData(0, 1000000, 'ALL', '')
    }

    function NextPage() {
        //////findsearchData(lowprice, highprice, selectcatagory, searchproduct, low + 12, high + 12);
        setlow(low + 12)
        sethigh(high + 12);
    }

    function PrevPage() {
        //////findsearchData(lowprice, highprice, selectcatagory, searchproduct, low - 12, high - 12)
        setlow(low - 12);
        sethigh(high - 12);
    }

    function clearcatagory() {
        history(`?lowprice=${lowprice}&highprice=${highprice}&selectcatagory=${'ALL'}&product_name=${searchproduct}`)
        //findsearchData(lowprice, highprice, 'ALL', searchproduct)
    }

    function backTOHome() {
        dispatch(searchmethod.CLEAR_SEARCH(''))
        history(`?lowprice=${0}&highprice=${1000000}&selectcatagory=${'ALL'}&product_name=${''}`)
        //findsearchData(0, 1000000, 'ALL', '')
    }

    const [takeid, settakeid] = useState(0)

    function handleMouseOver(product_id) {
        settakeid(product_id)
    }

    function handleMouseLeave() {
        settakeid(0)
    }

    function cametocheck(lowprice, highprice) {
        history(`?lowprice=${lowprice}&highprice=${highprice}&selectcatagory=${selectcatagory}&product_name=${searchproduct}`)
        ////findsearchData(lowprice, highprice, selectcatagory, searchproduct)
    }
    function cametocatagory(selectcatagory) {
        history(`?lowprice=${lowprice}&highprice=${highprice}&selectcatagory=${selectcatagory}&product_name=${searchproduct}`)
        //findsearchData(lowprice, highprice, selectcatagory, searchproduct)
    }



    return (
        <>
            {loadingproduct == true ?
                <div className="Loaderitem">
                    <PulseLoader color="#16A085" />
                </div>
                :
                product.length != 0 ?
                    <>
                        <div className='subproduct'>
                            <button className='btn btn-primary mx-3 btn-sm' onClick={ClearAllFilter}>Clear All Filter</button>
                            <div className='subproductone'>
                                <p className='card-text'>price</p>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={() => cametocheck(0, 1000)} checked={pricerange0to1000} onChange={(e) => setpricerange0to1000(e.target.checked)} type="radio" />
                                    <label className="form-check-label card-text" >
                                        Under ₹ 1000
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={() => cametocheck(1000, 2000)} checked={pricerange1000to2000} onChange={(e) => setpricerange1000to2000(e.target.checked)} type="radio" />
                                    <label className="form-check-label card-text" >
                                        ₹ 1000 - ₹ 2000
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={() => cametocheck(2000, 3000)} checked={pricerange2000to3000} onChange={(e) => setpricerange2000to3000(e.target.checked)} type="radio" />
                                    <label className="form-check-label card-text" >
                                        ₹ 2000 - ₹ 3000
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={() => cametocheck(3000, 4000)} checked={pricerange3000to4000} onChange={(e) => setpricerange3000to4000(e.target.checked)} type="radio" />
                                    <label className="form-check-label card-text" >
                                        ₹ 3000 - ₹ 4000
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={() => cametocheck(4000, 1000000)} checked={pricerange4000toUp} onChange={(e) => setpricerange4000toUp(e.target.checked)} type="radio" />
                                    <label className="form-check-label card-text" >
                                        Over ₹ 4000
                                    </label>
                                </div>
                                {/* {pricerange0to1000 || pricerange1000to2000 || pricerange2000to3000 || pricerange3000to4000 || pricerange4000toUp ? <p className='card-text' onClick={clearPrice} style={{ color: "#48C9B0", cursor: 'pointer' }}>clear</p> : <p className='card-text'>clear</p>} */}

                            </div>
                            <div className='subproductone mt-3'>
                                <p className='card-text'>sort</p>
                                <div className="form-check mt-2">
                                    <input className="form-check-input" onClick={PriceLowToHighfunction} checked={priceLowTOHigh} type="radio" />
                                    <label className="form-check-label card-text" >
                                        Price Low To High
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={PriceHighToLowfunction} checked={priceHighTOLow} type="radio" />
                                    <label className="form-check-label card-text" >
                                        Price High To Low
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={SortOnRatingfunction} checked={SortOnRating} type="radio" />
                                    <label className="form-check-label card-text" >
                                        Sort On Rating
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={SortOnOfferfunction} checked={SortOffer} type="radio" />
                                    <label className="form-check-label card-text" >
                                        Sort Offer
                                    </label>
                                </div>
                                {
                                    priceLowTOHigh || priceHighTOLow || SortOnRating || SortOffer ? <p className='card-text mx-2' onClick={clearallfilter} style={{ color: "#48C9B0", cursor: 'pointer' }}>clear</p> : <p className='card-text mx-2'>clear</p>
                                }
                            </div>
                            <div className='subproductone mt-3'>

                                <p className='card-text'>Catagory</p>

                                <div className="form-check mt-2">
                                    <input className="form-check-input " onClick={() => cametocatagory('ALL')} checked={ALL} onChange={(e) => setALL(e.target.checked)} type="radio" />
                                    <label className="form-check-label card-text" >
                                        ALL
                                    </label>
                                </div>
                                {
                                    Catagory && Catagory.map((item, ind) => (
                                        <div className="form-check mt-2" key={ind}>
                                            {
                                                item == selectcatagory ? <input className="form-check-input" onClick={() => cametocatagory(item)} checked={true} type="radio" />
                                                    : <input className="form-check-input" onClick={() => cametocatagory(item)} type="radio" />
                                            }
                                            <label className="form-check-label card-text" >
                                                {item}
                                            </label>
                                        </div>
                                    ))
                                }
                                {
                                    selectcatagory != "ALL" ? <p className='card-text mx-2'><p onClick={clearcatagory} style={{ color: "#48C9B0", cursor: 'pointer' }}>clear</p></p> : <p className='card-text mx-2'><p>clear</p></p>
                                }
                            </div>
                        </div>

                    </>
                    :
                    <div className='loader-container'>
                        <h4>Product Not Found</h4>
                        <button className='btn btn-primary mx-3' onClick={backTOHome}>Back</button>
                    </div>

            }
        </>
    )
}
export default Filter