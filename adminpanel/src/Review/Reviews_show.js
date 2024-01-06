import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const Reviews_show = () => {
  const page=parseInt(useParams().page);
  
  const product = useSelector((state) => state.product.product);
  const prev=useSelector((state)=>state.product.prev)
  const next=useSelector((state)=>state.product.next)
  const history=useNavigate()

  function Shownextpage()
  {
    history(`/Review/page/${page+1}`)
  }

  function View(data)
  {
    history(`/Product_view/${data._id}`)
  }

  function ShowPrevPage()
  {
    history(`/Review/page/${page-1}`)
  }
  
  return (
    <>
      {product != null && product.length != 0 && (
        <table  style={{margin:"10px"}}>
          <tr>
            <th>Product_id</th>
            <th>Product_name</th>
            <th>product_type</th>
            <th>rating</th>
            <th>View</th>
          </tr>
          {product.map((item, ind) => (
            <tr key={ind}>
              <td>{item._id}</td>
              <td>{item.product_name}</td>
              <td>{item.product_type}</td>
              <td>{item.rating}({item.number_of_people_give_rating})</td>
              <td><button className="btn btn-primary btn-sm" onClick={()=>View(item)}>view Review</button></td>
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

export default Reviews_show;
