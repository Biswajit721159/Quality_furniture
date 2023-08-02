import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {AiFillStar } from "react-icons/ai";
import loader from "../images/loader.gif"

export default function Product_view() {

  const [product,setproduct]=useState([])
  const [review_data,setreview_data]=useState()
  const _id=useParams()
  const history=useNavigate()
  

  let userinfo=JSON.parse(localStorage.getItem('user'))

  let [persentage_5_star,setpersentage_5_star]=useState(0);
  let [persentage_4_star,setpersentage_4_star]=useState(0);
  let [persentage_3_star,setpersentage_3_star]=useState(0);
  let [persentage_2_star,setpersentage_2_star]=useState(0);
  let [persentage_1_star,setpersentage_1_star]=useState(0);
  
  let [number_5_star,setnumber_5_star]=useState(0);
  let [number_4_star,setnumber_4_star]=useState(0);
  let [number_3_star,setnumber_3_star]=useState(0);
  let [number_2_star,setnumber_2_star]=useState(0);
  let [number_1_star,setnumber_1star]=useState(0);
  let [total,settotal]=useState(0);
  let [overall_rating,setoverall_rating]=useState(0); 
  
  const [reviews_data_show,setreviews_data_show]=useState([])
  let [Message,setMessage]=useState(true)
  let [load,setload]=useState(true)

  useEffect(()=>{
    if(userinfo==null)
    {
        history('/Register')
    }
    else
    {
        loadproduct();
    }
  },[])


  function Find_Review(review_data,product_data)
 {
    if(product_data==undefined || product_data.length==0 || review_data==undefined || review_data.length==0)
    {
        return;
    }
    setoverall_rating(product_data[0].rating)
    settotal(product_data[0].number_of_people_give_rating)

    let a=0,b=0,c=0,d=0,e=0;
    for(let i=0;i<review_data.length;i++)
    {
        if(review_data[i].rating=="1")
        {
            a++;
        }
        else if(review_data[i].rating=="2")
        {
            b++;
        }
        else if(review_data[i].rating=="3")
        {
            c++;
        }
        else if(review_data[i].rating=="4")
        {
            d++;
        }
        else
        {
            e++;
        }
    }
    setnumber_1star(a);
    setnumber_2_star(b);
    setnumber_3_star(c);
    setnumber_4_star(d);
    setnumber_5_star(e);
    let x=a+b+c+d+e;
    if (x!=0) setpersentage_1_star(((a/x)*100))
    if (x!=0) setpersentage_2_star(((b/x)*100))
    if (x!=0) setpersentage_3_star(((c/x)*100))
    if (x!=0) setpersentage_4_star(((d/x)*100))
    if (x!=0) setpersentage_5_star(((e/x)*100))
  }

  function loadproduct()
  {
    fetch(`https://quality-furniture.vercel.app/product/${_id._id}`,{
        headers:
        {
            auth:`bearer ${userinfo.auth}`
        }
    }).then(response=>response.json()).
    then((data)=>{
        if(data!=undefined && data.length!=0)
        {
            fetch(`https://quality-furniture.vercel.app/Reviews/${_id._id}`,{
                headers:
                {
                    auth:`bearer ${userinfo.auth}`
                }
            }).then((responce=>responce.json())).then((res)=>{
                if(res!=undefined)
                {
                    setreview_data(res)
                    setproduct(data)
                    Find_Review(res,data)
                    loadmore(res)
                    setload(false)
                }
            })
        }
        else
        {
            setload(false)
        }
    })

  }


  function loadmore(review_data)
  {
    if(review_data==undefined) return;
    let len=reviews_data_show.length;
    let ans=reviews_data_show;
    for(let i=len;i<5 && i<review_data.length;i++)
    {
        ans.push(review_data[i])
    }
    setreviews_data_show([...ans])
    if(ans.length<5)
    {
        setMessage(false)
    }
  }


  function loadmorenow(nums)
  {
    let len=reviews_data_show.length
    let ans=reviews_data_show;
    for(let i=len;i<len+5 && i<nums.length;i++)
    {
        ans.push(nums[i]);
    }
    setreviews_data_show([...ans])
    if(ans.length==nums.length)
    {
        setMessage(false)
    }
  }


  return (
    <>
    {
        load==false && product.length!=0?
    
        <div className='container mt-3'>
            <div>
            <div className='row'>
                <div className='col'>
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src={product[0].newImage[0]} style={{height:"350px", width:"100px"}} alt="First slide"/>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src={product[0].newImage[1]} style={{height:"350px", width:"100px"}}  alt="Second slide"/>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src={product[0].newImage[2]} style={{height:"350px", width:"100px"}}  alt="Third slide"/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" style={{backgroundColor:"black"}}  aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" style={{backgroundColor:"black"}}  aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                    </div>
                    </div>
                    <div className='col mx-3'>
                        <p className='mt-4'>{overall_rating} <AiFillStar /> average based on {total} reviews.</p>
                        <div class="row">
                            <div class="side">
                                <div>5 <AiFillStar /></div>
                            </div>
                            <div class="middle">
                                <div class="bar-container">
                                <div class="bar-5" style={{width:`${persentage_5_star}%` , height: "18px",backgroundColor: "#04AA6D"}}></div>
                                </div>
                            </div>
                            <div class="side right">
                                <div>{number_5_star}</div>
                            </div>
                            <div class="side">
                                <div>4 <AiFillStar /></div>
                            </div>
                            <div class="middle">
                                <div class="bar-container">
                                <div class="bar-4"  style={{width:`${persentage_4_star}%` , height: "18px",backgroundColor: "#2196F3"}}></div>
                                </div>
                            </div>
                            <div class="side right">
                                <div>{number_4_star}</div>
                            </div>
                            <div class="side">
                                <div>3 <AiFillStar /></div>
                            </div>
                            <div class="middle">
                                <div class="bar-container">
                                <div class="bar-3" style={{width:`${persentage_3_star}%` , height: "18px",backgroundColor: "#00bcd4"}}></div>
                                </div>
                            </div>
                            <div class="side right">
                                <div>{number_3_star}</div>
                            </div>
                            <div class="side">
                                <div>2 <AiFillStar /></div>
                            </div>
                            <div class="middle">
                                <div class="bar-container">
                                <div class="bar-2" style={{width:`${persentage_2_star}%` , height: "18px",backgroundColor: "#ff9800"}}></div>
                                </div>
                            </div>
                            <div class="side right">
                                <div>{number_2_star}</div>
                            </div>
                            <div class="side">
                                <div>1 <AiFillStar /></div>
                            </div>
                            <div class="middle">
                                <div class="bar-container">
                                <div class="bar-1" style={{width:`${persentage_1_star}%` , height: "18px",backgroundColor: "#f44336"}}></div>
                                </div>
                            </div>
                            <div class="side right">
                                <div>{number_1_star}</div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className='col mt-5 mx-5'>
            {
                    reviews_data_show!=undefined && reviews_data_show.length!=0?
                        <div>
                            {
                                reviews_data_show.map((data,ind)=>(
                                <ui>
                                    <li>
                                        {data.review!=undefined?<span>Message : {data.review}</span>:""}
                                        {data.rating!=undefined?<li style={{color:"green"}}>Over All Rating : {data.rating} <AiFillStar /></li>:""}
                                        <br></br>
                                    </li>
                                </ui>
                                ))
                            }
                            {Message?<button className='btn btn-primary my-4' onClick={()=>{loadmorenow(review_data)}}>Load More</button>:""}
                        </div>
                    :<h2  className="col-md-12 text-center"  style={{marginTop:"100px",color: "#F1C8CE" }}>Review is not Posted</h2>
                }
            </div>
            </div>
        </div>
        :load?
            <div className='loader-container'><img src={loader} /></div>
            :
            <div className='loader-container'>
                <h4>Product Not Found</h4>
            </div>
    }
    </>
  )
}
