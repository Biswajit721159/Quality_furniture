import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import './Product_show.css'
import { useNavigate, useParams } from "react-router-dom";
const Product_show = () => {
    
  
  let page=parseInt(useParams().page);
  
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
              <td>{item._id}</td>
              <td>{item.product_name}</td>
              <td>{item.product_count}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.payment_method}</td>
              <td>₹ {item.Total_rupess}</td>
              <td>{item.Date}</td>
              <td><button className="btn btn-primary btn-sm" onClick={()=>View(item)}>view</button></td>
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
