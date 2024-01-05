import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import './Product_show.css'
import { useNavigate, useParams } from "react-router-dom";
const Product_show = () => {
    
  
  let page=parseInt(useParams().page);
  const LowerLimit=page
  const UpperLimit=page*10;
  
  const Order = useSelector((state) => state.Order.Order);
  const prev=useSelector((state)=>state.Order.prev)
  const next=useSelector((state)=>state.Order.next)
  const history=useNavigate()

  function Shownextpage()
  {
    history(`/Order/page/${page+1}`)
  }

  function View(data)
  {
    history(`/Product_view/${data._id}`)
  }

  function ShowPrevPage()
  {
    history(`/Order/page/${page-1}`)
  }
  
  return (
    <>
      {Order != null && Order.length != 0 && (
        <table  style={{margin:"10px"}}>
          <tr>
            <th>Order_id</th>
            <th>Product_Name</th>
            <th>product_count</th>
            <th>email</th>
            <th>address</th>
            <th>payment_method</th>
            <th>Total_rupess</th>
            <th>Date</th>
            <th>View</th>
          </tr>
          {Order.map((item, ind) => (
            <tr key={ind}>
              <th>{item._id}</th>
              <th>{item.product_name}</th>
              <th>{item.product_count}</th>
              <th>{item.email}</th>
              <th>{item.address}</th>
              <th>{item.payment_method}</th>
              <th>₹ {item.Total_rupess}</th>
              <th>{item.Date}</th>
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
