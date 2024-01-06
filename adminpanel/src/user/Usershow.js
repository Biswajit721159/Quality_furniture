import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './User_show.css'
import { useNavigate, useParams } from "react-router-dom";
const Usershow = () => {

  let page=parseInt(useParams().page);
  const LowerLimit=page
  const UpperLimit=page*10;
  
  const user = useSelector((state) => state.Alluser.Alluser);
  const prev=useSelector((state)=>state.Alluser.prev)
  const next=useSelector((state)=>state.Alluser.next)
  const history=useNavigate()
  function Shownextpage()
  {
    history(`/User/page/${page+1}`)
  }

  function View(data)
  {
    history(`/User/${data._id}`)
  }

  function ShowPrevPage()
  {
    history(`/User/page/${page-1}`)
  }
  
  return (
    <>
      {user != null && user.length != 0 && (
        <table  style={{margin:"10px"}}>
          <tr>
            <th>User_id</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Register Date</th>
            <th>View</th>
          </tr>
          {user.map((item, ind) => (
            <tr key={ind}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.createdAt}</td>
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

export default Usershow;
