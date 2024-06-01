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

const Reviews_show = () => {
  const page = parseInt(useParams().page);
  const product = useSelector((state) => state.product.product);
  const prev = useSelector((state) => state.product.prev);
  const next = useSelector((state) => state.product.next);
  const navigate = useNavigate();

  function Shownextpage() {
    navigate(`/Review/page/${page + 1}`);
  }

  function View(data) {
    navigate(`/Review/${data._id}`);
  }

  function ShowPrevPage() {
    navigate(`/Review/page/${page - 1}`);
  }

  return (
    <Container maxWidth="lg">
      {product != null && product.length !== 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="reviews table">
            <TableHead>
              <TableRow>
                <TableCell>Product_id</TableCell>
                <TableCell>Product_name</TableCell>
                <TableCell>Product_type</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.map((item, ind) => (
                <TableRow key={ind}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.product_type}</TableCell>
                  <TableCell>{item.rating} ({item.number_of_people_give_rating})</TableCell>
                  <TableCell>
                    <Button variant="contained" size="small" color="info" onClick={() => View(item)}>
                      View Review
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

export default Reviews_show;
