import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import Button from '@mui/material/Button';
import '../css/Reviews.css'
import { usermethod } from '../redux/UserSlice'
import Loader from './Loader';
const api = process.env.REACT_APP_API


export default function Reviews() {
  let ReviewText = ["Very Bad!", "Bad!", "Good!", "Very Good!", "Excellent!"]
  const userinfo = useSelector((state) => state.user)?.user
  let order_id = useParams().id
  let product_id = useParams().product_id

  const dispatch = useDispatch()
  let history = useNavigate()
  const [reviews, setreviews] = useState("");
  const [rating, setrating] = useState("Over All Rating Out of 5");
  const [product, setproduct] = useState()
  const [order, setorder] = useState()

  const [errorreviews, seterrorreviews] = useState(false)
  const [errorrating, seterrorrating] = useState(false)
  const [errormessreviews, seterrormessreviews] = useState("")
  const [errormessrating, seterrormessrating] = useState("")

  const [load, setload] = useState(true)
  const [button, setbutton] = useState("Submit Feedback")
  const [disabled, setdisabled] = useState(false)

  useEffect(() => {
    if (userinfo === null || userinfo === undefined) {
      dispatch(usermethod.Logout_User())
      history('/Signin')
    }
    else loadproduct()
  }, [])


  function findOrder_id() {
    fetch(`${api}/order/getById/${order_id}`, {
      headers: {
        Authorization: `Bearer ${userinfo?.accessToken}`
      }
    }).then(responce => responce.json())
      .then((res) => {
        try {
          if (res.statusCode === 201) {
            setorder(res.data)
          }
          else if (res.statusCode === 498) {
            dispatch(usermethod.Logout_User())
            history('/Signin')
          }
          else {
            history("*")
          }
          setload(false)
        } catch {
          history('*')
        }
      })
  }

  function HandaleError(result) {
    if (result.statusCode === 201) {
      setproduct(result.data)
      findOrder_id()
    }
    else if (result.statusCode === 498) {
      dispatch(usermethod.Logout_User())
      history('/Signin')
    }
    else if (result.statusCode === 404 || result.statusCode === 500) {
      history('*');
    }
    else {
      history("*")
    }
  }

  function loadproduct() {
    fetch(`${api}/product/${product_id}`, {
      headers: {
        Authorization: `Bearer ${userinfo.accessToken}`
      }
    }).then(responce => responce.json()).then((result) => {
      try {
        HandaleError(result)
      }
      catch {
        history('*')
      }
    })
  }

  function checkreviews() {
    if (reviews.length === 0) {
      seterrorreviews(true)
      seterrormessreviews("*Please Type Something")
      return false
    }
    else if (reviews.length < 8) {
      seterrorreviews(true)
      seterrormessreviews("*Review is Vary Less")
      return false;
    }
    else if (reviews.length > 70) {
      seterrorreviews(true)
      seterrormessreviews("*Review is Vary High")
      return false;
    }
    return true;
  }

  function checkrating() {
    if ((parseInt(rating)) >= 1 && (parseInt(rating)) <= 5) {
      seterrorrating(false)
      return true;
    }
    else {
      seterrorrating(true)
      seterrormessrating("*Please Select Correct Rating")
      return false
    }
  }

  function PushReviews() {
    fetch(`${api}/Reviews`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo.accessToken}`
      },
      body: JSON.stringify({
        email: userinfo.user.email,
        product_id: product_id,
        order_id: order_id,
        rating: rating,
        review: reviews,
      })
    }).then(response => response.json()).then((data) => {
      history('/Myorder')
    })
  }

  function UpdateIntoOrder() {
    fetch(`${api}/order/updateFeedback/${order_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo?.accessToken}`
      },
      body: JSON.stringify({
        isfeedback: true
      })
    }).then(responce => responce.json()).then((result) => {
      PushReviews()
    })
  }

  function submit() {
    if (product == null || order == null) {
      return
    }

    let rat_ing = checkrating()
    let rev_iew = checkreviews()
    let a = parseInt(product.rating) * parseInt(product.number_of_people_give_rating) + parseInt(rating);
    let b = (product.number_of_people_give_rating + 1);
    let x = (a / b).toFixed(1);


    if (rat_ing && rev_iew) {
      setbutton("Please Wait....")
      setdisabled(true)

      fetch(`${api}/product/RaingUpdateIntoProduct/${product_id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userinfo.accessToken}`
        },
        body: JSON.stringify({
          product_id: product_id,
          rating: x,
          number_of_people_give_rating: product.number_of_people_give_rating + 1,
        })
      }).then(responce => responce.json()).then((result) => {
        UpdateIntoOrder()
      })
    }
  }

  function setStarColor(firstColor, secondColor, thirdColor, fourthColor, fifthColor) {
    let firststar = document.getElementById('star1')
    let secondstar = document.getElementById('star2')
    let thirdstar = document.getElementById('star3')
    let fourthstar = document.getElementById('star4')
    let fifthstar = document.getElementById('star5')
    firststar.style.color = firstColor
    secondstar.style.color = secondColor
    thirdstar.style.color = thirdColor
    fourthstar.style.color = fourthColor
    fifthstar.style.color = fifthColor
  }

  function setColorAndRating(value) {
    setrating(value)
    if (value === 1) {
      setStarColor('red', '', '', '', '')
    } else if (value === 2) {
      setStarColor('#E74C3C', '#E74C3C', '', '', '')
    } else if (value === 3) {
      setStarColor('#DC7633', '#DC7633', '#DC7633', '', '')
    } else if (value === 4) {
      setStarColor('#27AE60', '#27AE60', '#27AE60', '#27AE60', '')
    } else if (value === 5) {
      setStarColor('#186A3B', '#186A3B', '#186A3B', '#186A3B', '#186A3B')
    }
  }

  return (
    <>
      {
        load == true ?
          <Loader />
          :
          <div>
            <div className="Reviewsform mt-3">
              <textarea
                type="textarea"
                className="Reviewformtextarea-control"
                placeholder="Write Your Reviews"
                value={reviews}
                spellCheck='false'
                onChange={(e) => setreviews(e.target.value)}
                required
              />
              {errorreviews ? <label style={{ color: "red" }}>{errormessreviews}</label> : ""}
              <div className='mt-3'>
                <FaStar onClick={() => setColorAndRating(1)} className='star' data-toggle="tooltip" title={ReviewText[0]} id='star1' />
                <FaStar onClick={() => setColorAndRating(2)} className='star' data-toggle="tooltip" title={ReviewText[1]} id='star2' />
                <FaStar onClick={() => setColorAndRating(3)} className='star' data-toggle="tooltip" title={ReviewText[2]} id='star3' />
                <FaStar onClick={() => setColorAndRating(4)} className='star' data-toggle="tooltip" title={ReviewText[3]} id='star4' />
                <FaStar onClick={() => setColorAndRating(5)} className='star' data-toggle="tooltip" title={ReviewText[4]} id='star5' />
              </div>
              {errorrating ? <label style={{ color: "red" }}>{errormessrating}</label> : ""}

              <Button variant="contained" size="small" color="success" className="btn btn-info  mt-4 btn-sm" disabled={disabled} type="submit" onClick={submit}>
                {button}
              </Button>

            </div>
          </div>
      }
    </>
  )
}
