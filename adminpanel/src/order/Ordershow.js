import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const Product_show = () => {
  let page = parseInt(useParams().page);
  const Order = useSelector((state) => state?.Order?.Order);
  const prev = useSelector((state) => state?.Order?.prev);
  const next = useSelector((state) => state?.Order?.next);
  const navigate = useNavigate();

  function Shownextpage() {
    navigate(`/Order/page/${page + 1}`);
  }

  function View(data) {
    navigate(`/Product_view/${data?._id}`);
  }

  function ShowPrevPage() {
    navigate(`/Order/page/${page - 1}`);
  }

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
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Button variant="contained" size="small" color="success" onClick={ShowPrevPage} disabled={!prev}>
          Prev
        </Button>
        <Button variant="contained" size="small" color="success" onClick={Shownextpage} disabled={!next}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Product_show;
