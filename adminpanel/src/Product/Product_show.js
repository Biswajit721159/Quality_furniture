import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './Product_show.css'
import { useNavigate, useParams } from "react-router-dom";
const Product_show = () => {
  const LowerLimit=parseInt(useParams().LowerLimit);
  const UpperLimit=parseInt(useParams().UpperLimit);
  
  const product = useSelector((state) => state.product.product);
  const prev=useSelector((state)=>state.product.prev)
  const next=useSelector((state)=>state.product.next)
  const history=useNavigate()

  function Shownextpage()
  {
    history(`/Product/${LowerLimit+12}/${UpperLimit+12}`)
  }

  function View(data)
  {
    history(`/Product_view/${data._id}`)
  }

  function ShowPrevPage()
  {
    history(`/Product/${LowerLimit-12}/${UpperLimit-12}`)
  }
  
  return (
    <>
      {product != null && product.length != 0 && (
        <table  style={{margin:"10px"}}>
          <tr>
            <th>Product_id</th>
            <th>Product_type</th>
            <th>offer</th>
            <th>price</th>
            <th>product_type</th>
            <th>rating</th>
            <th>View</th>
          </tr>
          {product.map((item, ind) => (
            <tr key={ind}>
              <th>{item._id}</th>
              <th>{item.product_name}</th>
              <th>{item.offer}</th>
              <th>{item.price}</th>
              <th>{item.product_type}</th>
              <th>{item.rating}({item.number_of_people_give_rating})</th>
              <th><button onClick={()=>View(item)}>view</button></th>
            </tr>
          ))}
        </table>
      )}
      <div>
        <button className="btn btn-primary btn-sm" onClick={ShowPrevPage} disabled={!prev}>prev</button>
        <button className="btn btn-primary btn-sm mx-3" onClick={Shownextpage} disabled={!next}>next</button>
      </div>
    </>
  );
};

export default Product_show;
