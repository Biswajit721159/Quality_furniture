import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {AiFillStar } from "react-icons/ai";
import { PulseLoader } from 'react-spinners';
import { VscVerifiedFilled } from "react-icons/vsc";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import '../css/Product_Review.css'
const api = process.env.REACT_APP_API
const Product_Review=(id)=>{

    let userinfo=JSON.parse(localStorage.getItem('user'))
    const _id=id._id
    const history=useNavigate()
    const [load,setload]=useState(false)
    const [review_data,setreview_data]=useState()
    const [reviews_data_show,setreviews_data_show]=useState([])

    let [persentage_5_star,setpersentage_5_star]=useState(0);
    let [persentage_4_star,setpersentage_4_star]=useState(0);
    let [persentage_3_star,setpersentage_3_star]=useState(0);
    let [persentage_2_star,setpersentage_2_star]=useState(0);
    let [persentage_1_star,setpersentage_1_star]=useState(0);
    
    let [number_5_star,setnumber_5_star]=useState(0);
    let [number_4_star,setnumber_4_star]=useState(0);
    let [number_3_star,setnumber_3_star]=useState(0);
    let [number_2_star,setnumber_2_star]=useState(0);
    let [number_1_star,setnumber_1_star]=useState(0);
    let [total,settotal]=useState(0);
    let [overall_rating,setoverall_rating]=useState(0); 

    useEffect(()=>{
        if(userinfo==null)
        {
            history('/Signin')
        }
        else
        {
            loadReview();
        }
    },[_id])

    function loadReview()
    {
        setload(true)
        fetch(`${api}/Reviews/${_id}`,{
            headers:
            {
                Authorization:`Bearer ${userinfo.accessToken}`
            }
        }).then((responce=>responce.json())).then((res)=>{
            if(res.statusCode=201)
            {
                setreview_data(res.data);
                Find_Review(res.data);
                loadmore(res.data)
                setload(false);
            }
            else if(res.statusCode==498)
            {
                history('/Signin');
            }
            else
            {
                history('*');
            }
        })
    }
    
    function Find_Review(review_data)
    {
        if(review_data==undefined || review_data.length==0)
        {
            return;
        }
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
        setnumber_1_star(a);
        setnumber_2_star(b);
        setnumber_3_star(c);
        setnumber_4_star(d);
        setnumber_5_star(e);
        let x=a+b+c+d+e;
        let y=x/review_data.length;
        settotal(x);
        setoverall_rating(y)
        if (x!=0) setpersentage_1_star(((a/x)*100));
        if (x!=0) setpersentage_2_star(((b/x)*100));
        if (x!=0) setpersentage_3_star(((c/x)*100));
        if (x!=0) setpersentage_4_star(((d/x)*100));
        if (x!=0) setpersentage_5_star(((e/x)*100));
    }

    function loadmore(review_data)
    {
      if(review_data==undefined) return;
      let len=reviews_data_show.length;
      let ans=reviews_data_show;
      for(let i=len;i<reviews_data_show.length+5 && i<review_data.length;i++)
      {
          ans.push(review_data[i])
      }
      setreviews_data_show([...ans])
      console.log(ans);
    //   if(ans.length<5)
    //   {
    //       setMessage(false)
    //   }
    }
    return(
        <>
        {
            load==true?
            <div className="Loaderitem">
                <PulseLoader color="#16A085"  />
            </div>
            :
            <>
                <div className='col1 mt-4'>
                    <p className='reviewtextitem'><strong>{overall_rating}</strong> <AiFillStar /> Average based on <strong>{total}</strong> reviews.</p>
                    <div class="row">
                        <div class="side">
                            <div className="reviewtextitem" >5<AiFillStar /></div>
                        </div>
                        <div class="middle">
                            <div class="bar-container">
                              <div class="bar" style={{width:`${persentage_5_star}%`,backgroundColor: "#04AA6D"}}></div>
                            </div>
                        </div>
                        <div class="side right">
                            <div>{number_5_star}</div>
                        </div>
                        <div class="side">
                            <div>4<AiFillStar /></div>
                        </div>
                        <div class="middle">
                            <div class="bar-container">
                            <div class="bar"  style={{width:`${persentage_4_star}%` ,backgroundColor: "#2196F3"}}></div>
                            </div>
                        </div>
                        <div class="side right">
                            <div>{number_4_star}</div>
                        </div>
                        <div class="side">
                            <div>3<AiFillStar /></div>
                        </div>
                        <div class="middle">
                            <div class="bar-container">
                            <div class="bar" style={{width:`${persentage_3_star}%`,backgroundColor: "#00bcd4"}}></div>
                            </div>
                        </div>
                        <div class="side right">
                            <div>{number_3_star}</div>
                        </div>
                        <div class="side">
                            <div>2<AiFillStar /></div>
                        </div>
                        <div class="middle">
                            <div class="bar-container">
                               <div class="bar" style={{width:`${persentage_2_star}%`,backgroundColor: "#ff9800"}}></div>
                            </div>
                        </div>
                        <div class="side right">
                            <div>{number_2_star}</div>
                        </div>
                        <div class="side">
                            <div>1<AiFillStar /></div>
                        </div>
                        <div class="middle">
                            <div class="bar-container">
                            <div class="bar" style={{width:`${persentage_1_star}%`,backgroundColor: "#f44336"}}></div>
                            </div>
                        </div>
                        <div class="side right">
                            <div>{number_1_star}</div>
                        </div>
                    </div>
                </div>
                <div className='col21 mt-4'>
                    <ui className="col21item1">
                        {
                            reviews_data_show!=undefined && reviews_data_show.length!=0?
                                reviews_data_show.map((data,ind)=>(
                                    <li style={{margin:'2px'}}>
                                        <span  className="reviewtextitem"><VscVerifiedFilled /> {data.rating} <AiFillStar /> {data.review}</span>
                                    </li>
                                ))   
                            :<h4  className="col-md-12 text-center"  style={{marginTop:"100px",color: "#808B96" }}>Review is not Posted</h4>    
                        }
                        {reviews_data_show!=undefined && reviews_data_show.length!=0 &&
                        <div className="col21item2">
                            <GrFormPreviousLink />
                            <GrFormNextLink />
                        </div>
                        }
                    </ui>
                </div>
            </>
        }
        </>
    )
}
export default Product_Review