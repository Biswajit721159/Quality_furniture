import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import '../css/Product_Review.css'
import Loader from "./Loader";
import ReviewShow from "./ReviewShow";
import { SetRating } from "../constant/Rating";
const api = process.env.REACT_APP_API
const Product_Review = (id) => {

    const userinfo = useSelector((state) => state.user)?.user
    const dispatch = useDispatch()
    const _id = id._id
    const history = useNavigate()
    const [loadrating, setloadrating] = useState(false);

    let [persentage_5_star, setpersentage_5_star] = useState(0);
    let [persentage_4_star, setpersentage_4_star] = useState(0);
    let [persentage_3_star, setpersentage_3_star] = useState(0);
    let [persentage_2_star, setpersentage_2_star] = useState(0);
    let [persentage_1_star, setpersentage_1_star] = useState(0);

    let [number_5_star, setnumber_5_star] = useState(0);
    let [number_4_star, setnumber_4_star] = useState(0);
    let [number_3_star, setnumber_3_star] = useState(0);
    let [number_2_star, setnumber_2_star] = useState(0);
    let [number_1_star, setnumber_1_star] = useState(0);
    let [total, settotal] = useState(0);
    let [overall_rating, setoverall_rating] = useState(0);


    useEffect(() => {
        loadRating();
    }, [_id])

    function loadRating() {
        setloadrating(true)
        fetch(`${api}/Reviews/findRatingPersentageofProduct/${_id}`).then((responce => responce.json())).then((res) => {
            if (res.statusCode = 200) {
                let result = res?.data;
                setpersentage_1_star(result[0].persentage_1_star);
                setnumber_1_star(result[0].number_1_star);

                setpersentage_2_star(result[1].persentage_2_star);
                setnumber_2_star(result[1].number_2_star);

                setpersentage_3_star(result[2].persentage_3_star);
                setnumber_3_star(result[2].number_3_star);

                setpersentage_4_star(result[3].persentage_4_star);
                setnumber_4_star(result[3].number_4_star);

                setpersentage_5_star(result[4].persentage_5_star);
                setnumber_5_star(result[4].number_5_star);
                setoverall_rating(result[5].overall_rating);
                settotal(result[5].total);
                setloadrating(false);
            }
            else {
                history('*');
            }
        })
    }

    return (
        <>
            <div>
                {
                    loadrating === true ?
                        <Loader /> :
                        <div className='col12'>
                            <p className='text-center' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <SetRating rating={overall_rating} />
                                <div>
                                    Average based on
                                    <strong style={{ fontSize: '15px', marginBottom: '-0.5px', margin: '5px' }}> ({total}) </strong>
                                    reviews.
                                </div>
                            </p>
                            <div className="row">
                                <div className="side">
                                    <div className="reviewtextitem" ><SetRating rating={5} /></div>
                                </div>
                                <div className="middle">
                                    <div className="bar-container">
                                        <div className="bar" style={{ width: `${persentage_5_star}%`, backgroundColor: "green" }}></div>
                                    </div>
                                </div>
                                <div className="side right">
                                    <div className="reviewtextitem" >{number_5_star}</div>
                                </div>
                                <div className="side">
                                    <div className="reviewtextitem" ><SetRating rating={4} /></div>
                                </div>
                                <div className="middle">
                                    <div className="bar-container">
                                        <div className="bar" style={{ width: `${persentage_4_star}%`, backgroundColor: "#27AE60" }}></div>
                                    </div>
                                </div>
                                <div className="side right">
                                    <div className="reviewtextitem" >{number_4_star}</div>
                                </div>
                                <div className="side">
                                    <div className="reviewtextitem" ><SetRating rating={3} /></div>
                                </div>
                                <div className="middle">
                                    <div className="bar-container">
                                        <div className="bar" style={{ width: `${persentage_3_star}%`, backgroundColor: "#A4A42D" }}></div>
                                    </div>
                                </div>
                                <div className="side right">
                                    <div className="reviewtextitem" >{number_3_star}</div>
                                </div>
                                <div className="side">
                                    <div className="reviewtextitem" ><SetRating rating={2} /></div>
                                </div>
                                <div className="middle">
                                    <div className="bar-container">
                                        <div className="bar" style={{ width: `${persentage_2_star}%`, backgroundColor: "#FF7F00" }}></div>
                                    </div>
                                </div>
                                <div className="side right">
                                    <div className="reviewtextitem" >{number_2_star}</div>
                                </div>
                                <div className="side">
                                    <div className="reviewtextitem" ><SetRating rating={1} /></div>
                                </div>
                                <div className="middle">
                                    <div className="bar-container">
                                        <div className="bar" style={{ width: `${persentage_1_star}%`, backgroundColor: "#FF0000" }}></div>
                                    </div>
                                </div>
                                <div className="side right">
                                    <div className="reviewtextitem" >{number_1_star}</div>
                                </div>
                            </div>
                        </div>
                }
            </div >
            <hr />
            <div>
                <ReviewShow _id={_id} />
            </div>

        </>

    )
}
export default Product_Review