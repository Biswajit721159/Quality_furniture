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
import Loading from "../component/Loading";
import { loadProduct } from "../redux/ProductSlice";
import DataNotFoundPage from "../component/DataNotFoundPage"
import { HiStar } from "react-icons/hi";
const Product_show = () => {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state?.user?.user);
  const { product, productLoading, LowerLimit, UpperLimit, next, searchvalue } = useSelector((state) => state?.product);
  const navigate = useNavigate();

  function View(data) {
    navigate(`/Review/${data._id}`);
  }

  const handleScroll = () => {
    if (!productLoading && next) {
      dispatch(loadProduct({ LowerLimit, UpperLimit, userinfo, searchvalue }));
    }
  };

  return (
    <Container maxWidth="lg">
      {product && product?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell >Product_id</TableCell>
                <TableCell >Product_name</TableCell>
                <TableCell >Product_type</TableCell>
                <TableCell>Total Review</TableCell>
                <TableCell >Over all Rating</TableCell>
                <TableCell >View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product?.map((item) => (
                <TableRow key={item?._id}>
                  <TableCell>
                    <img
                      src={`${item?.newImage?.[0]}`}
                      alt='Error'
                      loading="lazy"
                      style={{ height: '60px', width: '60px', borderRadius: '10px' }}
                    />
                  </TableCell>
                  <TableCell>{item?._id}</TableCell>
                  <TableCell>{item?.product_name}</TableCell>
                  <TableCell>{item?.product_type}</TableCell>
                  <TableCell>{item?.number_of_people_give_rating}</TableCell>
                  <TableCell>
                    <SetRating rating={item.rating} />
                  </TableCell>
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
      ) :
        <DataNotFoundPage />
      }
      {productLoading ? <Loading /> : next &&
        <Button variant="contained" color="secondary" style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', marginLeft: '45%' }} onClick={handleScroll} >
          Load More
        </Button>
      }
    </Container>
  );
};

export const SetRating = ({ rating }) => {
  return (
    <>
      {
        rating === 0 ? <Rating rating={rating} color={'#808080'} /> :
          rating > 0 && rating <= 1 ? <Rating rating={rating} color={'#FF0000'} /> :
            rating > 1 && rating <= 2 ? <Rating rating={rating} color={'#FF7F00'} /> :
              rating > 2 && rating <= 3 ? <Rating rating={rating} color={'#A4A42D'} /> :
                rating > 3 && rating <= 4 ? <Rating rating={rating} color={'#7FFF00'} /> :
                  <Rating rating={rating} color={'#00FF00'} />
      }
    </>
  )
}

export const Rating = ({ rating, color }) => {
  return (
    <>
      <p style={{ color: color, fontSize: '17px' }}>{rating} < HiStar color={color} style={{ marginTop: '-7px' }} /></p>
    </>
  )
}

export default Product_show;
