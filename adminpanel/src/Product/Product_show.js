import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './Product_show.css'
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Product_show = () => {
  const page = parseInt(useParams().page)
  const product = useSelector((state) => state.product.product);
  const prev = useSelector((state) => state.product.prev)
  const next = useSelector((state) => state.product.next)
  const history = useNavigate()

  function Shownextpage() {
    history(`/Product/page/${page + 1}`)
  }

  function View(data) {
    history(`/Product_view/${data._id}`)
  }

  function ShowPrevPage() {
    history(`/Product/page/${page - 1}`)
  }

  return (
    <>
      <Link to={'/Product/AddProduct'} style={{ display: 'flex', justifyContent: 'space-around' }}><button className="btn btn-success  btn-sm"><FaPlus /> Add</button></Link>
      {product != null && product.length != 0 && (
        <table className="table" style={{ margin: "10px" }}>
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
              <td>{item._id}</td>
              <td>{item.product_name}</td>
              <td>{item.offer}</td>
              <td>{item.price}</td>
              <td>{item.product_type}</td>
              <td>{item.rating} ({item.number_of_people_give_rating})</td>
              <td><button className="btn btn-primary btn-sm" onClick={() => View(item)}>view</button></td>
            </tr>
          ))}
        </table>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-around', }}>
        <button className="btn btn-primary btn-sm" onClick={ShowPrevPage} disabled={!prev}>prev</button>
        <button className="btn btn-primary btn-sm mx-3" onClick={Shownextpage} disabled={!next}>next</button>
      </div>
    </>
  );
};

export default Product_show;
