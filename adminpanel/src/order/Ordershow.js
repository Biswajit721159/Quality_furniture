import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Loading from '../component/Loading'
import { loadOrder } from '../redux/OrderSlice'

const Product_show = () => {
  const userinfo = useSelector((state) => state?.user?.user);
  const { Order, orderLoading, LowerLimit, UpperLimit, next, searchvalue } = useSelector((state) => state?.Order);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function View(data) {
    navigate(`/Order/${data?._id}`);
  }

  const handleScroll = () => {
    if (!orderLoading && next) {
      dispatch(loadOrder({ LowerLimit, UpperLimit, searchvalue, userinfo }));
    }
  };

  return (
    <Container maxWidth="lg">
      {Order != null && Order?.length !== 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">Order_id</TableCell>
                <TableCell className="text-center">Product_Name</TableCell>
                <TableCell className="text-center">Product_count</TableCell>
                <TableCell className="text-center">Email</TableCell>
                <TableCell className="text-center">Address</TableCell>
                <TableCell className="text-center">Payment_method</TableCell>
                <TableCell className="text-center">Total_rupess</TableCell>
                <TableCell className="text-center">Status</TableCell>
                <TableCell className="text-center">Date</TableCell>
                <TableCell className="text-center">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Order.map((item, ind) => (
                <TableRow key={ind}>
                  <TableCell>{item?._id}</TableCell>
                  <TableCell>{item?.product_name}</TableCell>
                  <TableCell>{item?.product_count}</TableCell>
                  <TableCell>{item?.email}</TableCell>
                  <TableCell>{item?.address}</TableCell>
                  <TableCell>{item?.payment_method}</TableCell>
                  <TableCell>₹ {item?.Total_rupess}</TableCell>
                  <TableCell>{item?.status}</TableCell>
                  <TableCell>{item?.Date}</TableCell>
                  <TableCell>
                    <Button variant="contained" size="small" color="info" onClick={() => View(item)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {orderLoading ? <Loading /> : next &&
        <Button variant="contained" color="secondary" style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', marginLeft: '45%' }} onClick={handleScroll} >
          Load More
        </Button>
      }
    </Container>
  );
};

export default Product_show;
