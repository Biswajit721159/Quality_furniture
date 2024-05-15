import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { AiFillStar } from "react-icons/ai";
import { HiCheck } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import '../css/Main_page.css'
import '../css/Test.css'

const Test = () => {
    const api = process.env.REACT_APP_API
    let userinfo = JSON.parse(localStorage.getItem('user'))
    const [product, setproduct] = useState([])
    useEffect(() => {
        loadproduct(0, 10000000, 'ALL', '')
    }, [])

    function loadproduct(lowprice, highprice, selectcatagory, searchproduct, low = 0, high = 12) {
        if (lowprice == null) lowprice = 0;
        if (highprice == null) highprice = 1000000;
        if (selectcatagory == null) selectcatagory = "ALL";
        if (searchproduct == null) searchproduct = "";
        if (searchproduct == null || searchproduct.length == 0) searchproduct = "none";
        fetch(`${api}/product/getproductUponPriceProductTypeAndProductName/${lowprice}/${highprice}/${selectcatagory}/${searchproduct}/${low}/${high}`, {
            headers: {
                Authorization: `Bearer ${userinfo.accessToken}`
            }
        }).then(response => response.json()).then((data) => {
            if (data.statusCode == 201) {
                let n = data.data.length;
                setproduct(data.data.slice(0, n - 1));
            }

        })
    }
    return (
        <div className='card'>

            {
                product?.map((item, ind) => (
                    <Card sx={{ maxWidth: 250 }} className='carditem'>
                        <CardMedia
                            component="img"
                            height="194"
                            image={item?.newImage[0]}
                            alt="wait"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {item?.product_name}
                            </Typography>
                        </CardContent>
                        

                        {/* <CardActions disableSpacing>
                            <Typography sx={{ color: 'green' }} variant="body2" color="text.secondary">
                                {data?.offer}% OFF
                            </Typography>
                            <Typography sx={{ color: 'gray ', m: 2 }} variant="body2" color="text.secondary">
                                <s>₹{data?.price}</s>
                            </Typography>
                            <Typography sx={{ color: 'gray ', m: 2, fontSize: '1.1rem', }} variant="body2" color="text.secondary">
                                ₹{(data.price - ((data.price * data.offer) / 100)).toFixed(2)}
                            </Typography>
                        </CardActions> 
                        <CardActions disableSpacing>
                            {
                                parseInt(data?.rating) == 0 ? <div className="card-text" style={{ color: "black" }}>{data?.rating}<AiFillStar /></div>
                                    :
                                    parseInt(data?.rating) == 1 ? <div className="card-text" style={{ color: "tomato" }}>{data?.rating}<AiFillStar /></div>
                                        :
                                        parseInt(data?.rating) == 2 ? <div className="card-text" style={{ color: "red" }}>{data?.rating}<AiFillStar /></div>
                                            :
                                            parseInt(data?.rating) == 3 ? <div className="card-text" style={{ color: "#DC7633" }}>{data?.rating}<AiFillStar /></div>
                                                :
                                                parseInt(data?.rating) == 4 ? <div className="card-text" style={{ color: "#28B463" }}>{data?.rating}<AiFillStar /></div>
                                                    :
                                                    parseInt(data?.rating) == 5 ? <div className="card-text" style={{ color: "green" }}>{data?.rating}<AiFillStar /></div>
                                                        : ""
                            }
                            {
                                data?.total_number_of_product == 0 ?
                                    <div className=" row">
                                        <div className="col">
                                            <p className="card-text" style={{ color: 'tomato' }}><RxCross2 />closed</p>
                                        </div>
                                        <div className='col'>
                                            <p className="card-text">{data?.total_number_of_product} left</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="row">
                                        <div className=" col">
                                            <p className="card-text" style={{ color: 'green' }}><HiCheck />stock</p>
                                        </div>
                                        <div className='col'>
                                            {
                                                data?.total_number_of_product != 0 ? <p className="card-text">{data?.total_number_of_product} left</p> :
                                                    <p className="card-text" style={{ color: "#E2E2F4" }}>{data?.total_number_of_product} left</p>
                                            }
                                        </div>
                                    </div>
                            } 
                        <Typography sx={{ color: 'green' }} variant="body2" color="text.secondary">
                                {data?.offer}% OFF
                            </Typography>
                            <Typography sx={{ color: 'gray ', m: 2 }} variant="body2" color="text.secondary">
                                <s>₹{data?.price}</s>
                            </Typography>
                            <Typography sx={{ color: 'gray ', m: 2, fontSize: '1.1rem', }} variant="body2" color="text.secondary">
                                ₹{(data.price - ((data.price * data.offer) / 100)).toFixed(2)}
                            </Typography>
                         </CardActions> */}

                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon sx={{ color: 'red' }} />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))
            }
        </div>
    );
}

export default Test;
